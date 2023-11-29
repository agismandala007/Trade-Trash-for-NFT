import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi'
import NFTSampahAbi from '../assets/NFTSampah.json';
import SampahAbi from '../assets/Sampah.json';
import React from "react";


export const Kelola = () =>{

    //Handle Form Add Category & Trade Trash & isCategoryExist
    const [textCategory, setTextCategory] = React.useState('');
    const handleCategory = (event) => setTextCategory(event.target.value);
    const [textTokenURI, setTextTokenURI] = React.useState('');
    const handleTokenURI = (event) => setTextTokenURI(event.target.value);

    //Handle Form Add Admin
    const [textUser, setTextUser] = React.useState('')
    const handleUser = (event) => setTextUser(event.target.value)

    // Handle Form Admin Exist
    const [textAddressAdmin, setTextAddressAdmin] = React.useState('')
    const handleAddressAdmin = (event) => setTextAddressAdmin(event.target.value)

    // Handle Form Trade Trash & NFT Exchange
    const [textOwnerName, setTextOwnerName] = React.useState('')
    const handleOwnerName = (event) => setTextOwnerName(event.target.value)
    const [textOwnerAddress, setTextOwnerAddress] = React.useState('')
    const handleOwnerAddress = (event) => setTextOwnerAddress(event.target.value)
    const [textWeight, setTextWeight] = React.useState('')
    const handleWeight = (event) => setTextWeight(event.target.value)

    // Handle NFT Exchange
    const [textTokenId, setTextTokenId] = React.useState('')
    const handleTokenId = (event) => setTextTokenId(event.target.value)
    const [textSembako, setTextSembako] = React.useState('')
    const handleSembako = (event) => setTextSembako(event.target.value)



    const { address } = useAccount();
    const contractAddressNFTSampah = '0x5d5a45382C864f6344a4dF2d9FcB5e52f863fCb2';
    const contractAddressSampah = '0xa35225546D6Dcdb404c5180391D1AC36cb61F0F4';

    // Handle Add Category
    const {config: configAddCategory } = usePrepareContractWrite({
        address: contractAddressSampah,
        abi: SampahAbi,
        functionName: 'addCategory',
        args: [textCategory, textTokenURI]
    });
    const {write: writeAddCategory } = useContractWrite(configAddCategory)

    // Handle Add Admin
    const {config: configAddAdmin} = usePrepareContractWrite({
        address: contractAddressNFTSampah,
        abi: NFTSampahAbi,
        functionName: 'addAdmin',
        args: [textUser]
    });
    const {write: writeAddAdmin} = useContractWrite(configAddAdmin)

    // Handle is admin exist
    const { data: dataIsAdmin } = useContractRead({
        address: contractAddressNFTSampah,
        abi: NFTSampahAbi,
        functionName: 'is_admin',
        args: [textAddressAdmin]
    });

    // Handle is Category Exist
    const {data: dataIsCategory} = useContractRead({
        address: contractAddressNFTSampah,
        abi: NFTSampahAbi,
        functionName: 'isCategoryExist',
        args: [textCategory]
    })

    // Handle Pertukaran Sampah Menjadi NFT
    const {config: configTradeTrash} = usePrepareContractWrite({
        address: contractAddressSampah,
        abi: SampahAbi,
        functionName: 'tradeTrash',
        args: [
            textOwnerName, 
            textOwnerAddress, 
            textWeight,
            textCategory
        ]
    });
    const {write: writeTradeTrash} = useContractWrite(configTradeTrash)

    // Handle NFT Exchange
    const {config: configNFTExchange} = usePrepareContractWrite({
        address: contractAddressSampah,
        abi: SampahAbi,
        functionName: 'nftExchange',
        args: [
            textOwnerAddress,
            textTokenId,
            textSembako
        ]
    });
    const {write: writeNFTExchange} = useContractWrite(configNFTExchange)




    return(
        <section className="kelola">
            <Container>
            <div className="box-kelola">
                <Row>
                    <Col>
                        <Card className="custom-card" border="danger" style={{ width: '30rem', height:'20em', marginBottom: '15px', borderRadius:'15px' }}>
                        <Card.Body>
                            <Card.Title className="custom-card-title" style={{ marginBottom: '50px', textAlign:'center', fontSize:'30px' }} >ADD CATEGORY</Card.Title>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                type="text" 
                                placeholder="Input Category" 
                                value={textCategory}
                                onChange={handleCategory}
                                 />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Input TokenURI"
                                value={textTokenURI}
                                onChange={handleTokenURI}
                                />
                            </Form.Group>
                            <Button variant="primary" 
                            onClick={writeAddCategory}
                            disabled={textCategory && textTokenURI ? false : true}
                            >SUBMIT</Button>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="custom-card" border="info" style={{ width: '30rem', height:'20em', marginBottom: '15px', borderRadius:'15px' }}>
                        <Card.Body>
                            <Card.Title className="custom-card-title" style={{ marginBottom: '50px', textAlign:'center', fontSize:'30px' }} >ADD ADMIN</Card.Title>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                type="text" 
                                placeholder="Input Address" 
                                value={textUser}
                                onChange={handleUser}
                                 />
                            </Form.Group>
                            <Button variant="primary" 
                            onClick={writeAddAdmin}
                            disabled={textUser ? false : true}
                            >SUBMIT</Button>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="custom-card" border="warning" style={{ width: '30rem', height:'20em', marginBottom: '15px', borderRadius:'15px' }}>
                        <Card.Body>
                            <Form>
                            <Card.Title className="custom-card-title" style={{ marginBottom: '50px', textAlign:'center', fontSize:'30px' }} >
                                IS ADMIN : { dataIsAdmin && (dataIsAdmin) !='' ? 'YA' : 'NO'}</Card.Title>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                type="text" 
                                placeholder="Check Address" 
                                value={textAddressAdmin}
                                onChange={handleAddressAdmin}
                                 />
                            </Form.Group>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="custom-card" border="success" style={{ width: '30rem', height:'20em', marginBottom: '15px', borderRadius:'15px' }}>
                        <Card.Body>
                            <Form>
                            <Card.Title className="custom-card-title" style={{ marginBottom: '50px', textAlign:'center', fontSize:'30px' }} >
                                IS CATEGORY : { dataIsCategory && (dataIsCategory) !='' ? 'YA' : 'NO'}</Card.Title>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                type="text" 
                                placeholder="Check Category" 
                                value={textCategory}
                                onChange={handleCategory}
                                 />
                            </Form.Group>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="custom-card" border="primary" style={{ width: '30rem', height:'30em', marginBottom: '15px', borderRadius:'15px' }}>
                        <Card.Body>
                            <Card.Title className="custom-card-title" style={{ marginBottom: '50px', textAlign:'center', fontSize:'30px' }} >TRADE TRASH</Card.Title>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text"placeholder="Input Name Owner" 
                                value={textOwnerName}
                                onChange={handleOwnerName}
                                 />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Input Address Owner"
                                value={textOwnerAddress}
                                onChange={handleOwnerAddress}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Input Weight Trash in Gram"
                                value={textWeight}
                                onChange={handleWeight}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Input Category"
                                value={textCategory}
                                onChange={handleCategory}
                                />
                            </Form.Group>
                            <Button variant="primary" 
                            onClick={writeTradeTrash}
                            disabled={textOwnerName && textOwnerAddress && textWeight && textCategory ? false : true}
                            >SUBMIT</Button>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="custom-card" border="dark" style={{ 
                            width: '30rem', height:'30em', marginBottom: '15px', borderRadius:'15px' }}>
                        <Card.Body>
                            <Card.Title className="custom-card-title" style={{ marginBottom: '50px', textAlign:'center', fontSize:'30px' }} >NFT EXCHANGE</Card.Title>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                type="text" 
                                placeholder="Input Owner Address" 
                                value={textOwnerAddress}
                                onChange={handleOwnerAddress}
                                 />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Input TokenId NFT"
                                value={textTokenId}
                                onChange={handleTokenId}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Input Sembako"
                                value={textSembako}
                                onChange={handleSembako}
                                />
                            </Form.Group>
                            <Button variant="primary" 
                            onClick={writeNFTExchange}
                            disabled={textOwnerAddress && textTokenId && textSembako ? false : true}
                            >SUBMIT</Button>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </div>
                </Container>
        </section>
    )
}