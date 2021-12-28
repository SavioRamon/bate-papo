
import Inicio from "./Inicio";
import Login from "./FormulariosAcesso/Login";
import Registro from "./FormulariosAcesso/Registro";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import RedefinirSenha from "./FormulariosAcesso/RedefinirSenha";

function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Inicio } />
                <Route path="/login" component={ Login } />
                <Route path="/registrar" component={ Registro } />
                <Route path="/redefinir_senha" component={ RedefinirSenha } />
            </Switch>
        </BrowserRouter>
    )
}

export default Rotas;