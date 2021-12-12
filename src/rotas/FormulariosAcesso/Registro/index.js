import React, { useEffect, useState } from "react";

import "../style.css";

import { Creators as usuarioCreators } from "../../../store/ducks/usuario";

import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

function Registro(){

    const history = useHistory();

    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const dispatch = useDispatch();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(()=>{
        if(dadosUsuario) {
            history.push("/");
        }
    }, [history, dadosUsuario]);

    return (
        <div className="rota registro">
            <form className="formulario-acesso" autoComplete="off">
                <h1 className="formulario-titulo">
                    Criar conta
                </h1>

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
                        className="prioridade"
                        type="button"
                        name="criar"
                        value="Criar conta" onClick={()=>{
                            dispatch(usuarioCreators.registrarUsuario(nome, email, senha));
                        }}
                   /> 

                   <input 
                        className="comum"
                        type="button"
                        name="Login"
                        value="Login" onClick={()=>{
                            history.push("/login");
                        }}
                    />
                </div>

            </form>
        </div>
    )
}

export default Registro;