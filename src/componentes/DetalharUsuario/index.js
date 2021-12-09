
import "./style.css";

import { faTimes, faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector, useDispatch } from "react-redux";

import { Creators as chatCreators } from "../../store/ducks/chats";
import { Creators as componentesCreators } from "../../store/ducks/componentes";

function DetalharUsuario() {

    const usuarioPrincipal = useSelector(state=>state.usuario.dadosUsuario);
    const usuarioDetalhado = useSelector(state=>state.componentes.usuarioDetalhar);

    const dispatch = useDispatch();

    return (
        
        <div className="tela-escurecida">
            <div className="info-usuario">

                <div className="info-usuario-area-superior">
                    <div className="info-usuario-sair" onClick={()=>{
                        dispatch(componentesCreators.setTelaDetalharUsuarioAbrir(null));
                    }}>
                        <FontAwesomeIcon icon={faTimes}>

                        </FontAwesomeIcon>
                    </div>

                </div>

                <div className="info-usuario-dados">
                    
                    <img src={usuarioDetalhado.imagem} alt="imagem-perfil"/>
                    <p className="info-nome">{usuarioDetalhado.nome}</p>

                </div>

                <div className="info-opcoes">
                    <div onClick={()=>{
                        dispatch(chatCreators.novoChatPrivado(usuarioPrincipal, usuarioDetalhado));

                        dispatch(componentesCreators.setTelaDetalharUsuarioAbrir(null));
                        if(document.body.clientWidth <= 1000) {
                            dispatch(componentesCreators.setLateralAbrir(false));
                        }
                    }}>
                        <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
                        <p>conversar</p>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default DetalharUsuario;