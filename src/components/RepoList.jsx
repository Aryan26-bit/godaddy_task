import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../styles/RepoList.css";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.github.com/orgs/godaddy/repos")
      .then((response) => {
        setRepos(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch repositories");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="heading-text">Github Repositories List</div>
      <div className="repo-list">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-card">
            <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RepoList;
