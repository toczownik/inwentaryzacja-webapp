import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserService from "../services/user.service";


function PasswordReminder() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const onFormSubmit = e => {
        e.preventDefault();
        UserService.changePassword(email).then(
            (response => {
                setMessage(response.data.message);
                navigate("/settings");
                window.location.reload();
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
        <Container>
            <h3>WYŚLIJ MAILA Z LINKIEM DO ZMIANY HASŁA</h3>
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Adres email</Form.Label>
                    <Form.Control type="email" placeholder="adres email" onChange={e => {setEmail(e.target.value);}}/>
                </Form.Group>
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

export default PasswordReminder;