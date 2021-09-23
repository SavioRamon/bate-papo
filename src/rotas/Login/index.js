import React, { useState } from "react";

import "./style.css";

function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

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
                        value="Entrar" onClick={()=>{}}
                   /> 

                   ou

                   <input 
                        type="button"
                        name="Registrar"
                        value="Registrar" onClick={()=>{}}
                    />
                </div>

            </form>
        </div>
    )
}

export default Login;