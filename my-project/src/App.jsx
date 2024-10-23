import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GitHubLogin from './githubLogin';
import LanguageBox from './LanguageBox';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GitHubLogin />} />
        <Route path='/github_auth_code' element={<LanguageBox/>}/>
        
      </Routes>
    </Router>
  );
};
export default App;
