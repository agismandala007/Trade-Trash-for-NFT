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
    const contractAddressNFTSampah = '0x16528DA5DbfD3F8666875a786D98dafB12f7d6c9';
    const contractAddressSampah = '0xC4AC24e9618283Dc42C39D0bd93826155d942153';

    // Handle Add Category
    const {config: configAddCategory } = usePrepareContractWrite({
        address: contractAddressSampah,
        abi: SampahAbi,
        functionName: 'addCategory',
        args: [textCategory, textTokenURI]
    });
    const {write: writeAddCategory } = useContractWrite(configAddCategory)
    const handleAddCategory = async () => {
        try {
            if (window.confirm('Apakah Anda yakin ingin menambahkan kategori?')) {
                await writeAddCategory();
                window.alert('Silahkan konfirmasi untuk melanjutkan transaksi');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            window.alert('Failed to add category. Please check the console for more details.');
        }
    };

    // Handle Add Admin
    const {config: configAddAdmin} = usePrepareContractWrite({
        address: contractAddressNFTSampah,
        abi: NFTSampahAbi,
        functionName: 'addAdmin',
        args: [textUser]
    });
    const {write: writeAddAdmin} = useContractWrite(configAddAdmin)
    const handleAddAdmin = async () => {
        try {
            if (window.confirm('Apakah Anda yakin ingin menambahkan admin?')) {
                await writeAddAdmin();
                window.alert('Silahkan konfirmasi untuk melanjutkan transaksi');
            }
        } catch (error) {
            console.error('Error adding admin:', error);
            window.alert('Failed to add admin. Please check the console for more details.');
        }
    };

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
    const handleTradeTrash = async () => {
        try {
            if (window.confirm('Apakah Anda yakin ingin melakukan penukaran Sampah menjadi NFT ?')) {
                await writeTradeTrash();
                window.alert('Silahkan konfirmasi untuk melanjutkan transaksi');
            }
        } catch (error) {
            console.error('Error Trade Trash:', error);
            window.alert('Failed to Trade Trash. Please check the console for more details.');
        }
    };


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
    const handleNFTExchange = async () => {
        try {
            if (window.confirm('Apakah Anda yakin ingin melakukan penukaran NFT ?')) {
                await writeNFTExchange();
                window.alert('Silahkan konfirmasi untuk melanjutkan transaksi');
            }
        } catch (error) {
            console.error('Error NFT Exchange:', error);
            window.alert('Failed to NFT Exchange. Please check the console for more details.');
        }
    };


    const { data: Auth } = useContractRead({
        address: contractAddressNFTSampah,
        abi: NFTSampahAbi,
        functionName: 'is_admin',
        args: [address]
    });
    const isAdmin = Auth && Auth !== '';


    return(
        <section className="kelola">
            {isAdmin ? (
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
                            onClick={handleAddCategory}
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
                            onClick={handleAddAdmin}
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
                            onClick={handleTradeTrash}
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
                            onClick={handleNFTExchange}
                            disabled={textOwnerAddress && textTokenId && textSembako ? false : true}
                            >SUBMIT</Button>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </div>
                </Container>
                    ) : (
                    <Container>
                        <Row>
                            <Col>
                                <h1>Hanya Admin Yang Dapat Melakukan Transaksi Pada Menu ini, Silahkan Connect Wallet Sebagai Admin Terlebih dahulu.</h1>
                            </Col>
                        </Row>
                    </Container>
                    )
                }
        </section>
    )
}