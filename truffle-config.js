const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  networks: {
    goerli: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.MNEMONIC }, // Load the mnemonic from the .env file
          providerOrUrl: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
        }),
      network_id: 5,
      gas: 3000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.3",
    },
  },
};
