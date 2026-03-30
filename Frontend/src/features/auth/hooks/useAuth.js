import{useContext,useEffect}from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,register,logout,getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext)
  const {user,setUser,loading,setLoading} = context

const handleLogin = async ({email, password}) => {
  try {
    setLoading(true)
   const data = await login({email, password})
    setUser(data.user)
    return true
  } catch(err) {
    console.error(err)
    return false
  }finally{
    setLoading(false)
  }
}
  
const handleRegister = async ({username, email, password}) => {
  try {
    setLoading(true)
    const data = await register({username, email, password})
    setUser(data.user)
    return true
  } catch(err) {
    console.error(err)
    return false
  } finally {
    setLoading(false)
  }
} 
  const handleLogout = async () => {
    setLoading(true)
    await logout()
    setUser(null)
    setLoading(false)
  }
   
  useEffect(()=>{
    const getAndSetuser = async()=>{
      try{ 
      
         const data = await getMe()
         setUser(data.user)
      }
      catch(err){err}
      finally{
        setLoading(false)
      }

      }

   getAndSetuser()
  }, [setLoading,setUser])


  return { user, loading, handleLogin, handleRegister, handleLogout,  }
}