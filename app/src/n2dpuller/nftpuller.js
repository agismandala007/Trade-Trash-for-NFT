import { useEffect, useState } from 'react';
import React from "react";
import axios from 'axios';
import NFTCollection from './NFTCollection.json';
import { nftContract, key, displayAmount, mainnet, address, testnet } from './settings';
import { Container, Card, Button, Image, Row, Col, InputGroup } from "react-bootstrap";
import { useAccount } from 'wagmi'
const { ethers, Wallet } = require("ethers");


export default function NftPuller() {

  const address = useAccount()
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    generateNft();
    }, [setNfts])
    
    async function refreshPage() {
        window.location.reload();
    }

    async function generateNft() {
      const provider = new ethers.providers.JsonRpcProvider(mainnet)
      const wallet = new ethers.Wallet(key, provider);
      const contract = new ethers.Contract(nftContract, NFTCollection, wallet);
      const itemArray = [];
      contract.totalSupply().then(result => {
        let totalSup = parseInt(result, 16)
  
        /*
        Replace "displayAmount" with "totalSup"
        below if you want to display all NFTs 
        in the collection BUT BE CAREFUL, it will render
        every nft image and possibly freeze your server/browser!!
        */

        for (let i = 0; i < displayAmount; i++) {


          var token = i + 1                     
          const owner = contract.ownerOf(token)
          const rawUri = contract.tokenURI(token)
          const Uri = Promise.resolve(rawUri)
          const getUri = Uri.then(value => {
            let str = value
            let cleanUri = str.replace('ipfs://', 'https://ipfs.io/ipfs/')
            let metadata = axios.get(cleanUri).catch(function (error) {
              console.log(error.toJSON());
            });
            return metadata;
          })
          getUri.then(value => {
            let rawImg = value.data.image
            var name = value.data.name
            var tokenId = value.data.tokenId
            var desc = value.data.description
            let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
            Promise.resolve(owner).then(value => {
              let ownerW = value;
              let meta = {
                name: name,
                img: image,
                tokenId: tokenId,
                wallet: ownerW,
                desc,
              }
              console.log(meta)
              itemArray.push(meta)
            })
          })
        }
      })
      await new Promise(r => setTimeout(r, 5000));
      setNfts(itemArray)
      setLoadingState('loaded');
    }

if (loadingState === 'loaded' && !nfts.length)

    return (
      <div >
        {
        nfts.map((nft, i) => {
          <div>
          <Card.img src={nft.img} key={i}/>
        <h2>No Collections Retrieved</h2>
        </div>
})}
      </div>
    )
    return (
      <Container md>
        <h1>NFT <span>Collection</span></h1>
        <Button variant="primary" onClick={refreshPage}>Refresh NFTs</Button>
        <Row>
        {nfts.map((nft, i) => {
          return (
            <Col>
                <Card style={{ width: '18rem', margin: '5px'}} key={i}>
                <Card.Img src={nft.img} />
                <Card.Body>
                    <Card.Title>{nft.name}</Card.Title>
                    <Card.Title>{nft.tokenId}</Card.Title>
                    <Card.Text>
                         {nft.desc}
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col>
            )
        })}
        </Row>
      {/* <Grid.Container gap={3}>
        {nfts.map((nft, i) => {
            return (
              <Grid >
                <a>
                  <Card isHoverable key={i} css={{ mw: "270px", marginRight: '$1', boxShadow:'0px 2px 12px #000000' }} variant="bordered">
                    <Card.Image src={nft.img} />
                    <Card.Body md css={{background:"$gradient"}}>
                    <Text css={{color:'$white'}} h2>{nft.name}</Text>
                    <Text h3 css={{color:'$white'}}>NFT ID: {nft.tokenId}</Text>
                    <Text css={{color:'$white'}}>{nft.desc}</Text>
                    </Card.Body>
                  </Card>
                </a>
              </Grid>
            )
          })}
      </Grid.Container> */}
    </Container>
    )
}
