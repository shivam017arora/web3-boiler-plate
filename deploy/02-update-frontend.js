const {
  frontEndContractsFile,
  frontEndAbiFile,
} = require("../helper-hardhat-config");
const fs = require("fs");
const { network } = require("hardhat");

module.exports = async () => {
  console.log("Writing to front end...");
  updateContractAddresses();
  updateAbi();
  console.log("Front end written!");
};

async function updateAbi() {
  const factory = await ethers.getContract("Blog");
  fs.writeFileSync(
    frontEndAbiFile,
    factory.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const factory = await ethers.getContract("Blog");
  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractsFile, "utf8")
  );
  if (network.config.chainId.toString() in contractAddresses) {
    if (
      !contractAddresses[network.config.chainId.toString()].includes(
        factory.address
      )
    ) {
      contractAddresses[network.config.chainId.toString()].push(
        factory.address
      );
    }
  } else {
    contractAddresses[network.config.chainId.toString()] = [factory.address];
  }
  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}
module.exports.tags = ["all", "frontend"];
