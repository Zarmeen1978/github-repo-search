import { Octokit } from '@octokit/rest';
export const gitPost=async()=>{
  const clientId = 'Ov23liXC6ivHrlbFX1SI';
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code'); 
    const octokit = new Octokit();
  const response = await octokit.request('POST https://github.com/login/oauth', {
    client_id: clientId,
      client_secret: '438d22ad6d3d8db75258efdafbcda9a52c304fcd', 
      code: code
    }, {
      headers: {
        'Accept': 'application/json',
      },
  } 
); 
return response;
};
