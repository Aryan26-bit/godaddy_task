import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./../styles/RepoDetails.css";

const RepoDetails = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/godaddy/${repoName}`)
      .then((response) => {
        setRepo(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch repository details");
        setLoading(false);
      });
  }, [repoName]);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="repo-details">
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <p>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        Repo Link
        </a>
      </p>
      <p>Language: {repo.language}</p>
      <p>Forks: {repo.forks_count}</p>
      <p>Open Issues: {repo.open_issues_count}</p>
      <p>Watchers: {repo.watchers_count}</p>
    </div>
  );
};

export default RepoDetails;
