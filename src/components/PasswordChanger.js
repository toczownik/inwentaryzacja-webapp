import {Button, Form, Container} from "react-bootstrap";
import {useState} from "react";
import UserService from "../services/user.service";
import {Link} from "react-router-dom";

function PasswordChanger() {
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const onFormSubmit = e => {
        e.preventDefault();
        UserService.setNewPassword(token, password).then(
            (response => {
                setMessage(response.data);
            }),
            (error) => {
                const resMessage = (error.response && error.response.data) || error.message || error.toString();
                setMessage(resMessage);
            }
        );
    }
    return (
        <Container>
            <h3>ZMIANA HASŁA</h3>
            Kod został wysłany na podany adres
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Kod</Form.Label>
                    <Form.Control type="text" placeholder="kod" onChange={e => {setToken(e.target.value);}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nowe hasło</Form.Label>
                    <Form.Control type="password" placeholder="nowe hasło" onChange={e => {setPassword(e.target.value);}}/>
                </Form.Group>
                <Form.Label>{message}</Form.Label>
                <Button variant="primary" type="submit">
                    POTWIERDŹ
                </Button>
                <Link to="/">
                    Wróć
                </Link>
            </Form>
        </Container>
    );
}

export default PasswordChanger;