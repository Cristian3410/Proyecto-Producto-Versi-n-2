const apiURL = "http://localhost:4000/api"


export const registerPost = async(user) =>{

    try{
        const response = await fetch(`${apiURL}/register`,{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify(user),
         credentials:"include"
        });

        const data = await response.json();

        return{status:response.status,data:data}

    }catch(error){
        console.error("Error en la solicitud",error)
    }
}



export const loginPost = async(user)=>{
    try{
        const response = await fetch(`${apiURL}/Login`,{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(user),
            credentials:"include"
        });

        const data = await response.json()
        
        return{status:response.status,data:data}


    }catch(error){
        console.error("error en la consulta",error)
    }
}


export const verifyTokenRequest = async (token) =>{
    try{

        if(!token){
            return {status:401,data:null}
        }

        const response = await fetch(`${apiURL}//verify`,{
            method:"GET",
            headers:{
                "content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            credentials:"include"
        })

        const data = await response.json()

        return{status:response.status,data:data}

    }catch(error){
     console.log(error)
     return {status:401,data:null}
    }
}



