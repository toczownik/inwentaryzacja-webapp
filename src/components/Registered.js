import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";

function Registered() {
    return (
        <Container>
            <h3>REJESTRACJA POWIODŁA SIĘ</h3>
            Na podany mail wysłano link aktywacyjny<br/>
            <Link to="/login">
                Powrót do logowania
            </Link>
        </Container>
    );
}

export default Registered;