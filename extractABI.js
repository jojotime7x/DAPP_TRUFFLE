const fs = require("fs");

// Replace 'YourContractName' with the name of your contract
const jsonFile = "./build/contracts/MetaMaskInteraction.json";

fs.readFile(jsonFile, "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading the file:", err);
    return;
  }

  try {
    const jsonObject = JSON.parse(jsonString);
    const abi = jsonObject.abi;
    console.log("ABI:", JSON.stringify(abi, null, 2));
  } catch (err) {
    console.log("Error parsing JSON:", err);
  }
});
