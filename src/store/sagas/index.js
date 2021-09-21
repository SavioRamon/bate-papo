import { takeLatest, all } from "redux-saga/effects";

import { Types as chatTypes } from "../ducks/chats";

import { getMensagens } from "./chats";

export default function* rootSagas() {
    return yield all([
        takeLatest(chatTypes.GET_MENSAGENS, getMensagens),
    ])
}