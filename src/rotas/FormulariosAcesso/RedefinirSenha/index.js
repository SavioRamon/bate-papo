import React, {useState} from "react";
import "./redefineSenha.css";

import { redefinirSenha } from "../../../firebase";

function RedefinirSenha() {

    const [email, setEmail] = useState("");
    const [enviou, setEnviou] = useState(false);

    async function enviandoEmail() {
        const info = await redefinirSenha(email);

        if(info.sucesso) {
            setEnviou(true);
        } else {
            alert(info.erro);
        }
    }

    return (
        <div className="redefinir-senha">
            <form onSubmit={(e)=>{
                e.preventDefault();
            }}>
                <h1 className="titulo-redefinicao">
                    {enviou?
                        "Email enviado"
                        :
                        "Esqueci minha senha"
                    }
                    
                </h1>
                
                <p className="instrucoes">
                    {enviou?
                        "Agora acesse seu email e siga as instruções que enviamos para você!"
                        :
                        "Insira seu endereço de email cadastrado para redefinir sua senha"
                    }
                </p>

                {enviou?
                    <button>
                        &#10003; Email enviado!
                    </button>

                    :
                    
                    <React.Fragment>
                        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                        <button onClick={()=>enviandoEmail()}>
                            enviar
                        </button>
                    </React.Fragment>
                    
                }
            </form>
        </div>
    )

}

export default RedefinirSenha;