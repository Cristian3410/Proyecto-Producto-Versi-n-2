import { createContext,useContext,useState } from "react";


export const  StylesContext = createContext();

export const useStyles =()=>{
    const context = useContext(StylesContext)
    if(!context){
        throw new Error("el useStyles deberia estar dentro de un StylesProvider")
    }
    return context;
}

export const StylesProvider =({children})=>{
    const [traslado,SetTraslado] = useState(false)
    const [ContRes,setContRes] = useState(false)


    return(
        <StylesContext.Provider value={{
            traslado,
            SetTraslado,
            ContRes,
            setContRes
        }}>
          {children}
        </StylesContext.Provider>
    )
}