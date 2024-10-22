
 import  {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Octokit } from '@octokit/core';
import { MyContext } from './MyContext';//git push -u -f origin master
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
  const code = urlParams.get('code'); // 
  if (code) {
    const octokit = new Octokit();
    (async () => {
      try {
        const { data } = await octokit.request('POST https://github.com/login/oauth', {
          client_id: clientId,
          client_secret: '438d22ad6d3d8db75258efdafbcda9a52c304fcd', 
          code: code
        }, {
          headers: {
            'Accept': 'application/json',
           // 'Content-Type': 'application/json', 
          },
        });
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
