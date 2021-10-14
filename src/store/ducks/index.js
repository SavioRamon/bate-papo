import { combineReducers } from "redux";

import componentes from "./componentes";
import chats from "./chats";
import usuario from "./usuario";

const rootReducer = combineReducers({
    componentes,
    chats,
    usuario
})

export default rootReducer;