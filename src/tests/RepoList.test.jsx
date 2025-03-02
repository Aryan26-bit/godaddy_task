import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepoList from "../components/RepoList/RepoList";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");

const mockRepos = [
  { id: 1, name: "repo1" },
  { id: 2, name: "repo2" },
];

test("renders list of repositories", async () => {
  axios.get.mockResolvedValue({ data: mockRepos });

  render(
    <MemoryRouter>
      <RepoList />
    </MemoryRouter>
  );

  expect(await screen.findByText("repo1")).toBeInTheDocument();
  expect(await screen.findByText("repo2")).toBeInTheDocument();
});

test("displays error message when fetching fails", async () => {
  axios.get.mockRejectedValue(new Error("Failed to fetch"));

  render(
    <MemoryRouter>
      <RepoList />
    </MemoryRouter>
  );

  expect(
    await screen.findByText("Failed to fetch repositories")
  ).toBeInTheDocument();
});
