//solidity compiler
const solc = require("solc");

// file system - read and write files to your computer
const fs = require("fs");
const path = require("path");

// reading the file contents of the smart  contract
const contractPath = path.resolve(__dirname, "Document.sol");
const fileContent = fs.readFileSync(contractPath).toString();

// create an input structure for my solidity compiler
const input = {
  language: "Solidity",
  sources: {
    Document: {
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
const abi = output.contracts["Document"]["Document"].abi;
const bytecode = output.contracts["Document"]["Document"]["evm"]["bytecode"]["object"];
module.exports = { abi, bytecode };
