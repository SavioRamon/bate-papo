import React, { useState } from "react";
import "./style.css";

import chatGeralImg from "../../imagens/chatGeral.jpg";
import gifLoader from "../../imagens/Loader.gif";

import PerfilConfig from "../PerfilConfig";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import { Creators as componentesCreators } from "../../store/ducks/componentes";
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
    const usuario = useSelector(state=>state.usuario);

    const dispatch = useDispatch();

    
    const [opcoesAbrir, setOpcoesAbrir] = useState(false);

    const chatSelecionadoEstilo = {
        backgroundColor: "rgb(53, 53, 53)"
    }

    return (
        <React.Fragment>
                    
            <div className="efeito-escuro" onClick={()=>{
                dispatch(componentesCreators.setLateralAbrir(false));
            }}>

            </div>

            <div className="lateral">
                {!usuario.load &&
                    <div className="tela-carregamento">
                        <img 
                            src={ gifLoader? gifLoader : "" }
                            className="gif-carregando" 
                            alt="gif de carregamento"
                        />
                    </div>
                    
                }
                {usuario.load &&
                    <React.Fragment>
                        <div className="lateral-cabecalho">
                            {usuario.dadosUsuario &&
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
                                    
                            {!usuario.dadosUsuario && 
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


                        <div className="chats">
                            {usuario.chats? 
                                usuario.chats.map((chat, key)=>{
                                    return (
                                        <div 
                                            className="chats-selecao" key={key} 
                                            style={chatSelecionado === chat.idChat? chatSelecionadoEstilo : {} }
                                        >
                                            <img 
                                                src={chat.imagem? chat.imagem : chatGeralImg} 
                                                alt="imagem de perfil do usuário" 
                                                onClick={()=>{
                                                    if(chat.idChat !== "chatGeral"){
                                                        dispatch(componentesCreators.setTelaDetalharUsuarioAbrir(chat));
                                                    }
                                                }}
                                                />
                                            <p onClick={()=>{
                                                
                                                dispatch(chatCreators.chatSelecionado(chat.idChat));
                                                if(document.body.clientWidth <= 1000) {
                                                    dispatch(componentesCreators.setLateralAbrir(false));
                                                }
                                            }}>{chat.nome}</p>
                                        </div>
                                    )
                                })
                                        
                                :

                                <div 
                                    className="chats-selecao" 
                                    style={chatSelecionadoEstilo}
                                    onClick={()=>{
                                        if(document.body.clientWidth <= 1000) {
                                            dispatch(componentesCreators.setLateralAbrir(false));
                                        }
                                    }}
                                >
                                    <img src={chatGeralImg} alt="imagem do chat geral" />
                                    <p>Geral</p>
                                </div>
                            }
                        </div>
                    </React.Fragment>
                }
            </div>

        </React.Fragment>
            
        
    )
}

export default Lateral;