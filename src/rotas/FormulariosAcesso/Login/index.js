import React, { useLayoutEffect, useState } from "react";

import "../style.css";

import { fazerLogin } from "../../../firebase";

import { useHistory } from "react-router-dom";

import { Creators as usuarioCreators } from "../../../store/ducks/usuario";
import { useDispatch } from "react-redux";

function Login(){
    
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");



    async function verificaDados() {
        const usuarioID = await fazerLogin(email, senha);

        if(usuarioID) {

            localStorage.setItem("login", usuarioID);
            dispatch(usuarioCreators.setUsuario({load: false}));
            history.push("/");
        } 
    }

    
    useLayoutEffect(()=>{
        const logado = localStorage.getItem("login");
        if(logado) {
            history.push("/");
        }
    }, [history])

    return (
        <React.Fragment>
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
                                verificaDados();
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
        </React.Fragment>
        
    )
}

export default Login;