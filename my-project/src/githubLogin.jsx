
 import  {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from './MyContext';
import { gitPost } from './api/gitPost';
const GitHubLogin = () => {
const[myState,setMyState]=useState();
  const clientId = 'Ov23liXC6ivHrlbFX1SI';
 const redirectUri='http://localhost:5173/github_auth_code';
  const navigate = useNavigate();

  const generateState = () =>  
    Math.random().toString(36).substring(2) + Date.now().toString(36); 

  const handleLogin = () => {
    const state = generateState();
    localStorage.setItem('oauthState', state); 

    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user&state=${state}`;

    window.location.href = githubAuthURL; 
  };

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code'); 
  if (code) {
    (async () => {
      try {
      const data = await gitPost();
        const accessToken = data.access_token;
        console.log('Access Token:', accessToken);
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          setMyState(accessToken);
          navigate('/board', { state: { accessToken } });
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    })();
  }
}, [navigate]);

  return (
    <div>
      <MyContext.Provider>
      <h2>Login with GitHub</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
      </MyContext.Provider>
    </div>
  );
};

export default GitHubLogin;
