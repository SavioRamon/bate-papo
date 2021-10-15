import React, { useEffect } from "react";

import "./style.css";

import Lateral from "../../componentes/Lateral";
import Chats from "../../componentes/Chats";

import { Creators as componentesCreators } from "../../store/ducks/componentes";
import { useDispatch, useSelector } from "react-redux";

function Inicio() {

    const lateralAberta = useSelector(state=>state.componentes.lateralAbrir);
    const dispatch = useDispatch();
    
    window.addEventListener("resize", ()=>{
        if(document.body.clientWidth >= 1000 && !lateralAberta){
            dispatch(componentesCreators.setLateralAbrir(true));
        };
    })
    

    return (
        <div className="inicio">
            {lateralAberta &&
                <Lateral />
            }

            <Chats />
        </div>
    )
}

export default Inicio;