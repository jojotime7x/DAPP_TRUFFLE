const MetaMaskInteraction = artifacts.require("MetaMaskInteraction");

module.exports = function (deployer) {
  deployer.deploy(MetaMaskInteraction);
};
