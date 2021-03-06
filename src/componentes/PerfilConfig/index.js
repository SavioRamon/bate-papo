import React, { useState } from "react";
import "./style.css";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Creators as usuarioCreators } from "../../store/ducks/usuario";
import { useSelector, useDispatch } from "react-redux";


function PerfilConfig() {

    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const dispatch = useDispatch();

    const dadosUsuarioEdicao = {
        ...dadosUsuario
    }
    const [alteraNome, setAlteraNome] = useState(dadosUsuario.nome);

    const [abrirConfig, setAbrirConfig] = useState(false);

    return (
        <React.Fragment>
            <img 
                className="perfil-botao" 
                onClick={()=>setAbrirConfig(true)}
                src={dadosUsuario.imagem}
            />

            {abrirConfig &&
                <React.Fragment>
                    <div className="icone-voltar" onClick={()=>setAbrirConfig(false)}>
                        <FontAwesomeIcon icon={ faArrowLeft } />
                    </div>

                    <div className="tela-configuracoes">
                        <div className="area-superior">
                            <label 
                                htmlFor='alterar-imagem-perfil' 
                                className="imagem-perfil"
                                style={{backgroundImage: `url(${dadosUsuario.imagem})`}}></label>
                            <input type='file' accept="image/*" id='alterar-imagem-perfil' onChange={e=>{
                                dispatch(usuarioCreators.editarImagem(dadosUsuario.id, e.target.files[0]));
                            }}/>
                        </div>
                        

                        <div className="alterar-dados-conta">
                            <div className="area-alterar-nome">
                                <label htmlFor="alterar-nome">Nome: </label>
                                <input 
                                    type="text"
                                    id="alterar-nome"
                                    value={alteraNome} onChange={(e)=>setAlteraNome(e.target.value)} 
                                    className="alterar-nome"
                                    maxLength="10"
                                />
                            </div>
                            
                            <input 
                                type="button" 
                                value="Salvar" 
                                onClick={()=>{

                                    dispatch(usuarioCreators.editarUsuario({
                                        ...dadosUsuarioEdicao,
                                        nome: alteraNome
                                    }));

                                    setAbrirConfig(false);
                                }}
                                className="salvar-alteracoes"
                            />
                        </div>
                    </div>
                </React.Fragment>
                
                

            }
        </React.Fragment>
    )
}

export default PerfilConfig;