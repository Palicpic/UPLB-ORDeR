const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const { create } = require("ipfs-http-client");

const Contract = require("../models/contract");
const DocumentRequest = require("../models/documentRequest");
const User = require("../models/user");

const { getWalletBalance, newDocument } = require("../contracts/interact");
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

//issue document
//issue a document
router.post("/issue-document/new", upload.single("studentFile"), async (req, res) => {
  try {
    const { rowId, contractAddress, userId } = req.body;
    const file = req.file;
    const status = "Issued";

    const issuer = await User.findById({ _id: userId });
    const documentRequest = await DocumentRequest.findOne({ _id: rowId }).populate("user");
    // console.log(documentRequest);
    console.log(documentRequest.user.email);
    console.log(issuer.email);

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
    let ipfs = await create(ipfsObj["infura"]);
    const fileBuffer = fs.readFileSync(file.path);
    const fileAdded = await ipfs.add({ path: file.filename, content: fileBuffer });
    const fileHash = fileAdded.cid.toString();

    const document = {
      documentHash: fileHash,
      studentEmail: documentRequest.user.email,
      issuer: issuer.email,
      signatureEmails: [],
    };
    // const document = {
    //   documentHash: "QmfK5rUgUQ6JPtUFSTGGS4143w4uXDr1Mp7kZ2yTX5mn1ph",
    //   studentEmail: documentRequest.user.email,
    //   issuer: issuer.email,
    //   signatureEmails: [],
    // };
    console.log(document);

    const etherBalance = await getWalletBalance(testnetObj[testnet], address, privateKey);
    console.log(etherBalance);

    if (parseFloat(etherBalance) >= 0.002) {
      console.log("loob na");
      const transactionReceipt = await newDocument(testnetObj[testnet], address, privateKey, contractAddress, document);
      console.log(transactionReceipt);

      await DocumentRequest.findOneAndUpdate({ _id: rowId }, { status, dateIssued: Date.now(), documentHash: document.documentHash, contract: contractAddress, issuer: issuer._id, transactionHash: transactionReceipt.transactionHash });
      fs.unlinkSync(`./uploads/${file.filename}`);

      res.status(200).json({ data: "Success" });
    } else {
      res.status(404).json({ dataError: `You do not have at least 0.002 Ether. You only have ${etherBalance} Ether. Please get more Ether` });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ dataError: err });
  }
});

module.exports = router;
