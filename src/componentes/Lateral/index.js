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

            <Link to="/login">
                Login
            </Link>

            <div className="chats">
                <h2>Chats</h2>
                <div 
                    className="geral"
                    style={chatID === 0? estiloChatSelecionado : {backGround: "red"}}
                >
                    <p>GERAL</p>
                </div>
            </div>

        </div>
    )
}

export default Lateral;