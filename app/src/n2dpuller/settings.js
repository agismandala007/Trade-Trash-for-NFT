/* 

█▀▀▄ █▀▀ ▀▀█▀▀ █▀█ █▀▀▄ █▀▀ ▀█░█▀ 
█░░█ █▀▀ ░░█░░ ░▄▀ █░░█ █▀▀ ░█▄█░ 
▀░░▀ ▀▀▀ ░░▀░░ █▄▄ ▀▀▀░ ▀▀▀ ░░▀░░


🅽🅵🆃🅿🆄🅻🅻🅴🆁 v1
A React - NextJS NFT IPFS CID Metadata Puller
With NO Private API Required

Required Dependencies:

npm i ethers
npm i axios
npm i @nextui-org/react

Subscribe and follow me to get more amazing content
Youtube, Instagram, Tiktok : Net2Dev
Github @net2devcrypto

Please donate to: net2dev.eth

*/

    //Generic Wallet Key to make the call, not usable, DO NOT CHANGE.
    export const key = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' 

    //RPC Addresses, Change to any other if needed.
    const eth = "https://rpc.ankr.com/eth"
    const bsc = "https://bscrpc.com"
    const poly = "https://matic-mainnet.chainstacklabs.com"
    const ethkovan = "https://kovan.infura.io/v3/"
    const ethrinkeby = "https://rinkeby.infura.io/v3/"
    const ethropsten = "https://ropsten.infura.io/v3/"
    const bsctest = "https://data-seed-prebsc-1-s3.binance.org:8545"
    const polytest = "https://polygon-mumbai-bor.publicnode.com"


/*
█▀ █▀▀ ▀█▀ ▀█▀ █ █▄░█ █▀▀ █▀
▄█ ██▄ ░█░ ░█░ █ █░▀█ █▄█ ▄█
*/                                                            

/*
    Input the NFT Contract Address
    */

    export const nftContract = "0x716F29B8972D551294d9E02B3eb0fC1107FbF4aA"

    // 0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e

    /*
    Select your mainnet
    eth - bsc - poly
    Or Select your testnet
    ethkovan - ethrinkeby - ethropsten - bsctest - polytest
    */
    export var mainnet = eth
    export var testnet = polytest


    /*
    Type the amount of NFT's to display
    */
    export var displayAmount = 12

    /*
    CTRL+S to save
    */