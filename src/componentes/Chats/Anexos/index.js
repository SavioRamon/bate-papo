import React, { useState } from "react";
import "./style.css";

import { faPaperclip, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Anexos() {

    const [anexoAberto, setAnexoAberto] = useState(false);

    const estiloAnexoAberto = {
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }

    return (
        <div className="area-anexo">
            <div style={anexoAberto? estiloAnexoAberto : {}} className="icone-anexo" onClick={()=>{
                    setAnexoAberto(!anexoAberto);
                }}>
                <FontAwesomeIcon icon={ faPaperclip } />
            </div>

            {anexoAberto &&
                <div className="tipo-anexo">
                    <div className="imagem-e-video anexo">

                        <FontAwesomeIcon icon={ faImage } />

                    </div>
                </div>
            }
        </div>
            
    )
}

export default Anexos;