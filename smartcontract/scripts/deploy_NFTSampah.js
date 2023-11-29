const hre = require("hardhat");

async function main() {
    const Trash = await hre.ethers.deployContract("NFTSampah");
    await Trash.waitForDeployment();
  
    console.log("NFTSampah address:", Trash.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

