import { Container, Row, Col } from "react-bootstrap";
import NftPuller from "../n2dpuller/nftpuller"

export const NFT = () => {
    return(
    <section className="nft">
        <Container>
            <Row>
                <Col>
                <div className="puller">
                    <NftPuller/>    
                </div>
                </Col>
            </Row>
        </Container>
    </section>
    )
}