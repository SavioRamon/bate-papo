import React from "react";
import "./style.css";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

function Lateral(){

    const chatID = useSelector(state=>state.chats.chatID);

    const estiloChatSelecionado = {
        backgroundColor: "rgb(136, 207, 145)"
    }

    return (
        <div className="lateral">
            
            <div className="lateral-cabecalho">
                
                <Link to="/login" className="link-login selecao">
                    Login
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