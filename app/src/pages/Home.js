import { useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import bg from "../assets/img/home.webp"
import bnr from "../assets/img/bnr.webp"
import { About } from "./About";
import CarouselImage from '../assets/img/home.webp';



export const Home = () =>{
    return(
        <><section className="home">
            <Container>
                <Row>
                    <div className="d-flex">
                        <Col>
                            <div className="wrap-text">
                                <h1>Blockchain & <span>NFT</span></h1>
                                <h2>Inovasi <span>Pengelolaan</span></h2>
                                <h2><span>Sampah Berkelanjutan</span></h2>
                                <p>kami membantu pengelolaan sampah berkelanjutan dengan inovasi menggunakan teknologi Blockchain dan NFT sebagai rewards yang akan didapatkan oleh kontributor. </p>
                            </div>
                        </Col>
                        <Col>
                            <div className="image">
                                <img src={bg}></img>
                            </div>
                        </Col>
                    </div>
                </Row>
            </Container>
        </section><>
            <About />
        </></>
    )
}