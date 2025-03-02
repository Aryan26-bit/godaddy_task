import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepoList from "./components/RepoList/RepoList.jsx";
import RepoDetails from "./components/RepoDetails/RepoDetails.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/repo/:repoName" element={<RepoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
