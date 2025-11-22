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
import ProtectedRoute from './components/ProtectedRoute'


function App() {


  return (
  <Routes>
    <Route element={<Homepagelayout/>}>
       <Route path='/' element={<Homepage/>} />
       <Route  path='/login' element={<LoginPage/>}/>
       <Route path='/signup' element={<SignupPage/>}/>
    </Route>
    <Route element={ 
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Managerlayout/>
      </ProtectedRoute>
     
      }>
     <Route path='/manager-dashboar' element={<Managerdashboard/>}/>
    </Route>

    <Route element={
      <ProtectedRoute allowedRoles={["COURTIER"]}>
       <Courtierlayout/>
      </ProtectedRoute>
   
      }>
      <Route path='/courtier-dashboard' element={<Courtierdashboard/>}/>
    </Route>
     
     <Route element={
      <ProtectedRoute allowedRoles={["CLIENT"]}>
        <Clientlayout/>
      </ProtectedRoute>
     
      }>
      <Route path='/client-dashboard' element={<Clientdashboard/>}/>
     </Route>
   
  </Routes>
  
 
  )
}

export default App


