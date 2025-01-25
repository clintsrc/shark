// TODO: Create an interface for the Candidate objects returned by the API

/*
 * GIVEN a candidate search application
 *
 * WHEN the candidate search page loads
 * THEN the information for one candidate should be displayed, including the candidate's
 *     name, username, location, avatar, email, html_url, and company
 *
 * WHEN I click the "+" button
 * THEN the candidate should be saved to the list of potential candidates and the next
 * candidate's information should be displayed
 *
 * WHEN I click the "-" button
 * THEN the next candidate's information should be displayed without saving the current
 * candidate
 *
 * WHEN there are no candidates available to review
 * THEN an appropriate message should be shown indicating no more candidates are
 * available
 *
 * ********************************
 * 
 * WHEN the potential candidates page loads
 * THEN the user should see a list of previously saved potential candidates with their
 *     name, username, location, avatar, email, html_url, and company
 *
 * WHEN the page reloads
 * THEN the list of potential candidates should persist and be available for viewing
 *
 * WHEN there are no potential candidates
 * THEN an appropriate message should be displayed indicating no candidates have been
 * accepted
 *
 * WHEN I click the "-" button
 * THEN the next candidate's information should be displayed without saving the current
 * candidate
 *
 * ********************************
 * Bonus
 * 
 * Fulfilling any of the following can add up to 10 points to your grade. Note that 
 * the highest grade you can achieve is still 100:
 *  Application contains functionality to sort potential candidates (5 points).
 *  Application contains functionality to filter potential candidates (5 points).
 *
 */

interface Candidate {
  avatar_url: string | null; // "avatar_url": "https://avatars.githubusercontent.com/u/179427740?v=4",
  name: string | null; // "name": "Clint Jones",
  login: string | null; // "login": "clintsrc",
  location: string | null; // "location": "Tigard, OR USA",
  email: string | null; // "email": null,
  company: string | null; // "company": null,
  html_url: string | null; // "html_url": "https://github.com/clintsrc",
  bio: string | null; // "bio": null,
}

export default Candidate;
