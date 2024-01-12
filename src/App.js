import { useState } from 'react';
import AuthPage from './components/AuthPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import NewOrderPage from './components/NewOrderPage';
import NavBar from './components/NavBar';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import {getUser} from './utilities/users-service'

function App() {

  const [user,setUser] = useState(getUser());

  return (
    <main className='App'>
    { user? (
      <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
          <Route path = '/orders/new' element={<NewOrderPage user={user} setUser={user}/>}/>
          <Route path = '/orders' element={<OrderHistoryPage user={user} setUser={user}/>}/>
          {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
          {/* <Route path="/*" element={<Navigate to="/orders/new" />} /> */}
         
      </Routes>
      </>):(<AuthPage setUser={setUser}></AuthPage>)
      }
      
      </main>
  );
}

export default App;
