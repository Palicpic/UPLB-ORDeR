const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi } = require("./compile.js");

//get Wallet Balance of the Ethereum account to use
const getWalletBalance = async (testnet, address, privateKey) => {
  const provider = new HDWalletProvider(privateKey, testnet);
  const web3 = new Web3(provider);
  const balanceWei = await web3.eth.getBalance(address);
  const balanceEther = web3.utils.fromWei(balanceWei, "ether");

  return balanceEther;
};

//add new document record to blockchain
const newDocument = async (testnet, address, privateKey, contractAdd, document, method) => {
  const { documentHash, studentEmail, issuer, signatureEmails } = document;
  const provider = new HDWalletProvider(privateKey, testnet);
  const web3 = new Web3(provider);
  let contract = new web3.eth.Contract(abi, contractAdd);
  try {
    //get the document hash list
    const documentHashList = await contract.methods.getDocumentHashList().call({ from: address });

    //if the document is requested to other faculty too
    if (documentHashList.includes(documentHash) && method === "sign") {
      const transactionReceipt = await contract.methods.addIssuerEmail(documentHash, signatureEmails[1]).send({ gas: "5000000", gasPrice: "10000000000", from: address });
      const estimateGasNeeded = await contract.methods.addIssuerEmail(documentHash, signatureEmails[1]).estimateGas();
      console.log("gas during setCertificate: ", estimateGasNeeded);
      return transactionReceipt;
    } else {
      //create new document record
      const transactionReceipt = await contract.methods.issueDocument(documentHash, studentEmail, issuer, signatureEmails).send({ gas: "5000000", gasPrice: "10000000000", from: address });
      const estimateGasNeeded = await contract.methods.issueDocument(documentHash, studentEmail, issuer, signatureEmails).estimateGas();
      console.log("gas during setCertificate: ", estimateGasNeeded);
      return transactionReceipt;
    }
  } catch (error) {
    // An error occurred while getting the transaction receipt
    console.error(error);
  }
};

//get a document data from blockchain
const getDocumentData = async (testnet, address, privateKey, contractAdd, fileHash) => {
  const provider = new HDWalletProvider(privateKey, testnet);
  const web3 = new Web3(provider);
  let contract = new web3.eth.Contract(abi, contractAdd);
  try {
    const document = await contract.methods.getDocumentInfo(fileHash).call({ from: address });
    const documentData = {
      studentEmail: document["0"],
      issuer: document["1"],
      signatureEmails: document["2"],
    };
    return documentData;
  } catch (error) {
    console.error(error);
  }
};

//get all document records saved on blockchain and contract address
const getAllDocuments = async (testnet, address, privateKey, contractAdd) => {
  const provider = new HDWalletProvider(privateKey, testnet);
  const web3 = new Web3(provider);
  let contract = new web3.eth.Contract(abi, contractAdd);

  const documentHashList = await contract.methods.getDocumentHashList().call({ from: address });
  const documents = [];
  for (const documentHash of documentHashList) {
    const document = await contract.methods.getDocumentInfo(documentHash).call({ from: address });
    documents.push({ documentHash: documentHash, studentEmail: document["0"], issuer: document["1"], signatureEmails: document["2"] });
  }
  return documents;
};

module.exports = { getWalletBalance, newDocument, getDocumentData, getAllDocuments };
