import { Dispatch, ReactNode, useEffect, useReducer } from 'react'
import { User } from '../App';
import { useLocation } from 'react-router-dom';
import apiClient from './../apiClient/ApiClient';
import { MyContext } from '../context/MyContext';

export interface ContextType {
    state: TypeState
    dispatch: Dispatch<Action>
}

export interface TypeState {
    user: User | null,
}

type SETAction = { type: "SET_USER", payload: User }
type LOGOUTAction = { type: "LOGOUT" }
type EDITAction = { type: "EDIT_USER", payload: Partial<User> }
type CHANGE_PASSWORDAction = { type: "CHANGE_PASSWORD", payload: string }


type Action = SETAction | LOGOUTAction | EDITAction | CHANGE_PASSWORDAction


export interface ContextType {
    state: TypeState
    dispatch: Dispatch<Action>
}




function reducer(state: TypeState, action: Action): TypeState {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload as User }
        case "LOGOUT":
            return { ...state, user: null }
        case 'EDIT_USER':
            return { ...state, user: { ...state.user, ...action.payload } as User };
        case "CHANGE_PASSWORD":
            return {
                ...state,
                user: state.user ? { ...state.user, password: action.payload } as User : null
            };
        default:
            return state
    }
}

function CreateContextPro({ children }: { children: ReactNode }) {

    const location = useLocation()
    const [state, dispatch] = useReducer(reducer, {
        user: null
    })


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            apiClient.get<User>("/users/" + token).then(res => {
                dispatch({ type: "SET_USER", payload: res.data })
            })
        }
    }, [location.pathname])


    return (
        <MyContext.Provider value={{ state, dispatch }} >
            {children}
        </MyContext.Provider>
    )
}

export default CreateContextPro
