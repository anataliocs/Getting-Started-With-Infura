var NFTDemoContract = artifacts.require("NFTDemoContract");

module.exports = function(deployer) {
  deployer.deploy(NFTDemoContract);
}