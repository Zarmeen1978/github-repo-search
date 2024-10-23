import { useState, useEffect, useContext } from 'react';
import { Octokit } from '@octokit/rest';
import './App.css'; // Optional: For styling
import { MyContext } from './MyContext';

const LanguageBox = () => {
  // const { myState, setMyState } = useContext(MyContext); // This state is created for setting the access token
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const apiToken = import.meta.env.VITE_API_KEY;
  console.log(apiToken);
  const octokit = new Octokit({ auth: apiToken });

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json'
        );
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    fetchLanguages();
  }, []);

  const fetchRepositories = async () => {
    if (!selectedLanguage) {
      setMessage('Please select a language');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      const response = await octokit.request('GET /user/repos', {
        per_page: 100,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      const filteredRepos = response.data.filter(repo => 
        repo.language === selectedLanguage && repo.owner.login === 'Zarmeen1978' 
      );

      setRepos(filteredRepos);
      setMessage(`Found ${filteredRepos.length} repositories.`);
    } catch (error) {
      setMessage('Error fetching repositories: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='github-box-style'>
        <div className='box'></div>
        <h1>Github Repository Finder</h1>
      </div>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className='dropdown'
      >
        <option value="">Select a Language</option>
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.title}
          </option>
        ))}
      </select>
      <button onClick={fetchRepositories} className='button'>
        Search
      </button>
      {loading ? (
        <div style={{ backgroundColor: 'lightgrey', width: '50vh', height: '200px', borderRadius: '5px',
                      color: 'black', textAlign: 'center', paddingTop: '12px', fontSize: '20px', marginTop: '14px'
                    }}>
          <p>Loading...</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'lightgrey', width: '80%', height: '70%', borderRadius: '5px',
                      color: 'black', textAlign: 'center', paddingTop: '12px', marginTop: '14px', marginBottom: '30px',
                    }}>
          <p>{message}</p>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.full_name}
                </a> {repo.stargazers_count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageBox;
