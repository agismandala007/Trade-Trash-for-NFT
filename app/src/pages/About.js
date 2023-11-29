import { Container, Row, Col } from "react-bootstrap";
import about from "../assets/img/about.webp"


export const About = () =>{
    return(
        <section className="about">
            <Container>
                <Row>
                <div className="d-flex">
                    <Col>
                    <div className="image">
                        <img src={about}></img>
                    </div>
                    </Col>
                    <Col>
                    <div className="wrap-text">
                        <h1>Tentang <span>Kami</span></h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur ducimus eligendi ratione laudantium</p> 
                        <p>quae possimus voluptas dolorum provident ut minus, at aliquam aut quaerat dolorem officia perferendis repellendus</p> 
                        <p>mollitia expedita unde aspernatur tempora qui facere ea? Rerum atque optio ad voluptatum error nisi iusto corrupti provident, quas tempora,</p> 
                        <p>consequuntur distinctio dolore quisquam quasi. Corrupti perspiciatis reiciendis enim vitae temporibus ducimus officiis delectus fuga dignissimos quo nemo natus,</p>
                    </div>
                    </Col>
                </div>
                </Row>
            </Container>
        </section>
    )
}