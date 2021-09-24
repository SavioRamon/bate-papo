import { combineReducers } from "redux";

import chats from "./chats";
import usuario from "./usuario";

const rootReducer = combineReducers({
    chats,
    usuario
})

export default rootReducer;