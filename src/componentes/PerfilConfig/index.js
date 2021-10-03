import React, { useState } from "react";
import "./style.css";

import { Creators as usuarioCreators } from "../../store/ducks/usuario";
import { useSelector, useDispatch } from "react-redux";

function PerfilConfig() {

    const usuarioID = useSelector(state=>state.usuario.dadosUsuario.id);
    const dispatch = useDispatch();

    const [abrirConfig, setAbrirConfig] = useState(false);
    return (
        <React.Fragment>
            <div className="perfil-botao" onClick={()=>setAbrirConfig(!abrirConfig)}>

            </div>   
            {abrirConfig &&
                <div className="tela-configuracoes">
                    <label htmlFor='alterar-imagem-perfil' className="imagem-perfil"></label>
                    <input type='file' id='alterar-imagem-perfil' onChange={e=>{
                        dispatch(usuarioCreators.editarImagem(usuarioID, e.target.files[0]));
                    }}/>
                </div>
            }
        </React.Fragment>
    )
}

export default PerfilConfig;