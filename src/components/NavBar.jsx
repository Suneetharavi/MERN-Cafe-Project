import React from 'react'
import {Link} from 'react-router-dom'
import * as userService from '../utilities/users-service'

function NavBar({user,setUser}) {

    function handleLogOut() {
      // Delegate to the users-service
      userService.logOut();
      // Update state will also cause a re-render
      setUser(null);
    }

    return (
      <nav style={{display:'flex', justifyContent:'space-evenly'}}>

        <div style={{justifyContent:'space-around'}}>
          <p style={{margin:'1em'}}>Welcome {user.name},</p>
          <p style={{margin:'1em'}}>Logged in as: {user.email}</p>
          <Link to = '' onClick={handleLogOut}><button>Log-Out</button></Link>
        </div>
      <Link to="/orders">Order History</Link>
    
      <Link to="/orders/new">New Order</Link>
    </nav>
    )
}

export default NavBar