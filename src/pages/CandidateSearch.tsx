import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";

/*
 * CandidateSearch component
 * TODO: yes, this is a component, not a page, refactor!
 *
 * This component manages the Candidate Search (home) page to fetch a list
 * of candidates to hire from GitHub using the GitHub API. It grabs a raw list of
 * users then retrieves each user's data separately to filter out any that return
 * 404 not found issues. The resulting array is displayed to the user one element
 * at a time until it reaches the last candidate. After that it displays a message
 * indicating no more candidates are available.
 *
 * The user can click the delete button to reject the candidate or the add button to
 * save the candidate's details in localStorage for the Saved Candidates page to use
 * later.
 *
 */
const CandidateSearch = () => {
  // This state tracks the current batch of candidates
  const [candidatesBatch, setCandidatesBatch] = useState<Candidate[]>([]);

  // This state tracks the current index in the fetched batch of candidates
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // This state tracks the currently displayed candidate
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );

  // Fetch a batch of candidates using the GitHub API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        await getRandomCandidateBatch();
      } catch (error) {
        console.error("Error in fetching candidate batch:", error);
      }
    };

    /* Using 'void' on this call to acknowledge a typescript warning:
        Promise returned by fetchCandidates()
      useEffect expects either a cleanup function or undefined to be returned. 
      fetchCandidates() only needs to run once and doesn't require cleanup. */
    void fetchCandidates();
  }, []); // empty dependencies: only run once when the component first mounts

  /*
   * getRandomCandidateBatch()
   *
   * Handle the details for retrieving the batch of users, the details for all of
   * the user entries, and rejecting invalid users
   *
   */
  const getRandomCandidateBatch = async () => {
    try {
      // Load an array of the raw users info that the API returned in a batch
      const usersBatch: { login: string }[] = await searchGithub();

      // Populate an array of valid users in a separate array to present to the user
      if (Array.isArray(usersBatch) && usersBatch.length > 0) {
        const validCandidates: Candidate[] = [];

        /* Fetch the details for each user in the current raw batch
           The login must be valid -- this helps filter out invalid users
           where the API returns 404 Not Found */
        const userDetailsPromises = usersBatch.map(async (user) => {
          try {
            const userDetails = await searchGithubUser(user.login);

            // only add if userDetails exists with a login property
            if (userDetails?.login) {
              validCandidates.push(userDetails);
            }
          } catch (error) {
            console.error(
              `Error fetching details for user ${user.login}:`,
              error
            );
          }
        });

        // Wait for all the user details to be fetched
        await Promise.all(userDetailsPromises);

        // Update the state with the list of valid candidates
        setCandidatesBatch(validCandidates);
        // Update the states to show the first candidate element in the array
        setCurrentIndex(0);
        setCurrentCandidate(validCandidates[0] ?? null);
      } else {
        // No candidates found, reset the batch and candidate states
        setCandidatesBatch([]);
        setCurrentCandidate(null);
      }
    } catch (error) {
      // Log any error encountered during the process
      console.error("Error fetching candidate batch:", error);
    }
  };

  /*
   * handleNextCandidate()
   *
   * Navigate through the list of candidates tracked in the state and track the
   * index state's position until the last candidate element is reached. The index
   * advances when the user clicks the reject button, or else after the user clicks
   * the add button in order to autoatically move on to the next candidate.
   *
   */
  const handleNextCandidate = () => {
    if (currentIndex < candidatesBatch.length - 1) {
      const nextIndex = currentIndex + 1;
      // update the index and current candidate states
      setCurrentIndex(nextIndex);
      setCurrentCandidate(candidatesBatch[nextIndex]);
    } else {
      setCurrentCandidate(null); // No more candidates, update the state
    }
  };

  /*
   * addToSavedCandidateList()
   *
   * When the user clicks the add button the current candidate, add that candidate
   * object to localStorage then autoatically advance the state to the next candidate.
   *
   */
  const addToSavedCandidateList = () => {
    try {
      // convert the stored list of candidates to a list of javascript objects
      const savedCandidates: Candidate[] = JSON.parse(
        localStorage.getItem("savedCandidates") ?? "[]"
      ) as Candidate[];
      // add the selected candidate to the Candidate array
      savedCandidates.push(currentCandidate!);
      // convert the candidate list to json to update the localStorage
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    } catch (error) {
      console.error("Error saving candidate:", error);
    }
    handleNextCandidate();
  };

  /*
   * JSX
   *
   * Pass the CandidateCard the necessary properties:
   *  currentCandidate: used to display the candidate's details
   *  addToSavedCandidateList: the function to store the current candidate to
   *    localStorage when the user clicks the add button
   *  handleNextCandidate: the function to advance to the next candidate when the
   *    user clicks the reject button
   *
   */
  return (
    <>
      <h1>Candidate Search</h1>
      <section id="searchSection"></section>
      <CandidateCard
        currentCandidate={currentCandidate}
        addToSavedCandidateList={addToSavedCandidateList}
        getRandomCandidate={handleNextCandidate}
      />
    </>
  );
};

export default CandidateSearch;
