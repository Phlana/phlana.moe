import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';

const Home = () => {
    return (
        <div className='home page'>
            <div style={{ background: "#E0E0E0" }}>
                <Link to="https://discord.com/oauth2/authorize?client_id=1230024072096776213&response_type=code&redirect_uri=http%3A%2F%2Fphlana.moe%2Fauth%2Fdiscord&scope=guilds+identify+guilds.members.read">
                    <img src="/discord.webp" style={{ width: 48 }} />
                </Link>
            </div>
            <Container className='home justify-content-center align-items-center flex-grow-1'>
                <div className='home title jersey-10-regular font-effect-3d'>
                    phlana
                </div>
            </Container>
        </div>
    );
};

export default Home;
