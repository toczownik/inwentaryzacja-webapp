import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import AuthService from "../services/auth.service";
import {Container, Button, Form} from "react-bootstrap";
import './Login.css';

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [trials, setTrials] = useState(0);
    const [prevMail, setPrevMail] = useState("");
    const onFormSubmit = e => {
        e.preventDefault();
        AuthService.login(email, password).then(
            (response) => {
                localStorage.setItem('token', response.data.Authorization);
                navigate("/list");
                window.location.reload();
            },
            (error) => {
                const resMessage = (error.response && error.response.data) || error.message || error.toString();
                if (email === prevMail) {
                    setTrials(trials + 1);
                    if (trials >= 3) {
                        setMessage("Konto jest tymczasowo zablokowane");
                    } else {
                        setMessage(resMessage);
                    }
                } else {
                    setPrevMail(email);
                    setTrials(1);
                }
            }
        )
    }
    return (
        <Container >
            <h3 className="title">WITAMY</h3>
            <Form className="login-form" onSubmit={onFormSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Adres email</Form.Label>
                    <Form.Control type="email" placeholder="adres email" onChange={e => {setEmail(e.target.value);}}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" placeholder="hasło" onChange={e => {setPassword(e.target.value);}}/>
                </Form.Group>
                <Form.Label>{message}</Form.Label>
                <Container>
                    <Button variant="primary" type="submit">
                        ZALOGUJ
                    </Button>
                </Container>
                <Container>
                    <Link to="/reminder" >
                        Nie pamiętam hasła
                    </Link>
                </Container>
                <Container>
                    <Link to="/register">
                        Nie mam konta
                    </Link>
                </Container>
            </Form>
        </Container>
    );
}

export default Login;