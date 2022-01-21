import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import {torrentReducer} from "./torremtReducer";
import {authReducer} from "./authReducer";
import {ganreReducer} from "./ganreReducer";
import {createTorrentReducer} from "./createTorrentReducer";
import {paginatorReducer} from "./paginatorReducer";
import {loginReducer} from "./loginReducer";
import {passwordRecoveryReducer} from "./passwordRecoveryReducer";


const rootReducer = combineReducers({
    torrent: torrentReducer,
    auth: authReducer,
    ganre: ganreReducer,
    createTorrent: createTorrentReducer,
    paginator: paginatorReducer,
    login: loginReducer,
    passwordRecoveryReducer: passwordRecoveryReducer
})

export const reducer = (state, action) => {

    if (action.type === HYDRATE) {
        console.log(action.type)
        console.log(action.payload)
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }

        /* if (state.auth){
             nextState.auth = state.auth
         } // preserve count value on client side navigation
         if (state.createTorrent){
             nextState.createTorrent = state.createTorrent
         }
         if (state.ganre){
             nextState.ganre = state.ganre
         }*/
       // console.log(nextState)
        if (state.login) {
             nextState.login = state.login
         }
        /*if (state.paginator){
            nextState.paginator = state.paginator
        }
        if ((state.torrent.torrents) && (state.torrent.torrents !== nextState.torrent.torrents)){
            nextState.torrent = state.torrent
        }*/
      //  console.log(nextState)
        return nextState
    } else if (action.type === 'LOGIN') {
        const nextState = {...state, login:{...state.login, user:action.payload}}
        return nextState
   /* } else if (action.type === 'LOGIN') {
        const nextState = {...state, login:{...state.login, user:action.payload}}
        return nextState*/
    } else {
        console.log(action.type)
        return rootReducer(state, action)
    }
}



export type RootStateType = ReturnType<typeof rootReducer>
