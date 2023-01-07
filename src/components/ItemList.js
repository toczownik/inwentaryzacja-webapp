import {useEffect, useState} from "react";
import {Button, Container, Form, FormControl, FormGroup, FormLabel, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ItemService from "../services/item.service";

function ItemList() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(4);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [tableChanged, setTableChanged] = useState(true);
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};

    const categories = [
        {value: "grunty", label: "LAND"},
        {value: "budynki i lokale oraz spółdzielcze prawo do lokalu użytkowego i spółdzielcze własnościowe prawo do lokalu mieszkalnego", label: "BUILDINGS_DWELLING"},
        {value: "obiekty inżynierii lądowej i wodnej", label: "CIVIL_ENGINEER_STRUCTURE"},
        {value: "kotły i maszyny energetyczne", label: "BOILER_POWER_MACHINERY"},
        {value: "maszyny, urządzenia i aparaty ogólnego zastosowania", label: "SPECIALIZED_MACHINERY_EQUIPMENT_GENERAL_USE"},
        {value: "maszyny, urządzenia i aparaty specjalistyczne", label: "SPECIALIZED_MACHINERY_EQUIPMENT_APPARATUS"},
        {value: "urządzenia technicznie", label: "TECHNICAL_EQUIPMENT"},
        {value: "środki transportu", label: "TRANSPORT"},
        {value: "narzędzia, przyrządy, ruchomości i wyposażenie, gdzie indziej niesklasyfikowane", label: "ANOTHER"},
        {value: "inwentarz żywy", label: "LIVESTOCK"}
    ]

    const refresh = () => {
      ItemService.getItemsPage(page, size).then(
          (response) => {
              setMessage(response.data.message);
              setItems(Object.entries(response.data.itemList));
              setCount(response.data.countItems);
          },
          (error) => {
              const resMessage = (error.response && error.response.data) || error.message || error.toString();
              setMessage(resMessage);
          }
      )
    }

    const refreshTable = () => {
        if (tableChanged) {
            refresh();
            setTableChanged(false);
        }
    }

    const nextPage = () => {
        setPage(page + 1);
        setTableChanged(true);
    }

    useEffect(refreshTable);

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
            setTableChanged(true);
        }
    }

    const toLogs = () => {
        navigate("/logs");
        window.location.reload();
    }

    const changeSize = (e) => {
        e.preventDefault();
        setTableChanged(true);
    }

    return(
        <Container>
            <h3>INWENTARZ</h3>
            <Button variant="primary" type="button" onClick={refresh}>
                ODŚWIEŹ
            </Button>
            <Button variant="primary" type="button" onClick={toLogs}>
                POWRÓT
            </Button>
            {(page > 0) && <Button variant="primary" type="button" onClick={prevPage}>
                POPRZEDNIA STRONA
            </Button>}
            {((count/size)-page > 1) && <Button variant="primary" type="button" onClick={nextPage}>
                NASTĘPNA STRONA
            </Button>}
            <br/>
            <Form onSubmit={changeSize}>
                <FormGroup>
                    <FormLabel>liczba przedmiotów na jednej stronie</FormLabel>
                    <FormControl type="number" onChange={e => {setSize(e.target.value);}}/>
                </FormGroup>
                <Button type="submit" variant="primary">
                    POTWIERDŹ
                </Button>
            </Form>
            <br/>
            strona: {page + 1}
            <br/>
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
                </tr>
                </thead>
                <tbody>
                {items.map(([i, value]) => (
                    <tr key={i}>
                        <td>
                            {value.id}
                        </td>
                        <td>
                            {value.name}
                        </td>
                        <td>
                            {new Date(value.purchaseDate).toLocaleDateString([], options)}
                        </td>
                        <td>
                            {value.faxNumber}
                        </td>
                        <td>
                            {value.purchasePrice}
                        </td>
                        <td>
                            {value.amountOfAnnualDepreciation}
                        </td>
                        <td>
                            {value.currencyValue}
                        </td>
                        <td>
                            {value.description}
                        </td>
                        <td>
                            {categories.find(c => c.label === value.classification).value}
                        </td>
                        <td>
                            {value.barCodeNumber}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {message}
        </Container>
    )
}

export default ItemList;