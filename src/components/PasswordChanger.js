import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import UserService from "../services/user.service";
import {Link, useNavigate} from "react-router-dom";

function PasswordChanger() {
    let navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const onFormSubmit = e => {
        e.preventDefault();
        UserService.setNewPassword(token, password).then(
            (response => {
                setMessage(response.message);
                navigate("/login");
                window.location.reload();
            }),
            (error) => {
                setMessage(error.response.data.message);
            }
        );
    }
    return (
        <div>
            <h3>ZMIANA HASŁA</h3>
            Kod został wysłany na podany adres
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Kod</Form.Label>
                    <Form.Control type="text" placeholder="kod" onChange={e => {setToken(e.target.value);}}/>
                </Form.Group>
                <Form.Label>{message}</Form.Label>
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
        </div>
    );
}

export default PasswordChanger;