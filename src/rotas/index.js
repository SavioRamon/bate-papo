
import Inicio from "./Inicio";
import Login from "./FormulariosAcesso/Login";
import Registro from "./FormulariosAcesso/Registro";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RedefinirSenha from "./FormulariosAcesso/RedefinirSenha";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Inicio />} />
                <Route path="/login" element={ <Login /> } />
                <Route path="/registrar" element={ <Registro /> } />
                <Route path="/redefinir_senha" element={ <RedefinirSenha /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;