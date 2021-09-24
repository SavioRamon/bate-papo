import React from "react";
import "./style.css";

import { Link } from "react-router-dom";

function Lateral(){

    return (
        <div className="lateral">

            <div className="lateral-cabecalho">
                
                <Link to="/login" className="link selecao">
                    Login
                </Link>

                <Link to="/registrar" className="link selecao">
                    Registrar
                </Link>

            </div>

            <div className="chats">

                <div className="geral selecao">
                    Geral
                </div>

            </div>

        </div>
    )
}

export default Lateral;