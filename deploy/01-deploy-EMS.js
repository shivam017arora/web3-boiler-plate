const { getNamedAccounts, deployments, network, run } = require("hardhat");
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const ems = await deploy("Blog", {
    from: deployer,
    args: ["Blog"],
    log: true,
    waitConfirmations: 1,
  });
};

module.exports.tags = ["all", "blog"];
