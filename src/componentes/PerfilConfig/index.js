import React, { useState } from "react";
import "./style.css";

import { Creators as usuarioCreators } from "../../store/ducks/usuario";
import { useSelector, useDispatch } from "react-redux";

function PerfilConfig() {

    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const dispatch = useDispatch();

    const [abrirConfig, setAbrirConfig] = useState(false);
    return (
        <React.Fragment>
            <img 
                className="perfil-botao" 
                onClick={()=>setAbrirConfig(!abrirConfig)}
                src={dadosUsuario.imagem}
            />

            {abrirConfig &&
                <div className="tela-configuracoes">
                    <label 
                        htmlFor='alterar-imagem-perfil' 
                        className="imagem-perfil"
                        style={{backgroundImage: `url(${dadosUsuario.imagem})`}}></label>
                    <input type='file' id='alterar-imagem-perfil' onChange={e=>{
                        dispatch(usuarioCreators.editarImagem(dadosUsuario.id, e.target.files[0]));
                    }}/>
                </div>
            }
        </React.Fragment>
    )
}

export default PerfilConfig;