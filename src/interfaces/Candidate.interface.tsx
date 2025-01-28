/*
 * Candidate.interface
 * 
 * Define the shape of the Candidate data that's used from the GitHub API query
 * Handle empty values since not all GitHub users fill in all of the profile 
 * information.
 * 
 * NOTE that the property names match the json user record attributes in the API
 * query results.
 *
 */

interface Candidate {
  avatar_url: string | null;  // the url to the user logo image
  name: string | null;  // 'formal' fname lname (as 'formal' as the user provides!)
  // the login name (aka organization) is always specified for valid users
  login: string | null;
  location: string | null;
  email: string | null;
  company: string | null;
  html_url: string | null;  // the url to the user's github site
  bio: string | null;
}

export default Candidate;
