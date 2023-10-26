// TODO: Make fetch truly typesafe

import type { Repository } from "./types";

const GithubApiVersion = "2022-11-28";

const headers: HeadersInit = [
  ["Authorization", `Bearer ${process.env.GITHUB_TOKEN}`],
  ["Accept", "application/vnd.github+json"],
  ["X-GitHub-Api-Version", GithubApiVersion],
];

export async function getGithubReposByUser(username: string): Promise<Repository[]> {
  try {
    const data = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers,
    });
    if (!data.ok) {
      const error = await data.json();
      throw error;
    }
    return (await data.json()) as Repository[];
  } catch (error) {
    throw error;
  }
}
