import React, { useState } from "react";
import "./style.css";

import PerfilConfig from "../PerfilConfig";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import { Creators as usuarioCreators } from "../../store/ducks/usuario";
import { useDispatch, useSelector } from "react-redux";

function  OpcoesLateral({ setOpcoesAbrir }) {

    const dispatch = useDispatch();

    return (
        <div className="lista-opcoes" onClick={()=>setOpcoesAbrir(false)}>
            <div className="usuario-sair" onClick={()=>{
                dispatch(usuarioCreators.usuarioSair());
            }}>
                Sair
            </div>
        </div>
    )
}

function Lateral(){

    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    
    const [opcoesAbrir, setOpcoesAbrir] = useState(false);
    return (
        <div className="lateral">

            <div className="lateral-cabecalho">
                {dadosUsuario &&
                    <div className="cabecalho-conteudo">       
                        <PerfilConfig />

                        <div className="icone-opcoes" onClick={()=>setOpcoesAbrir(!opcoesAbrir)}>
                            <FontAwesomeIcon icon={ faEllipsisV } />
                        </div>

                        {opcoesAbrir &&
                            <OpcoesLateral setOpcoesAbrir={setOpcoesAbrir} />
                        }
                    </div>
                }
                
                {!dadosUsuario && 
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