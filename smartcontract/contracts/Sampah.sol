// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interface/INFTRewardSampah.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Sampah is Ownable(msg.sender), ERC721 {
    INFTRewardSampah public nft;

    constructor(address nft_address) ERC721("NFT Reward Sampah", "NRS") {
        is_admin[msg.sender] = true;
        nft = INFTRewardSampah(nft_address);
    }

    struct Trade {
        string owner_name;
        address owner_address;
        uint256 weight;
        uint256 token_reward_id;
        uint256 date;
    }

    struct Exchange {
        address owner_name;
        uint256 tokenId;
        string sembako;
    }

    uint256 public min_weight = 1000;

    Trade[] public trades;
    Exchange[] public change;

    mapping(address => Trade[]) public owner_trades;
    mapping(address => bool) public is_admin;
    mapping(uint256 => string) public min_weight_category;

    event deleteEvent(uint256 token);

    modifier onlyAdmin() {
        require(is_admin[msg.sender], "only admin can perform this action");
        _;
    }

    function addAdmin(address user) public onlyOwner {
        is_admin[user] = true;
        nft.addAdmin(user);
    }

    function setNftAddress(address nft_address) public onlyAdmin {
        nft = INFTRewardSampah(nft_address);
    }

    function setMinimumWeight(uint256 _min_weight) public onlyAdmin {
        min_weight = _min_weight;
    }

    function tokenIdExist(
        address _owner_address,
        uint256 _tokenId
    ) public view returns (bool isExist) {
        isExist = false;

        Trade[] storage ownerList = owner_trades[_owner_address];

        for (uint256 i = 0; i < ownerList.length; i++) {
            if (ownerList[i].token_reward_id == _tokenId) {
                isExist = true;
            }
        }

        return (isExist);
    }

    function deleteTrash(address _owner_address, uint256 _tokenId) public {
        Trade[] storage ownerList = owner_trades[_owner_address];

        for (uint256 i = 0; i < ownerList.length; i++) {
            if (ownerList[i].token_reward_id == _tokenId) {
                delete ownerList[i];

                ownerList[i] = ownerList[ownerList.length - 1];
                ownerList.pop();

                emit deleteEvent(_tokenId);
            }
        }
    }

    function addCategory(
        string memory category_name,
        string memory token_uri
    ) public onlyAdmin {
        nft.addCategory(category_name, token_uri);
    }

    function tradeTrash(
        string memory _owner_name,
        address _owner,
        uint256 _weight,
        string memory category
    ) public onlyAdmin {
        require(nft.isCategoryExist(category), "Reward category is not exist");
        require(
            _weight >= min_weight,
            "Trash weight doesn't reach minimum weight for trade"
        );

        uint256 tokenId = nft.awardNft(_owner, category);
        Trade memory trade = Trade({
            owner_name: _owner_name,
            owner_address: _owner,
            weight: _weight,
            token_reward_id: tokenId,
            date: block.timestamp
        });

        trades.push(trade);
        owner_trades[_owner].push(trade);
    }

    function getTradeByOwner(
        address _owner
    ) public view returns (Trade[] memory) {
        return owner_trades[_owner];
    }

    function nftExchange(
        address _owner_address,
        uint256 _tokenId,
        string memory _sembako
    ) public payable onlyAdmin {
        require(
            tokenIdExist(_owner_address, _tokenId),
            "The Address or token id is not found"
        );

        Exchange memory coupon = Exchange({
            owner_name: _owner_address,
            tokenId: _tokenId,
            sembako: _sembako
        });

        change.push(coupon);
        nft.nftBurn(_tokenId);

        deleteTrash(_owner_address, _tokenId);
    }
}