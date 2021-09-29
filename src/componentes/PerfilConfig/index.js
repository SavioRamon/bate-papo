import React, { useState } from "react";
import "./style.css";

function PerfilConfig() {

    const [abrirConfig, setAbrirConfig] = useState(false);

    return (
        <React.Fragment>
            <div className="perfil-botao" onClick={()=>setAbrirConfig(!abrirConfig)}>

            </div>    
            {abrirConfig &&
                <div className="tela-configuracoes">
                    <label for='alterar-imagem-perfil' className="imagem-perfil"></label>
                    <input type='file' id='alterar-imagem-perfil' />
                </div>
            }
        </React.Fragment>
    )
}

export default PerfilConfig;