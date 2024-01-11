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
          <Route path = '/orders/new' element={<NewOrderPage/>}/>
          <Route path = '/orders' element={<OrderHistoryPage/>}/>
      </Routes>
      </>):(<AuthPage setUser={setUser}></AuthPage>)
      }
      
      </main>
  );
}

export default App;
