const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Sampah Smart Contract", function () {
  let owner, admin, notAdmin, nftSampah, sampah;

  async function deployAndTest() {
    [owner, admin, notAdmin] = await ethers.getSigners();

    // Deploy NFTSampah contract
    const NFTSampah = await ethers.getContractFactory("NFTSampah");
    nftSampah = await NFTSampah.connect(admin).deploy();

    // Deploy Sampah contract
    const Sampah = await ethers.getContractFactory("Sampah");
    sampah = await Sampah.connect(admin).deploy(nftSampah);

    // Add admin to NFTSampah contract
    await nftSampah.connect(admin).addAdmin(sampah);

    return { owner, admin, notAdmin, nftSampah, sampah };
  }

  beforeEach(async function () {
    ({ owner, admin, notAdmin, nftSampah, sampah } = await deployAndTest());
  });

  describe("addAdmin Function", function () {
    it("should allow owner to add admin in happy path", async function () {
      await nftSampah.connect(admin).addAdmin(owner);
      expect(await nftSampah.is_admin(owner)).to.be.true;
    });

    it("should revert if non-owner tries to add admin in sad path", async function () {
        await expect(nftSampah.connect(notAdmin).addAdmin(owner)).to.be.reverted;
      });
  });

  describe("setNftAddress Function", function () {
    it("should allow admin to set NFT address in happy path", async function () {
      const newNftAddress = ethers.Wallet.createRandom().address;
      await sampah.connect(admin).setNftAddress(newNftAddress);
      expect(await sampah.nft()).to.equal(newNftAddress);
    });

    it("should revert if non-admin tries to set NFT address in sad path", async function () {
      const newNftAddress = ethers.Wallet.createRandom().address;
      await expect(sampah.connect(owner).setNftAddress(newNftAddress)).to.be.revertedWith(
        "only admin can perform this action"
      );
    });
  });

  describe("setMinimumWeight Function", function () {
    it("should allow admin to set minimum weight in happy path", async function () {
      const newMinWeight = 1500;
      await sampah.connect(admin).setMinimumWeight(newMinWeight);
      expect(await sampah.min_weight()).to.equal(newMinWeight);
    });

    it("should revert if non-admin tries to set minimum weight in sad path", async function () {
      const newMinWeight = 1500;
      await expect(sampah.connect(owner).setMinimumWeight(newMinWeight)).to.be.revertedWith(
        "only admin can perform this action"
      );
    });
  });


  describe("addCategory Function", function () {
    it("should allow admin to add category in happy path", async function () {
      const categoryName = "Plastic";
      const tokenUri = "ipfs://QmTokenUri";
      await nftSampah.connect(admin).addCategory(categoryName, tokenUri);
      expect(await nftSampah.isCategoryExist(categoryName)).to.be.true;
    });
  
    it("should revert if non-admin tries to add category in sad path", async function () {
      const categoryName = "Plastic";
      const tokenUri = "ipfs://QmTokenUri";
      await expect(sampah.connect(notAdmin).addCategory(categoryName, tokenUri))
        .to.be.revertedWith("only admin can perform this action");
    });
  });
  

  describe("tradeTrash Function", function () {
    it("should allow admin to trade trash with valid inputs", async function () {
      const ownerName = "John Doe";
      const ownerAddress = owner;
      const weight = 1200; // meets minimum weight
      const category = "Plastic";

      // Add the category before calling tradeTrash
      await nftSampah.connect(admin).addCategory(category, "ipfs://QmTokenUri");
  
      await sampah.connect(admin).tradeTrash(ownerName, ownerAddress, weight, category);
    });
  
    it("should revert if non-admin tries to trade trash", async function () {
      const ownerName = "John Doe";
      const ownerAddress = owner;
      const weight = 1200; // meets minimum weight
      const category = "Plastic";

      // Add the category before calling tradeTrash
      await nftSampah.connect(admin).addCategory(category, "ipfs://QmTokenUri");
  
      await expect(
        sampah.connect(owner).tradeTrash(ownerName, ownerAddress, weight, category)
      ).to.be.revertedWith("only admin can perform this action");
    });
  
    it("should revert if weight is below minimum weight", async function () {
      const ownerName = "John Doe";
      const ownerAddress = owner;
      const weight = 900; // below minimum weight
      const category = "Plastic";

      // Add the category before calling tradeTrash
      await nftSampah.connect(admin).addCategory(category, "ipfs://QmTokenUri");
  
      await expect(
        sampah.connect(admin).tradeTrash(ownerName, ownerAddress, weight, category)
      ).to.be.revertedWith("Trash weight doesn't reach minimum weight for trade");
    });
  
    it("should revert if reward category does not exist", async function () {
      const ownerName = "John Doe";
      const ownerAddress = owner;
      const weight = 1200; // meets minimum weight
      const category = "NonexistentCategory";
  
      await expect(
        sampah.connect(admin).tradeTrash(ownerName, ownerAddress, weight, category)
      ).to.be.revertedWith("Reward category is not exist");
    });
  });

  describe("getTradeByOwner Function", function () {
    it("should return trades by owner", async function () {
        const ownerName = "John Doe";
        const ownerAddress = owner.address;
        const weight = 1200;
        const category = "Plastic";
        await nftSampah.connect(admin).addCategory(category, "ipfs://QmTokenUri");
      
        // Trade trash to receive NFT
        const tradeResult = await sampah.connect(admin).tradeTrash(ownerName, ownerAddress, weight, category);
      
        // Get trades by owner
        const ownerTrades = await sampah.getTradeByOwner(ownerAddress);
      
        // Check if there is at least one valid trade returned
        expect(ownerTrades).to.be.an("array", "Returned trades should be an array");
        expect(ownerTrades.length).to.be.greaterThan(0, "No valid trades returned for the owner");
      
        // Check the details of the first trade
        const firstTrade = ownerTrades[0];

        expect(firstTrade).to.be.an("array", "Trade should be an array");
        expect(firstTrade[0]).to.equal(ownerName, "Owner name should match");
        expect(firstTrade[1]).to.equal(ownerAddress, "Owner address should match");
        expect(firstTrade[2]).to.equal(weight, "Weight should match");
        expect(firstTrade[3]).to.equal(tradeResult.value, "Token reward ID should match");

      });
           
         
      
      
  });

// describe("nftExchange Function", function () {
//     let owner, admin, notAdmin, user, nftSampah, sampah;
//     let tokenId = 0; // Declare tokenId here
  
//     async function deployContracts() {
//       [owner, notAdmin, admin, user] = await ethers.getSigners();
  
//       // Deploy NFTSampah contract
//       const NFTSampah = await ethers.getContractFactory("NFTSampah");
//       nftSampah = await NFTSampah.connect(admin).deploy();
  
//       // Deploy Sampah contract
//       const Sampah = await ethers.getContractFactory("Sampah");
//       sampah = await Sampah.connect(admin).deploy(nftSampah.address);
  
//       // Add admin to NFTSampah contract
//       await nftSampah.connect(admin).addAdmin(sampah.address);
//     }
  
//     beforeEach(async function () {
//       await deployContracts();
  
//       const category = "Plastic";
//       await nftSampah.connect(admin).addCategory(category, "ipfs://QmTokenUri");
  
//       // Mint an NFT for the owner
//       tokenId = await nftSampah.connect(admin).awardNft(owner.address, category);
//     });
  
//     it("should allow NFT exchange in happy path", async function () {
//         const ownerAddress = owner.address;
//         const sembako = "Beras";
      
//         // Trade trash to receive NFT
//         const tradeResult = await sampah.connect(admin).tradeTrash("John Doe", ownerAddress, 1200, "Plastic");
//         const tokenId = tradeResult.logs[0].args.token_reward_id;
      
//         // Check if tokenId exists for the owner address
//         const tokenIdExistsBeforeExchange = await sampah.tokenIdExist(owner.address, tokenId);
//         expect(tokenIdExistsBeforeExchange).to.be.true;
      
//         // Exchange NFT for Sembako
//         await sampah.connect(admin).nftExchange(ownerAddress, tokenId, sembako);
      
//         // Check if tokenId no longer exists for the owner address after exchange
//         const tokenIdExistsAfterExchange = await sampah.tokenIdExist(owner.address, tokenId);
//         expect(tokenIdExistsAfterExchange).to.be.false;
//       });
      
  
//     it("should revert if non-admin tries to exchange NFT in sad path", async function () {
//       const sembako = "Beras";
  
//       await expect(
//         sampah.connect(notAdmin).nftExchange(owner.address, tokenId, sembako)
//       ).to.be.revertedWith("only admin can perform this action");
//     });
  
//     it("should revert if NFT owner tries to exchange NFT for another user in sad path", async function () {
//       const sembako = "Beras";
  
//       await expect(
//         sampah.connect(admin).nftExchange(notAdmin.address, tokenId, sembako)
//       ).to.be.revertedWith("You are not the owner of the NFT");
//     });
//   });
  
  
  
  
  
  

});
