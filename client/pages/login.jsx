import GoogleLogin from 'react-google-login';
import React, { useContext } from 'react';
import UserContext from '../app.js'

function Login() {
  const user = useContext(UserContext).user
  const setUser = useContext(UserContext).setUser;

  // const handleLogin = async (googleData) => {
  //   const res = await fetch('/api/google-login', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       token: googleData.tokenId,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   });

  //   const userData = await res.json();
  //   setUser(userData);
  // }

  // const handleFailure = (error) => {
  //   alert(error);
  // }

  return (
    <div className='Login'>
      <header className='LoginHeader'>
        <div>
          <GoogleLogin
            clientId={process.env.VOLATRACK_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
          ></GoogleLogin>
        </div>
      </header>
    </div>
  )
}

export default Login;