import {useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import ItemService from "../services/item.service";

function ItemCreator() {
    let navigate = useNavigate();
    const [id, setId] = useState(0);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");

    const toLogs = e => {
        e.preventDefault();
        navigate("/logs");
        window.location.reload();
    };

    const onFormSubmit = e => {
        e.preventDefault();
        ItemService.updateItem(id, name).then(
            (response) => {
                setMessage(response.data.message);
            },
            (error) => {
                const resMessage = (error.response && error.response.data) || error.message || error.toString();
                setMessage(resMessage);
            }
        )
    }

    return (
        <Container>
            <h3>EDYTUJ ELEMENT</h3>
            <Button variant="primary" type="button" onClick={toLogs}>
                LOGI
            </Button>
            <Form onSubmit={onFormSubmit}>
                <Form.Group controlId="id">
                    <Form.Label>Identyfikator</Form.Label>
                    <Form.Control type="number" placeholder="id" onChange={e => {setId(e.target.value);}}/>
                </Form.Group>
                <Form.Group controlId="text">
                    <Form.Label>Nazwa</Form.Label>
                    <Form.Control type="text" placeholder="name" onChange={e => {setName(e.target.value);}}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    EDYTUJ
                </Button>
                {message}
            </Form>
        </Container>
    );
}

export default ItemCreator;