import {combineReducers, createStore} from "redux";
import {calculator} from "./calculator-reducer";

export type RootStoreType = ReturnType<typeof RootReducer>

const RootReducer = combineReducers({
    calculator : calculator
})

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export const store = createStore(RootReducer)

//@ts-ignore
window.__store__ = store