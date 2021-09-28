
import Inicio from "./Inicio";
import Login from "./Login";
import Registro from "./Registro";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Inicio } />
                <Route path="/login" component={ Login } />
                <Route path="/registrar" component={ Registro } />
            </Switch>
        </BrowserRouter>
    )
}

export default Rotas;