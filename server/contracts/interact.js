const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const getWalletBalance = async (testnetArg, addressArg, privateKeyArg) => {
  // console.log(testnetArg);
  // console.log(addressArg);
  // console.log(privateKeyArg);
  const provider = new HDWalletProvider(privateKeyArg, testnetArg);
  // console.log(provider);
  const web3 = new Web3(provider);
  const balanceWei = await web3.eth.getBalance(addressArg);
  const balanceEther = web3.utils.fromWei(balanceWei, "ether");

  return balanceEther;
};

module.exports = { getWalletBalance };
