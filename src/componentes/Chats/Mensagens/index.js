import React, { memo } from "react";
import "./style.css";

import { Creators as componentesCreators } from "../../../store/ducks/componentes";
import { useSelector, useDispatch } from "react-redux";

function Mensagens() {

    const mensagens = useSelector(state=>state.chats.mensagens);
    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const dispatch = useDispatch();

    function retornaHorarioMensagem(horarioISO) {
        console.log(horarioISO)
        const data = new Date(horarioISO);

        let hora = data.getHours();
        let minuto = data.getMinutes();

        if(hora < 10) {
            hora = `0${hora}`;
        }
        if(minuto < 10) {
            minuto = `0${minuto}`;
        }

        const horario = `${hora}:${minuto}`;

        return horario;
    }

    return (
        <React.Fragment>
            { Array.isArray(mensagens) &&
                mensagens.map((mensagem, key)=>{
                    let remetente = "outro-usuario";
                    if(dadosUsuario) {
                        remetente = mensagem.id === dadosUsuario.id?
                        "usuario-principal"
                        :
                        "outro-usuario";
                    }
                            
                    return (
                        <div className={`area-mensagem`} key={key}>

                            <div className={`mensagem ${remetente}`}>
                                {remetente === "outro-usuario" &&
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