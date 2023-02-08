import {useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import ItemService from "../services/item.service";
import Select from "react-select";
import {SingleValue} from "react-select/animated";

function ItemCreator() {
    let navigate = useNavigate();
    const [id, setId] = useState(0);
    const [element, setElement] = useState({});
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [faxNumber, setFaxNumber] = useState(0);
    const [price, setPrice] = useState(0);
    const [depreciation, setDepreciation] = useState(0);
    const [currencyValue, setCurrencyValue] = useState(0);
    const [description, setDescription] = useState("");
    const [loc, setLoc] = useState("");
    const [category, setCategory] = useState("");

    const categories = [
        {label: "grunty", value: "LAND"},
        {label: "budynki i lokale oraz spółdzielcze prawo do lokalu użytkowego i spółdzielcze własnościowe prawo do lokalu mieszkalnego", value: "BUILDINGS_DWELLING"},
        {label: "obiekty inżynierii lądowej i wodnej", value: "CIVIL_ENGINEER_STRUCTURE"},
        {label: "kotły i maszyny energetyczne", value: "BOILER_POWER_MACHINERY"},
        {label: "maszyny, urządzenia i aparaty ogólnego zastosowania", value: "SPECIALIZED_MACHINERY_EQUIPMENT_GENERAL_USE"},
        {label: "maszyny, urządzenia i aparaty specjalistyczne", value: "SPECIALIZED_MACHINERY_EQUIPMENT_APPARATUS"},
        {label: "urządzenia technicznie", value: "TECHNICAL_EQUIPMENT"},
        {label: "środki transportu", value: "TRANSPORT"},
        {label: "narzędzia, przyrządy, ruchomości i wyposażenie, gdzie indziej niesklasyfikowane", value: "ANOTHER"},
        {label: "inwentarz żywy", value: "LIVESTOCK"}
    ]

    const addItem = e => {
        e.preventDefault();
        ItemService.addItem(name, purchaseDate, faxNumber, price, depreciation, currencyValue, description, loc,
            category).then(
            (response) => {
                setElement(response.data);
                setMessage(response.data.message);
                navigate("/list");
                window.location.reload();
            },
            (error) => {
                const resMessage = (error.response && error.response.data) || error.message || error.toString();
                setMessage(resMessage);
            }
        )
    }

    const changeCategory = e => {
        setCategory(e.value);
    }

    return (
        <Container>
            <h2>
                DODAJ PRZEDMIOT
            </h2>
            <Form onSubmit={addItem}>
                <Form.Group controlId="text">
                    <Form.Label>Nazwa</Form.Label>
                    <Form.Control type="text" placeholder="name" onChange={e => {setName(e.target.value);}}/>
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Label>Data zakupu</Form.Label>
                    <Form.Control type="date" placeholder="purchase date" onChange={e => {setPurchaseDate(e.target.value);}}/>
                </Form.Group>
                <Form.Group controlId="number">
                    <Form.Label>Cena zakupu</Form.Label>
                    <Form.Control type="number" placeholder="cena" onChange={e => {setPrice(e.target.value);}}/>
                </Form.Group>
                <Form.Group controlId="number">
                    <Form.Label>Deprecjacja</Form.Label>
                    <Form.Control type="number" placeholder="deprecjacja" onChange={e => {setDepreciation(e.target.value);}}/>
                </Form.Group>
                <Form.Group controlId="text">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control type="text" placeholder="opis" onChange={e => {setDescription(e.target.value);}}/>
                </Form.Group>
                <Form.Group controlId="text">
                    <Form.Label>Lokalizacja</Form.Label>
                    <Form.Control type="text" placeholder="lokalizacja" onChange={e => {setLoc(e.target.value);}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Kategoria</Form.Label>
                    <Select options={categories} components={SingleValue} onChange={changeCategory}/>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                    DODAJ
                </Button>
                {message}
            </Form>
        </Container>
    );
}

export default ItemCreator;