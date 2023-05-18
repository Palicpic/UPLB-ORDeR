const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile.js");

const deployContract = async (testnetArg, addressArg, privateKeyArg) => {
  const provider = await new HDWalletProvider(privateKeyArg, testnetArg);
  // console.log("test1");
  const web3 = await new Web3(provider);
  // console.log("test2");
  let contract = await new web3.eth.Contract(abi);
  // console.log("test3");
  // console.log(bytecode);
  // const gasEstimate = await contract.deploy({ data: bytecode }).estimateGas();
  // console.log(gasEstiimate);
  contract = await contract
    .deploy({ data: bytecode })
    .send({ gas: "800000", gasPrice: "10000000000", from: addressArg })
    .on("transactionHash", function (hash) {
      console.log("Transaction hash:", hash);
    })
    .on("receipt", function (receipt) {
      console.log("Contract address:", receipt.contractAddress);
    })
    .on("error", function (error) {
      console.error("Error deploying contract:", error);
    });

  // console.log(bytecode);
  // return contract;
  // console.log("test4");
  const gasEstimate = await contract.deploy({ data: bytecode }).estimateGas();
  // return gasEstimate;
  console.log("contract is deployed to: ", contract.options.address);
  console.log("gas needed for deployment: ", gasEstimate);
  return contract.options.address;
};

module.exports = deployContract;
