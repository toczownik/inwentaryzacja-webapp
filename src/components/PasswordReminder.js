import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import UserService from "../services/user.service";


function PasswordReminder() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const onFormSubmit = e => {
        e.preventDefault();
        UserService.changePassword(email).then(
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
        <div className="PasswordReminder">
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
        </div>
    );
}

export default PasswordReminder;