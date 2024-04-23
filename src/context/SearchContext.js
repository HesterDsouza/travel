import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    title:undefined,
    destination:"",
    dates:[],
    options:{
        adult:undefined,
        children:undefined,
        infant:undefined
    },
}

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) =>{
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;

        case "RESET_sEARCH":
            return INITIAL_STATE;
        
        default:
            return state;
    }
}

export const  SearchContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return(
        <SearchContext.Provider 
        value={{
            title:state.title,
            destination:state.destination, 
            dates:state.dates, 
            options:state.options, 
            dispatch
        }}>
            {children}
        </SearchContext.Provider>
    )
}