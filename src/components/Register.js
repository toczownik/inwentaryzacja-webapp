import './Login.css';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import AuthService from "../services/auth.service";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const onFormSubmit = e => {
        e.preventDefault();
        AuthService.register(firstName, lastName, email, password).then(
            (response => {
                setMessage(response.data.message);
            }),
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }
        );
        console.log(message);
    }
    return (
        <div className="Login">
            <h3>FORMULARZ REJESTRACYJNY</h3>
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Imię</Form.Label>
                    <Form.Control type="text" placeholder="imię" onChange={e => {setFirstName(e.target.value);}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control type="text" placeholder="nazwisko" onChange={e => {setLastName(e.target.value);}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adres email</Form.Label>
                    <Form.Control type="email" placeholder="adres email" onChange={e => {setEmail(e.target.value);}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" placeholder="hasło" onChange={e => {setPassword(e.target.value);}}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    POTWIERDŹ
                </Button>
                <Link to="/login">
                    Posiadam już konto
                </Link>
            </Form>
        </div>
    );
}

export default Register;