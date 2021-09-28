import React from "react";
import "./style.css";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

function Lateral(){

    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);

    return (
        <div className="lateral">

            <div className="lateral-cabecalho">
                {dadosUsuario?

                    <div className="cabecalho-conteudo">
                        <div className="perfil-usuario">

                        </div>
                        <div className="icone-opcoes">
                            <FontAwesomeIcon icon={ faEllipsisV } />
                        </div>
                    </div>

                    :

                    <React.Fragment>
                        <Link to="/login" className="link selecao">
                            Login
                        </Link>

                        <Link to="/registrar" className="link selecao">
                            Registrar
                        </Link>
                    </React.Fragment>

                }
                

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