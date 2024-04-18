import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const home = () => {
    return (
        <div className='flex-grow-1'>
            <div style={{ background: "#E0E0E0" }}>
                <Link to="https://discord.com/oauth2/authorize?client_id=1230024072096776213&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&scope=guilds+identify">
                    <img src="/discord.webp" style={{ width: 48}} />
                </Link>
            </div>
            <Container style={{ width: 900, background: "#CCCCCC" }} className='justify-content-center flex-grow-1'>
                <Row>
                    <Col>
                        home page
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default home;