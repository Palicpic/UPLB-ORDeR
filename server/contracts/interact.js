const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi } = require("./compile.js");

const getWalletBalance = async (testnet, address, privateKey) => {
  const provider = new HDWalletProvider(privateKey, testnet);
  const web3 = new Web3(provider);
  const balanceWei = await web3.eth.getBalance(address);
  const balanceEther = web3.utils.fromWei(balanceWei, "ether");

  return balanceEther;
};

const newDocument = async (testnet, address, privateKey, contractAdd, document) => {
  const { documentHash, studentEmail, issuer, signatureEmails } = document;
  const provider = new HDWalletProvider(privateKey, testnet);
  const web3 = new Web3(provider);
  let contract = new web3.eth.Contract(abi, contractAdd);
  try {
    const transactionReceipt = await contract.methods.issueDocument(documentHash, studentEmail, issuer, signatureEmails).send({ gas: "5000000", gasPrice: "10000000000", from: address });
    const estimateGasNeeded = await contract.methods.issueDocument(documentHash, studentEmail, issuer, signatureEmails).estimateGas();
    console.log("gas during setCertificate: ", estimateGasNeeded);
    return transactionReceipt;
  } catch (error) {
    // An error occurred while getting the transaction receipt
    console.error(error);
  }
};

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
    // An error occurred while getting the transaction receipt
    console.error(error);
  }
};

module.exports = { getWalletBalance, newDocument, getDocumentData };
