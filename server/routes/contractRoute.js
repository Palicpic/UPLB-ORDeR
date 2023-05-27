const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const { create } = require("ipfs-http-client");

const Contract = require("../models/contract");
const DocumentRequest = require("../models/documentRequest");
const SignatureRequest = require("../models/signatureRequest");
const User = require("../models/user");

const { getWalletBalance, newDocumen, getDocumentData } = require("../contracts/interact");
const deployContract = require("../contracts/deploy");

const address = process.env.WALLET_ADD;
const privateKey = process.env.PRIVATE_KEY;

const testnet = "goerli";
const testnetObj = {
  localhost: "HTTP://127.0.0.1:7545",
  goerli: `https://goerli.infura.io/v3/${process.env.GOERLI_API}`,
};

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir("./uploads/", (err) => {
      cb(null, "./uploads/");
    });
  },
  filename: (req, file, cb) => {
    // Define the filename for each uploaded file
    cb(null, file.originalname);
  },
});

// Create the multer instance
const upload = multer({ storage });

const createIpfs = async (file) => {
  const projectId = process.env.PROJECT_ID;
  const projectSecret = process.env.PROJECT_SECRET;
  const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfsObj = {
    localhost: { host: "localhost", port: "5001", protocol: "http" },
    infura: {
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    },
  };
  let ipfs = create(ipfsObj["infura"]);
  const fileBuffer = fs.readFileSync(file.path);
  const fileAdded = await ipfs.add({ path: file.filename, content: fileBuffer });
  const fileHash = fileAdded.cid.toString();
  return fileHash;
};

router.post("/deploy", async (req, res) => {
  try {
    const etherBalance = await getWalletBalance(testnetObj[testnet], address, privateKey);
    if (parseFloat(etherBalance) >= 0.0075) {
      console.log("here");
      const contractAddress = await deployContract(testnetObj[testnet], address, privateKey);
      console.log(contractAddress);
      const net = await Contract.create({
        testNet: testnet,
        address: contractAddress,
        walletAddress: address,
      });

      res.status(200).json({ data: "Success" });
    } else {
      console.log("Not enough Ether", etherBalance);
      res.status(404).json({ dataError: `You do not have at least 0.0075 Ether to deploy Contract. You only have ${etherBalance} Ether. Please get more Ether` });
    }
  } catch (err) {
    const errMsg = err.message.split("{")[0];
    res.status(404).json({ dataError: errMsg });
  }
});

//check if there is contract deployed
router.get("/has-contract", (req, res) => {
  Contract.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

//issue a document
router.post("/issue-document/new", upload.single("studentFile"), async (req, res) => {
  try {
    const { rowId, contractAddress, userId } = req.body;
    const file = req.file;
    const status = "Issued";

    const issuer = await User.findById({ _id: userId });
    const documentRequest = await DocumentRequest.findOne({ _id: rowId }).populate("user");

    const etherBalance = await getWalletBalance(testnetObj[testnet], address, privateKey);
    console.log(etherBalance);

    if (parseFloat(etherBalance) >= 0.002) {
      const fileHash = await createIpfs(file);

      const document = {
        documentHash: fileHash,
        studentEmail: documentRequest.user.email,
        issuer: issuer.email,
        signatureEmails: [],
      };
      console.log(document);

      const transactionReceipt = await newDocument(testnetObj[testnet], address, privateKey, contractAddress, document);
      console.log(transactionReceipt);

      if (transactionReceipt) {
        await DocumentRequest.findOneAndUpdate({ _id: rowId }, { status, dateIssued: Date.now(), documentHash: document.documentHash, contract: contractAddress, issuer: issuer._id, transactionHash: transactionReceipt.transactionHash });
        fs.unlinkSync(`./uploads/${file.filename}`);

        res.status(200).json({ data: "Success" });
      } else {
        res.status(404).json({ dataError: "Authentication failed due to network congestion on blockchain network. Try again later!" });
      }
    } else {
      res.status(404).json({ dataError: `You do not have at least 0.002 Ether. You only have ${etherBalance} Ether. Please get more Ether` });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

router.post("/sign-document/new", async (req, res) => {
  try {
    const { rowId, contractAddress, userId } = req.body;
    const status = "Signed";

    const signee = await User.findById({ _id: userId });
    const signatureRequest = await SignatureRequest.findOne({ _id: rowId }).populate("user").populate("recipient");
    const file = signatureRequest.pdfFile;

    const etherBalance = await getWalletBalance(testnetObj[testnet], address, privateKey);
    console.log(etherBalance);

    if (parseFloat(etherBalance) >= 0.002) {
      const fileHash = await createIpfs(file);

      const document = {
        documentHash: fileHash,
        studentEmail: signatureRequest.user.email,
        issuer: "",
        signatureEmails: [signatureRequest.user.email, signee.email],
      };
      console.log(document);

      const transactionReceipt = await newDocument(testnetObj[testnet], address, privateKey, contractAddress, document);
      console.log(transactionReceipt);

      if (transactionReceipt) {
        await SignatureRequest.findOneAndUpdate({ _id: rowId }, { status, dateSigned: Date.now(), documentHash: document.documentHash, contract: contractAddress, transactionHash: transactionReceipt.transactionHash });
        fs.unlinkSync(`./uploads/${file.filename}`);

        res.status(200).json({ data: "Success" });
      } else {
        res.status(404).json({ dataError: "Authentication failed due to network congestion on blockchain network. Try again later!" });
      }
    } else {
      res.status(404).json({ dataError: `You do not have at least 0.002 Ether. You only have ${etherBalance} Ether. Please get more Ether` });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

router.post("/verify", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const fileHash = await createIpfs(file);
    let contractAddress = "";

    //find document hash on document request and signature request
    const signatureRequestData = await SignatureRequest.findOne({ documentHash: fileHash });
    const documentRequestData = await DocumentRequest.findOne({ documentHash: fileHash });

    console.log(signatureRequestData);
    console.log(documentRequestData);

    if (signatureRequestData) {
      contractAddress = signatureRequestData.contract;
    } else if (documentRequestData) {
      contractAddress = documentRequestData.contract;
    }

    if (contractAddress !== "") {
      const etherBalance = await getWalletBalance(testnetObj[testnet], address, privateKey);

      if (parseFloat(etherBalance) >= 0.002) {
        const documentData = await getDocumentData(testnetObj[testnet], address, privateKey, contractAddress, fileHash);
        console.log(documentData);
        if (documentData) {
          const { studentEmail, issuer, signatureEmails } = documentData;
          const student = await User.findOne({ email: studentEmail });
          const studentName = student.name.displayName;
          let issuerInfo = "";
          if (issuer !== "") {
            const issuerData = await User.findOne({ email: issuer });
            const issuerCollege = issuerData.college;
            issuerInfo = "UPLB " + issuerCollege + "-OCS";
          }
          const signatureStorage = {};
          if (signatureEmails.length !== 0) {
            const users = await User.find({ email: { $in: signatureEmails } }); // Find users matching the provided email list

            users.forEach((user) => {
              signatureStorage[user.email] = user.name.displayName;
            });
          }

          // const signatureEmails = key is email, name
          const document = { fileHash, studentEmail, studentName, issuerInfo, signatureStorage };
          // const document = "test";
          res.status(200).json({ data: "Success", document: document });
        } else {
          res.status(404).json({ dataError: "Document is in the record, but error happened while retrieving the data from blockchain!" });
        }
      } else {
        res.status(404).json({ dataError: `You do not have at least 0.002 Ether. You only have ${etherBalance} Ether. Please get more Ether` });
      }
    } else {
      res.status(404).json({ dataError: "The file uploaded doesn't match any document record!" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});
module.exports = router;
