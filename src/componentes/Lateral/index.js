import React, { useEffect, useState } from "react";
import "./style.css";

import PerfilConfig from "../PerfilConfig";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import { Creators as chatCreators } from "../../store/ducks/chats";
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

    const chatSelecionado = useSelector(state=>state.chats.chatID);
    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const dispatch = useDispatch();
    
    const [opcoesAbrir, setOpcoesAbrir] = useState(false);

    function chatsUsuario() {

        const chatSelecionadoEstilo = {
            backgroundColor: "rgba(0, 0, 0, 0.2)"
        }

        return (
            <div className="chats">
                {dadosUsuario? 
                    dadosUsuario.chats.map((chat, key)=>{
                        return (
                            <div 
                                className="chats-selecao" key={key} 
                                onClick={()=>{
                                    dispatch(chatCreators.chatSelecionado(chat.id));
                                }}
                                style={chatSelecionado === chat.id? chatSelecionadoEstilo : {} }
                            >
                                {chat.chatNome}
                            </div>
                        )
                    })
                    
                    :

                    <div 
                        className="chats-selecao" 
                        style={chatSelecionadoEstilo}
                    >
                        Geral
                    </div>
                }
            </div>
        )
    }

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
                        <Link to="/login" className="link-selecao">
                            Login
                        </Link>

                        <Link to="/registrar" className="link-selecao">
                            Registrar
                        </Link>
                    </React.Fragment>
                }
                
            </div>

            {
                chatsUsuario()
            }

        </div>
    )
}

export default Lateral;