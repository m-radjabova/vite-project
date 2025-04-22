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

type Action = { type: string; payload?: any }


export interface ContextType {
    state: TypeState
    dispatch: Dispatch<Action>
}



function reducer(state: TypeState, action: any) {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        case "EDIT_USER":
            return { ...state, user: { ...state.user, ...action.payload } }
    }
    return state
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
