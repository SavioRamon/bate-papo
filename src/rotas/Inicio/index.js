import React from "react";

import "./style.css";

import Lateral from "../../componentes/Lateral";
import Chats from "../../componentes/Chats";

function Inicio() {
    return (
        <div className="inicio">
            <Lateral />
            <Chats />
        </div>
    )
}

export default Inicio;