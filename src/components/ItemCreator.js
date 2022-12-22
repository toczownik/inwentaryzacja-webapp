import {useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import ItemService from "../services/item.service";

function ItemCreator() {
    let navigate = useNavigate();
    const [id, setId] = useState(0);
    const [element, setElement] = useState({});
    const [message, setMessage] = useState("");
    const onFormSubmit = e => {
        e.preventDefault();
        ItemService.getItem(id).then(
            (response) => {
                setElement(response.data);
                setMessage(response.data.message);
            },
            (error) => {
                const resMessage = (error.response && error.response.data) || error.message || error.toString();
                setMessage(resMessage);
            }
        )
    };

    const toLogs = e => {
        navigate("/logs");
        window.location.reload();
    };

    return (
        <Container>
            <h3>ZOBACZ PRZEDMIOT</h3>
            <Button variant="primary" type="button" onClick={toLogs}>
                LOGI
            </Button>
            <Form onSubmit={onFormSubmit}>
                <Form.Group controlId="number">
                    <Form.Label>Nazwa</Form.Label>
                    <Form.Control type="number" placeholder="id" onChange={e => {setId(e.target.value);}}/>
                </Form.Group>
            </Form>
            {element.name}
            <br/>
            {message}
        </Container>
    );
}

export default ItemCreator;