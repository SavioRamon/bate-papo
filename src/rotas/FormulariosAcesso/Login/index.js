import React, { useEffect, useState } from "react";

import "../style.css";

import { Creators as usuarioCreators } from "../../../store/ducks/usuario";

import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

function Login(){
    
    const history = useHistory();

    const dadosUsuario = useSelector(state=>state.usuario.dadosUsuario);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(()=>{
        if(dadosUsuario){
            history.push("/");
        }
    }, [history, dadosUsuario]);

    return (
        <div className="rota login">
            <form className="formulario-acesso" autoComplete="off">
                <h1 className="formulario-titulo">Login</h1>
                
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
                        name="Login"
                        value="Login" onClick={()=>{
                            dispatch(usuarioCreators.loginUsuario(email, senha));
                        }}
                   /> 


                   <input 
                        className="comum"
                        type="button"
                        name="criar"
                        value="Criar conta" onClick={()=>{
                            history.push("/registrar")
                        }}
                    />
                </div>

            </form>
        </div>
    )
}

export default Login;