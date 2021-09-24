import React, { useState } from "react";

import "./style.css";

function Registro(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <div className="rota registro">
            <form className="formulario-registro">
                <h1>Registrar</h1>
                
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
                        value="Registrar" onClick={()=>{}}
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