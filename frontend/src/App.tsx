import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import Homepagelayout from './layout/Homepagelayout'
import Managerlayout from './layout/Managerlayout'
import Managerdashboard from './Pages/Managerdashboard'
import Courtierlayout from './layout/Courtierlayout'
import Courtierdashboard from './Pages/Courtierdashboard'
import Clientlayout from './layout/Clientlayout'
import Clientdashboard from './Pages/Clientdashboard'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'


function App() {


  return (
  <Routes>
    <Route element={<Homepagelayout/>}>
       <Route path='/' element={<Homepage/>} />
       <Route  path='/login' element={<LoginPage/>}/>
       <Route path='/signup' element={<SignupPage/>}/>
    </Route>
    <Route element={<Managerlayout/>}>
     <Route path='/manager-dashboar' element={<Managerdashboard/>}/>
    </Route>

    <Route element={<Courtierlayout/>}>
      <Route path='/courtier-dashboard' element={<Courtierdashboard/>}/>
    </Route>
     
     <Route element={<Clientlayout/>}>
      <Route path='/client-dashboard' element={<Clientdashboard/>}/>
     </Route>
   
  </Routes>
  
 
  )
}

export default App


