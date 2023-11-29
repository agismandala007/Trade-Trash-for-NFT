require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const Trash_NFT = await hre.ethers.deployContract("NFTSampah");
  await Trash_NFT.waitForDeployment();

  const Trash = await hre.ethers.deployContract("Sampah", [Trash_NFT.target]);
  await Trash.waitForDeployment();

  console.log("NFTSampah Address: ", Trash_NFT.target);
  console.log("Admin: ", Trash.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
