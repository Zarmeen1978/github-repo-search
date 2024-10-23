import { useState, useEffect} from 'react';
import './App.css'; 
import { fetchLanguages } from './api/languageApi';
import { getRepo } from './api/getRepo';
const LanguageBox = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const loadLanguages = async () => {
        try {
            const data = await fetchLanguages();
            setLanguages(data);
        } catch (err) {
            Error(err.message);
        }
    };

    loadLanguages();
}, []);

  const fetchRepositories = async () => {
    if (!selectedLanguage) {
      setMessage('Please select a language');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await getRepo();
      console.log(response);
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
        <div className='container'>
          <p>Loading...</p>
        </div>
      ) : (
        <div className='container-box'>
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
