import {useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './ItemList.css';
import InventoryService from "../services/inventory.service";

function Inventory() {
    const [message, setMessage] = useState("")
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(4);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [tableChanged, setTableChanged] = useState(true);

    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};

    const refresh = () => {
        InventoryService.getInventory(page, size).then(
            (response) => {
                setMessage(response.data.message);
                setItems(Object.entries(response.data.itemDtoList));
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

    const check = (e) => {
        e.preventDefault()
        InventoryService.checkItem(e).then(
            (response) => {
                setMessage(response.data.message);
                setTableChanged(true);
            },
            (error) => {
                const resMessage = (error.response && error.response.data) || error.message || error.toString();
                setMessage(resMessage);
            }
        )
    }

    return(
        <Container>
            <h3>INWENTARZ</h3>
            <br/>
            <Container>
                <h5>Liczba elementów na stronie</h5>
                <Button type="button" variant="primary" onClick={() => {changeSize(2)}} style={{margin: 10}}>
                    2
                </Button>
                <Button type="button" variant="primary" onClick={() => {changeSize(5)}} style={{margin: 10}}>
                    5
                </Button>
                <Button type="button" variant="primary" onClick={() => {changeSize(10)}} style={{margin: 10}}>
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
                        Nazwa
                    </td>
                    <td>
                        Kod
                    </td>
                    <td>
                        Opis
                    </td>
                    <td>
                        Użytkownik
                    </td>
                    <td>
                        Data
                    </td>
                    <td>
                        Potwierdzenie
                    </td>
                </tr>
                </thead>
                <tbody>
                {items.map(([i, value]) => (
                    <tr key={i}>
                        <td>
                            {value.itemName}
                        </td>
                        <td>
                            {value.barCode}
                        </td>
                        <td>
                            {value.description}
                        </td>
                        <td>
                            {value.username}
                        </td>
                        <td>
                            {new Date(value.dataOfInventory).toLocaleDateString([], options)}
                        </td>
                        <td>
                            {value.isOk ? "potwierdzony" : "niepotwierdzony"}
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

export default Inventory;