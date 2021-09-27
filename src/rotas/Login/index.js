import React, { useEffect, useState } from "react";

import "./style.css";

import { Creators as usuarioCreators } from "../../store/ducks/usuario";

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
    }, [dadosUsuario]);

    return (
        <div className="rota login">
            <form className="formulario-login">
                <h1>Login</h1>
                
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
                        name="Entrar"
                        value="Entrar" onClick={()=>{
                            dispatch(usuarioCreators.loginUsuario(email, senha));
                        }}
                   /> 

                   ou

                   <input 
                        type="button"
                        name="Registrar"
                        value="Registrar" onClick={()=>{
                            history.push("/registrar")
                        }}
                    />
                </div>

            </form>
        </div>
    )
}

export default Login;