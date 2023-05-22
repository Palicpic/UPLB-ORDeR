const router = require("express").Router();

const Contract = require("../models/contract");

const { getWalletBalance } = require("../contracts/interact");
const deployContract = require("../contracts/deploy");

const address = process.env.WALLET_ADD;
const privateKey = process.env.PRIVATE_KEY;

const testnet = "goerli";
const testnetObj = {
  localhost: "HTTP://127.0.0.1:7545",
  goerli: `https://goerli.infura.io/v3/${process.env.GOERLI_API}`,
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

module.exports = router;
