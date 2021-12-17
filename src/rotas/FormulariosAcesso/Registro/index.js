import React, { useLayoutEffect, useState } from "react";

import "../style.css";

import { novoUsuario } from "../../../firebase";

import { useHistory } from "react-router-dom";

import { Creators as usuarioCreators } from "../../../store/ducks/usuario";
import { useDispatch } from "react-redux";

function Registro(){

    const history = useHistory();
    const dispatch = useDispatch();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");



    async function verificaDados() {
        const progresso = await novoUsuario(nome, email, senha);

        if(progresso) {
            localStorage.setItem("login", true);
            history.push("/");
        } 
    }
    

    useLayoutEffect(()=>{
        const logado = JSON.parse(localStorage.getItem("login"));
        if(logado) {
            history.push("/");
        }
    }, [history]);

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
                            verificaDados();
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