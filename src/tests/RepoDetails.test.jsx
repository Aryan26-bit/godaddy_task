import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RepoDetails from "../components/RepoDetails/RepoDetails";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");

const mockRepo = {
  name: "test-repo",
  description: "This is a test repository",
  html_url: "https://github.com/godaddy/test-repo",
  language: "JavaScript",
  forks_count: 10,
  open_issues_count: 2,
  watchers_count: 5,
};

test("renders repository details", async () => {
  axios.get.mockResolvedValue({ data: mockRepo });

  render(
    <MemoryRouter initialEntries={["/repo/test-repo"]}>
      <Routes>
        <Route path="/repo/:repoName" element={<RepoDetails />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument()
  );
  expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
  expect(screen.getByText("Repo Link")).toHaveAttribute(
    "href",
    mockRepo.html_url
  );
  expect(
    screen.getByText(`Language: ${mockRepo.language}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`Forks: ${mockRepo.forks_count}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`Open Issues: ${mockRepo.open_issues_count}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`Watchers: ${mockRepo.watchers_count}`)
  ).toBeInTheDocument();
});

test("displays error message when fetching fails", async () => {
  axios.get.mockRejectedValue(new Error("Failed to fetch"));

  render(
    <MemoryRouter initialEntries={["/repo/test-repo"]}>
      <Routes>
        <Route path="/repo/:repoName" element={<RepoDetails />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(
      screen.getByText("Failed to fetch repository details")
    ).toBeInTheDocument()
  );
});
