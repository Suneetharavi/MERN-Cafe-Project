import React from 'react'
import * as usersService from '../utilities/users-service'

function OrderHistoryPage() {

const handleCheckToken =() =>{

  let exp=usersService.checkToken()
  console.log(exp)
  alert('Checked')

}

  return (
    <div>
      <button onClick={handleCheckToken}>CHECK LOGIN EXPIRATION</button>
      <h1>OrderHistoryPage</h1>
    </div>
  )
}

export default OrderHistoryPage