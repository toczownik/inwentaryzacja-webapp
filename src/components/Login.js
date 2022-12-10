import {Link, useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import AuthService from "../services/auth.service";

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const onFormSubmit = e => {
        e.preventDefault();
        AuthService.login(email, password).then(
            (response) => {
                localStorage.setItem('token', response.data.Authorization);
                navigate("/settings");
                window.location.reload();
            },
            (error) => {
                const resMessage = (error.response && error.response.data) || error.message || error.toString();
                setMessage(resMessage);
                console.log(message);
            }
        )
    }
    return (
        <div className="Login">
            <h3>WITAMY</h3>
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Adres email</Form.Label>
                    <Form.Control type="email" placeholder="adres email" onChange={e => {setEmail(e.target.value);}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" placeholder="hasło" onChange={e => {setPassword(e.target.value);}}/>
                </Form.Group>
                <Form.Label>{message}</Form.Label>
                <Button variant="primary" type="submit">
                    POTWIERDŹ
                </Button>
                <Link to="/reminder">
                    Nie pamiętam hasła
                </Link>
                <Link to="/register">
                    Nie mam konta
                </Link>
            </Form>
        </div>
    );
}

export default Login;