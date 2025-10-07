import styles from "./App.module.css"
import NavBar from "./components/Navbar/Navbar"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import MainContent from "./components/MainContent"
import {StylesProvider} from "./contexts/StylesContext"
import { useStyles } from "./contexts/StylesContext"
import ProtectedRouteUser from "./components/protected/ProtectedRouteUser"
import {AuthProvider} from "./contexts/AuthContext"
import MenuUsersPage from "./components/user/MenuUsersPage"



function App() {

  
  return(
    <AuthProvider>
    <StylesProvider>
    <BrowserRouter>
    <div className={styles.App}>
    <NavBar/>
    <Routes>
      <Route path="/" element={<MainContent/>}/>

      <Route element={<ProtectedRouteUser/>}>
        <Route path="/usersMenu" element={<MenuUsersPage/>}/>
      </Route>
      
      </Routes>
    </div>
    </BrowserRouter>
    </StylesProvider>
    </AuthProvider>
  )
 
}

export default App
