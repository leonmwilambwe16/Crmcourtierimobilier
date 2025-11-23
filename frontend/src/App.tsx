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
import ManageClients from './Pages/admin/ManageClients'
import ManageCourtiers from './Pages/admin/ManageCourtier'
import ManageProperties from './Pages/admin/ManageProperties'
import CourtierProperties from './Pages/courtier/CourtierProperties'
import CourtierClients from './Pages/courtier/CourtierClients'
import CourtierMessages from './Pages/courtier/CourtierMessage'
import ClientProperties from './Pages/client/ClientProperties'
import ClientFiles from './Pages/client/ClientFiles'
import ClientMessages from './Pages/client/ClientMessage'


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
     <Route path='/manager-dashboard' element={<Managerdashboard/>}/>
     <Route path='/manage-clients' element={<ManageClients/>}/>
      <Route path='/manage-courtiers' element={<ManageCourtiers/>}/>
      <Route path='/manage-properties' element={<ManageProperties/>}/>
    </Route>

    <Route element={
      <ProtectedRoute allowedRoles={["COURTIER"]}>
       <Courtierlayout/>
      </ProtectedRoute>
   
      }>
      <Route path='/courtier-dashboard' element={<Courtierdashboard/>}/>
      <Route path='/courtier-properties' element={<CourtierProperties/>}/>
      <Route path='/courtier-clients' element={<CourtierClients/>}/>
      <Route path='/courtier-messages' element={<CourtierMessages/>}/>
    </Route>
     
     <Route element={
      <ProtectedRoute allowedRoles={["CLIENT"]}>
        <Clientlayout/>
      </ProtectedRoute>
     
      }>
      <Route path='/client-dashboard' element={<Clientdashboard/>}/>
       <Route path='/client-properties' element={<ClientProperties/>}/>
       <Route path='/client-files' element={<ClientFiles/>}/>
       <Route path='/client-messages' element={<ClientMessages/>}/>
     </Route>
   
  </Routes>
  
 
  )
}

export default App


