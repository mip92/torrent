import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {AnyAction, applyMiddleware, createStore} from "redux";
import {reducer, RootStateType} from "./reducers";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

export function makeStore(initialState = {
                              torrent: {
                                  torrents: [],
                                  error: "",
                                  fullLength: 0
                              },
                              auth: {
                                  email: null,
                                  error: "",
                                  avatar: null
                              },
                              ganre: {
                                  ganres: null,
                                  error: ""
                              },
                              createTorrent: {
                                  name: "",
                                  description: "",
                                  torrentDoc: null,
                                  picture: [
                                      null
                                  ],
                                  mainPicture: null,
                                  error: null,
                                  torrent: null,
                                  addedGanres: null
                              },
                              paginator: {
                                  offset: 0,
                                  limit: 10,
                                  ganre: 10000
                              },
                              login: {
                                  user: null,
                                  error: null
                              }
                          }
) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    )
}

/*const makeStore: MakeStore<RootStateType>
    = (context: Context) => createStore(reducer,applyMiddleware(thunk));*/

export const wrapper = createWrapper<RootStateType>(()=>makeStore(), {debug: true});

export type NextThunkDispatch = ThunkDispatch<RootStateType, void, AnyAction>