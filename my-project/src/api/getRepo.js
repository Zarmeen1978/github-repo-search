const apiToken = import.meta.env.VITE_API_KEY;
import { Octokit } from '@octokit/rest';
export const getRepo=async()=>{
  const octokit = new Octokit({ auth: apiToken });
  const response = await octokit.request('GET /user/repos', {
    per_page: 100,
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  } 
); 
return response;
};
