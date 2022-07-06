import React, { useLayoutEffect, useState } from "react";

import "../style.css";

import { fazerLogin } from "../../../firebase";

import { useNavigate, Link } from "react-router-dom";

import { Creators as usuarioCreators } from "../../../store/ducks/usuario";
import { useDispatch } from "react-redux";

function Login(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");



    async function verificaDados() {
        const usuarioID = await fazerLogin(email, senha);

        if(usuarioID) {

            localStorage.setItem("login", usuarioID);
            dispatch(usuarioCreators.setUsuario({load: false}));
            navigate("/");
        } 
    }

    
    useLayoutEffect(()=>{
        const logado = localStorage.getItem("login");
        if(logado) {
            navigate("/");
        }
    }, [navigate]);

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
                                
                                navigate("/registrar")
                            }}
                        />

                    </div>
                    <div className="mais-opcoes">
                        <Link to="/redefinir_senha" className="link-to-redefinir-senha">
                            Esqueci minha senha
                        </Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
        
    )
}

export default Login;