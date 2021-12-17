import React, { useState, useEffect } from "react";
import "./style.css";

import { faPaperclip, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Creators as chatCreators } from "../../../store/ducks/chats";
import { useSelector, useDispatch } from "react-redux";

function Anexos() {

    const [anexoAberto, setAnexoAberto] = useState(false);

    const chatID = useSelector(state=>state.chats.chatID);
    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const dispatch = useDispatch();
    
    const [mensagemEnviar, setMensagemEnviar] = useState({
        imagem: "",
        nome: "",
        id: "",
        texto: "",
        midia: ""
    });

    const estiloAnexoAberto = {
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }

    useEffect(()=>{
        if(dadosUsuario) {
            setMensagemEnviar({
                ...mensagemEnviar,
                nome: dadosUsuario.nome,
                id: dadosUsuario.id,
                imagem: dadosUsuario.imagem
            })
        }
    }, [dadosUsuario])

    return (
        <React.Fragment>
            <div style={anexoAberto? estiloAnexoAberto : {}} className="icone-anexo" onClick={()=>{
                    setAnexoAberto(!anexoAberto);
                }}>
                <FontAwesomeIcon icon={ faPaperclip } />
            </div>

            {anexoAberto &&
                <div className="tipo-anexo">
                    <label htmlFor="midia" className="imagem-e-video anexo">

                        <FontAwesomeIcon icon={ faImage } />

                    </label>
                    <input id="midia" type="file" accept="image/*,video/*" onChange={(e)=>{
                        dispatch(chatCreators.enviaMensagemMidia(chatID, {
                            ...mensagemEnviar,
                            midia: e.target.files[0]
                        }))
                        
                    }}/>
                </div>
            }
            
        </React.Fragment>
            
    )
}

export default Anexos;