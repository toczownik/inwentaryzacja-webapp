import {useEffect, useState} from "react";
import {Button, Container, Form, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ItemService from "../services/item.service";
import Select from "react-select";
import {SingleValue} from "react-select/animated";
import './ItemList.css';

function ItemList() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(4);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [tableChanged, setTableChanged] = useState(true);
    const [column, setColumn] = useState("name");
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

    const columns = [
        {label: "nazwa", value: "name"},
        {label: "data zakupu", value: "purchaseDate"},
        {label: "cena zakupu", value: "purchasePrice"}
    ]

    const refresh = () => {
      ItemService.getItemsPage(page, size, column).then(
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

    const changeSize = (e) => {
        setSize(e)
        console.log(e)
        setTableChanged(true);
    }

    const toEdit = (e) => {
        localStorage.setItem("itemID", e);
        navigate("/update");
        window.location.reload();
    }

    const changeColumn = (e) => {
        setColumn(e);
        setTableChanged(true);
    }

    return(
        <Container>
            <h3>INWENTARZ</h3>
            <br/>
            <Container>
                <h5>Liczba elementów na stronie</h5>
                <Button type="button" variant="primary" onClick={() => {changeSize(2)}}>
                    2
                </Button>
                <Button type="button" variant="primary" onClick={() => {changeSize(5)}}>
                    5
                </Button>
                <Button type="button" variant="primary" onClick={() => {changeSize(10)}}>
                    10
                </Button>
            </Container>
            <br/>
            <br/>
            strona: {page + 1}
            <br/>
            <Table striped>
                <thead>
                <tr>
                    <td>
                        <Button className={"sortingButton"} type={"button"} onClick={() => {changeColumn("id")}}>
                            ID
                        </Button>
                    </td>
                    <td>
                        <Button className={"sortingButton"} type={"button"} onClick={() => {changeColumn("name")}}>
                            Nazwa
                        </Button>
                    </td>
                    <td>
                        <Button className={"sortingButton"} type={"button"} onClick={() => {changeColumn("purchaseDate")}}>
                            Data zakupu
                        </Button>
                    </td>
                    <td>
                        Faks
                    </td>
                    <td>
                        <Button className={"sortingButton"} type={"button"} onClick={() => {changeColumn("purchasePrice")}}>
                            Cena
                        </Button>
                    </td>
                    <td>
                        <Button className={"sortingButton"} type={"button"} onClick={() => {changeColumn("amountOfAnnualDepreciation")}}>
                            Deprecjacja
                        </Button>
                    </td>
                    <td>
                        <Button className={"sortingButton"} type={"button"} onClick={() => {changeColumn("currencyValue")}}>
                            Wartość
                        </Button>
                    </td>
                    <td>
                        Opis
                    </td>
                    <td>
                        Kategoria
                    </td>
                    <td>
                        <Button className={"sortingButton"} type={"button"} onClick={() => {changeColumn("barCodeNumber")}}>
                            Kod
                        </Button>
                    </td>
                    <td>

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
                        <td>
                            <Button type="button" onClick={() => toEdit(value.id)}>
                                EDYCJA I SZCZEGÓŁY
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Container className="navigation">
                {(page > 0) && <Button variant="primary" type="button" onClick={prevPage}>
                    POPRZEDNIA STRONA
                </Button>}
                {((count/size)-page > 1) && <Button variant="primary" type="button" onClick={nextPage}>
                    NASTĘPNA STRONA
                </Button>}
            </Container>
        </Container>
    )
}

export default ItemList;