import React, { useState } from "react";

import "./style.css";

import { Creators as usuarioCreators } from "../../store/ducks/usuario";

import { useDispatch } from "react-redux";

function Registro(){

    const dispatch = useDispatch();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <div className="rota registro">
            <form className="formulario-registro">
                <h1>Registrar</h1>

                <div className="divisao">
                    <input 
                        type="text"
                        name="nome"
                        value={nome} onChange={e=>setNome(e.target.value)}
                        placeholder="Nome"
                    />
                </div>
                
                <div className="divisao">
                    <input 
                        type="email"
                        name="email"
                        value={email} onChange={e=>setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>

                <div className="divisao">
                    <input 
                    type="password" 
                    name="senha" 
                    value={senha} onChange={e=>setSenha(e.target.value)}
                    placeholder="Senha"
                />
                </div>
                
                <div className="divisao-botoes">
                    <input 
                        type="button"
                        name="Registrar"
                        value="Registrar" onClick={()=>{
                            dispatch(usuarioCreators.registrarUsuario(nome, email, senha));
                        }}
                   /> 

                   Já possui uma conta?

                   <input 
                        type="button"
                        name="Entrar"
                        value="Entrar" onClick={()=>{}}
                    />
                </div>

            </form>
        </div>
    )
}

export default Registro;