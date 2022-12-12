import {Button, Container, Table} from "react-bootstrap";
import UserService from "../services/user.service";
import {useState} from "react";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";

function Logs() {
    const navigate = useNavigate()
    const [logs, setLogs] = useState([]);
    const [message, setMessage] = useState("");
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};

    const logout = e => {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
    }

    const refresh = e => {
        UserService.getLogs().then(
            (response) => {
                setMessage(response.data.message);
                setLogs(response.data);
            },
            (error) => {
                const resMessage = (error.response && error.response.data) || error.message || error.toString();
                setMessage(resMessage);
            }
        )
    }

    return (
        <Container>
            <h3>LOGI</h3>
            {message}
            <Button variant="primary" type="button" onClick={refresh}>
                ODŚWIEŻ
            </Button>
            <Button variant="primary" type="button" onClick={logout}>
                WYLOGUJ
            </Button>
            <Table striped>
                <thead>
                <tr>
                    <td>
                        Data
                    </td>
                    <td>
                        Sukces
                    </td>
                </tr>
                </thead>
                <tbody>
                    {Object.entries(logs).map(([i, value]) => (
                        <tr key={i}>
                            <td>
                                {new Date(value.whenAttempt).toLocaleDateString([], options)}
                            </td>
                            <td>
                                {value.isSuccessful.toString()}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        </Container>
    );
}

export default Logs;