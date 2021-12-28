import {useState} from "react";
import "./redefineSenha.css";

import { redefinirSenha } from "../../../firebase";

function RedefinirSenha() {

    const [email, setEmail] = useState("");
    const [enviou, setEnviou] = useState(false);

    async function enviandoEmail() {
        const info = await redefinirSenha(email);

        console.log(info);
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
                <h1 className="titulo-redefinicao">Esqueci minha senha</h1>
                <p className="instrucoes">Insira seu endereço de email para redefinir sua senha</p>

                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                {enviou?
                    <button>
                        &#10003; Email enviado!
                    </button>

                    :
                    <button onClick={()=>enviandoEmail()}>
                        enviar
                    </button>
                }
            </form>
        </div>
    )

}

export default RedefinirSenha;