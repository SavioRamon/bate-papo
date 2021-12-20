import React, { useState, memo } from "react";
import "./style.css";

import { Creators as componentesCreators } from "../../../store/ducks/componentes";
import { useSelector, useDispatch } from "react-redux";

function Mensagens() {
    const mensagens = useSelector(state=>state.chats.mensagens);
    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const dispatch = useDispatch();


    // variáveis para análise de sequência de mensagem.
    let mensagensSeguidas = 0;
    let idAtual = "";
    let sequenciaAtivada = false;
    


    function retornaHorarioMensagem(horarioISO) {
        const data = new Date(horarioISO);
        const dia = String(data.getDate()).padStart(2, "0");
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const ano = String(data.getFullYear()).slice(2);

        let hora = String(data.getHours()).padStart(2, "0");
        let minuto = String(data.getMinutes()).padStart(2, "0");

        const dataCompleta = `${dia}/${mes}/${ano} [${hora}:${minuto}]`;

        return dataCompleta;
    }



    function analisaMensagensSeguidas(mensagemID) {
        /* 
            Essa função é chamada pelo mapeamento da lista de mensagens,
            Então o parâmetro mensagemID se refere ao id de cada mensagem.
        */

        function iniciaCiclo(){
            idAtual = mensagemID;
            mensagensSeguidas = 1;
            sequenciaAtivada = false;
        }
        
        if(!idAtual) {
            // adiciona um primeiro id para que haja a análise e encerra a função
            iniciaCiclo();
            return;
        }

        mensagensSeguidas++;

        if(idAtual !== mensagemID) {
            // aqui o idAtual muda, pois um usuário diferente enviou uma mensagem.
            // Consequentemente o ciclo reinicia.
            iniciaCiclo();
        }

        if(mensagensSeguidas >= 2) {
            sequenciaAtivada = true;
        }
    }


    return (
        <React.Fragment>
            { Array.isArray(mensagens) &&
                mensagens.map((mensagem, key)=>{
                    let remetente = "outro-usuario";

                    if(dadosUsuario) {
                        if(mensagem.id === dadosUsuario.id) {
                            remetente = "usuario-principal";

                        } else {
                            remetente = "outro-usuario"

                        }
                    }

                    analisaMensagensSeguidas(mensagem.id);

                            
                    return (
                        <div 
                            
                            className={`area-mensagem ${sequenciaAtivada? "sequencia": ""}`} 
                            key={key}
                        >

                            <div className={`mensagem ${remetente}`}>

                                {remetente === "outro-usuario" && mensagensSeguidas < 2 &&
                                
                                    <div className="mensagem-conteudo-superior">
                                        <img 
                                            className="imagem-perfil-chat"
                                            src={mensagem.imagem} 
                                            onClick={()=>{

                                                dadosUsuario &&
                                                dispatch(componentesCreators.setTelaDetalharUsuarioAbrir(
                                                    mensagem
                                                ))
                                            }}
                                        />
                                           
                                        <p className="nome-remetente">{mensagem.nome}</p>
                                    </div>  
                                }
                                        
                                        
                                <div className="horario">
                                    {retornaHorarioMensagem(mensagem.horarioEnvio)}
                                </div>

                                <div className="conteudo">

                                            
                                    {mensagem.texto &&
                                        <p className="mensagem-texto">{mensagem.texto}</p>
                                    }
                                            
                                            
                                    {mensagem.midia && mensagem.tipoMidia === "image" &&
                                        <img src={mensagem.midia} className="mensagem-midia" />
                                    }

                                    {mensagem.midia && mensagem.tipoMidia === "video" &&
                                        <video className="mensagem-midia" controls>
                                            <source src={mensagem.midia} />
                                        </video>
                                    }


                                </div>
                            </div>
                        </div>  
                    )
                })
            }
        </React.Fragment>
    )
}

export default memo(Mensagens);