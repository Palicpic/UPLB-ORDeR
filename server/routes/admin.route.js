const router = require("express").Router();
const EthereumNet = require("../models/ethereum.model");

const { newCertificate, getAllCertificates, getWalletBalance } = require("../contracts/interact");

//HTTP routes for different testnets and mainnet

//Dependencies needed to deploy and interact with the smart contract
const deployContract = require("../contracts/pseudoDeploy");

const testnetObj = {
  localhost: "HTTP://127.0.0.1:7545",
  goerli: `https://goerli.infura.io/v3/${process.env.GOERLI_API}`,
};
router.post("/deploy", async (req, res) => {
  try {
    const address = process.env.WALLET_ADD;
    const privateKey = process.env.PRIVATE_KEY;
    const testnet = "goerli";
    //localhost
    // const address = "0x071b961aEFDD98DeC6B130c4159ED9e5f1ADA11e";
    // const privateKey = "0xf987cdcaa1d957b4b0cd69aa41460f610890d72f082eedf122a0ff2f7728ac2c";
    console.log(address);
    const etherBalance = await getWalletBalance(testnetObj[testnet], address, privateKey);

    console.log(etherBalance);
    // console.log(parseFloat(etherBalance));

    if (parseFloat(etherBalance) >= 0.0075) {
      console.log("here");
      const contractAddress = await deployContract(testnetObj[testnet], address, privateKey);
      console.log(contractAddress);
      const ethNet = await EthereumNet.create({
        nameOfNet: testnet,
        address: contractAddress,
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

router.get("/contract", (req, res) => {
  EthereumNet.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
