//solidity compiler
const solc = require("solc");

// file system - read and write files to your computer
const fs = require("fs");
const path = require("path");
// reading the file contents of the smart  contract

const contractPath = path.resolve(__dirname, "Order.sol");
const fileContent = fs.readFileSync(contractPath).toString();

// create an input structure for my solidity compiler
const input = {
  language: "Solidity",
  sources: {
    Order: {
      content: fileContent,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output)
const abi = output.contracts["Order"]["Order"].abi;
// console.log(abi);
const bytecode = output.contracts["Order"]["Order"]["evm"]["bytecode"]["object"];
// console.log(bytecode);
module.exports = { abi, bytecode };
