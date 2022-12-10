import {Link} from "react-router-dom";

function Registered() {
    return (
        <div>
            <h3>REJESTRACJA POWIODŁA SIĘ</h3>
            Na podany link wysłano link aktywacyjny<br/>
            <Link to="/login">
                Powrót do logowania
            </Link>
        </div>
    );
}

export default Registered;