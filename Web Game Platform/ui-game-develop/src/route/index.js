import Register from '../pages/register/register'
import Login from "../pages/login/login"
import Homepage from "../pages/homepage/homepage"
import Game from "../pages/game/villGame"
import { Navigate } from 'react-router-dom'
import Layout from "../components/layout/Layout"
import LayoutOther from "../components/layout/LayoutOther"
import Score from "../pages/scores/score"
const routes = (isAUTH) => {
return [
     {path: 'apps',
    element: isAUTH? <Layout/> : <Navigate to="/auth/login"/>,
    children: [
        {path: "game", element: <Game/>},
        {path: 'score', element: <Score/>}
    ]},
    
    {path: '/auth', 
    elment: !isAUTH? <LayoutOther/> : <Navigate to="/"/>,
    children: [
        {path: "login", element: <Login/>},
        {path: "register", element: <Register/>}
    ]},
   { path: '/', element: <Homepage/> }
]
}
export default routes
