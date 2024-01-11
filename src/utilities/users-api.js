import { getToken } from "./users-service";
// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  
  //add the below code
  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }
   //added the above code

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}

export async function login(credentials){

  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  // try {
  //   const res = await fetch(`${BASE_URL}/login`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //         // Fetch requires data payloads to be stringified
  //   // and assigned to a body property on the options object
  //     body: JSON.stringify(credentials),
  //   });
  //   // Check if request was successful
  //   if (res.ok) {
  //     // res.json() will resolve to the JWT
  //   console.log("Returning: ",res.json)
  //     return res.json();
  //   } else {
  //     console.error("Login failed - Server error:", res.status, res.statusText);
  //     throw new Error("Invalid Login");
  //   }
  // } catch (error) {
  //   console.error("Login failed - Network error:", error);
  //   throw error;
  // }

//   const res = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     // Fetch requires data payloads to be stringified
//     // and assigned to a body property on the options object
//     body: JSON.stringify(credentials)
//   });
//   console.log('RES:',res)

// // Check if request was successful
//     if (res.ok) {
//       // res.json() will resolve to the JWT
//       return res.json();
//     } else {
//       throw new Error('Invalid Sign Up');
//     }



}

export async function signUp(userData) {

 return sendRequest(BASE_URL, 'POST', userData);
  // console.log("UserData",userData)
  // // Fetch uses an options object as a second arg to make requests
  // // other than basic GET requests, include data, headers, etc.
  
  // const res = await fetch(BASE_URL, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   // Fetch requires data payloads to be stringified
  //   // and assigned to a body property on the options object
  //   body: JSON.stringify(userData)
  // });

  // console.log("RES:", res);

  // // Check if request was successful
  // if (res.ok) {
  //   // res.json() will resolve to the JWT
  //   return res.json();
  // } else {
  //   throw new Error('Invalid Sign Up');
  // }
} 

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}