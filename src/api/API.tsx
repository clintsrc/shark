import type Candidate from "../interfaces/Candidate.interface";

/*
 * searchGithub()
 *
 * Use the github api to fetch a batch of users from GitHub.
 * The selection is determined by generating a random user ID. the API uses
 * that user's ID as the ${start} of the selection, and includes the users created after
 * that one.
 * 
 * It uses the default, returning 30 users (per_page)
 * ref: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#list-users
 *
 */
const searchGithub = async (): Promise<{ login: string }[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    // console.log(import.meta.env);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    // console.log('Response:', response);
    const data: { login: string }[] = (await response.json()) as {
      login: string;
    }[];
    if (!response.ok) {
      throw new Error("invalid API response, check the network tab");
    }
    console.log("searchGithub Data:", data);
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return [];
  }
};

/*
 * searchGithubUser()
 *
 * Use the github api to fetch information about a specific user, specified
 * by the ${username}
 * 
 * ref: https://docs.github.com/en/rest/users/users#get-a-user
 *
 */

const searchGithubUser = async (username: string): Promise<Candidate> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data: Candidate = (await response.json()) as Candidate;
    if (!response.ok) {
      throw new Error("invalid API response, check the network tab");
    }
    console.log("searchGithubUser Data:", data);
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {
      avatar_url: "",
      name: "",
      login: "",
      location: "",
      email: "",
      company: "",
      html_url: "",
      bio: "",
    };
  }
};

export { searchGithub, searchGithubUser };
