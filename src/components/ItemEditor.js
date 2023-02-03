import {useNavigate} from "react-router-dom";
import {Button, Container, Form, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import ItemService from "../services/item.service";
import Select from "react-select";
import {SingleValue} from "react-select/animated";
import Barcode from "react-barcode";

function ItemCreator() {
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
    const [barCode, setBarCode] = useState("");
    const [updated, setUpdated] = useState(true);
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};

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

    const isUpdated = () => {
        if (updated) {
            refresh();
            setUpdated(false);
        }
    }

    useEffect(isUpdated);

    const refresh = () => {
        ItemService.getItem(localStorage.getItem("itemID")).then(
            (response) => {
                setMessage(response.data.message);
                setName(response.data.name);
                setCategory(response.data.classification);
                setPurchaseDate(response.data.purchaseDate);
                setCurrencyValue(response.data.currencyValue);
                setDescription(response.data.description);
                setLoc(response.data.location);
                setBarCode(response.data.barCodeNumber);
                setPrice(response.data.purchasePrice);
                setFaxNumber(response.data.faxNumber);
                setDepreciation(response.data.amountOfAnnualDepreciation);
            },
            (error) => {
                const resMessage = (error.response && error.response.data) || error.message || error.toString();
                setMessage(resMessage);
            }
        )
    }

    const onFormSubmit = e => {
        e.preventDefault();
        console.log(purchaseDate);
        console.log(category);
        ItemService.updateItem(localStorage.getItem("itemID"), name, purchaseDate, faxNumber, price, depreciation,
            currencyValue, description, loc, category, barCode).then(
            (response) => {
                setMessage(response.data.message);
                setUpdated(true);
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
            <h3>EDYTUJ PRZEDMIOT</h3>
            <Table striped>
                <thead>
                <tr>
                    <td>
                        ID
                    </td>
                    <td>
                        Nazwa
                    </td>

                    <td>
                        Data zakupu
                    </td>
                    <td>
                        Lokalizacja
                    </td>
                    <td>
                        Faks
                    </td>
                    <td>
                        Cena
                    </td>
                    <td>
                        Deprecjacja
                    </td>
                    <td>
                        Wartość waluty
                    </td>
                    <td>
                        Opis
                    </td>
                    <td>
                        Kategoria
                    </td>
                    <td>
                        Kod
                    </td>
                    <td>

                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        {localStorage.getItem("itemID")}
                    </td>
                    <td>
                        {name}
                    </td>
                    <td>
                        {new Date(purchaseDate).toLocaleDateString([], options)}
                    </td>
                    <td>
                        {loc}
                    </td>
                    <td>
                        {faxNumber}
                    </td>
                    <td>
                        {price}
                    </td>
                    <td>
                        {depreciation}
                    </td>
                    <td>
                        {currencyValue}
                    </td>
                    <td>
                        {description}
                    </td>
                    <td>
                        {category}
                    </td>
                    <td>
                        {barCode}
                    </td>
                </tr>
                </tbody>
            </Table>
            <br/>
            <Container>
                <Barcode value={barCode}/>
            </Container>
            <Form onSubmit={onFormSubmit}>
                <Form.Group controlId="text">
                    <Form.Label>Nazwa</Form.Label>
                    <Form.Control type="text" onChange={e => {setName(e.target.value);}} defaultValue={name}/>
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Label>Data zakupu</Form.Label>
                    <Form.Control type="date" onChange={e => {setPurchaseDate(e.target.value);}}/>
                </Form.Group>
                <Form.Group controlId="number">
                    <Form.Label>Cena zakupu</Form.Label>
                    <Form.Control type="number" onChange={e => {setPrice(e.target.value);}} value={price}/>
                </Form.Group>
                <Form.Group controlId="number">
                    <Form.Label>Deprecjacja</Form.Label>
                    <Form.Control type="number" onChange={e => {setDepreciation(e.target.value);}} value={depreciation}/>
                </Form.Group>
                <Form.Group controlId="number">
                    <Form.Label>Wartość</Form.Label>
                    <Form.Control type="number" onChange={e => {setCurrencyValue(e.target.value);}} value={currencyValue}/>
                </Form.Group>
                <Form.Group controlId="text">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control type="text" onChange={e => {setDescription(e.target.value);}} value={description}/>
                </Form.Group>
                <Form.Group controlId="text">
                    <Form.Label>Lokalizacja</Form.Label>
                    <Form.Control type="text" onChange={e => {setLoc(e.target.value);}} defaultValue={loc}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Kategoria</Form.Label>
                    <Select options={categories} components={SingleValue} onChange={changeCategory} value={category}/>
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