import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";

const CandidateSearch = () => {
  // State to track the current batch of candidates
  const [candidatesBatch, setCandidatesBatch] = useState<Candidate[]>([]);

  // State to track the current index in the batch
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to track the currently displayed candidate
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );

  // fetch a batch of candidates when the component mounts
  useEffect(() => {
    getRandomCandidateBatch().catch((error) =>
      console.error("Error in getRandomCandidateBatch:", error)
    );
  }, []); // Empty dependencies: run once on mount

  // Fetch a batch of candidates using the GitHub API
  const getRandomCandidateBatch = async () => {
    try {
      const usersBatch: { login: string }[] = await searchGithub();
      if (Array.isArray(usersBatch) && usersBatch.length > 0) {
        const detailedUsers = await Promise.all(
          usersBatch.map(async (user) => {
            try {
              return await searchGithubUser(user.login);
            } catch (error) {
              console.error(
                `Error fetching details for user ${user.login}:`,
                error
              );
              return null;
            }
          })
        );

        const validCandidates = detailedUsers.filter((user) => user?.login);
        setCandidatesBatch(
          validCandidates.filter(
            (candidate): candidate is Candidate => candidate !== null
          )
        );
        setCurrentIndex(0);
        setCurrentCandidate(validCandidates[0] ?? null);
      } else {
        setCandidatesBatch([]);
        setCurrentCandidate(null);
      }
    } catch (error) {
      console.error("Error fetching candidate batch:", error);
    }
  };

  // Navigate through the candidates and track when the last candidate is reached
  const handleNextCandidate = () => {
    if (currentIndex + 1 < candidatesBatch.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setCurrentCandidate(candidatesBatch[currentIndex + 1]);
    } else {
      setCurrentCandidate(null); // No more candidates
    }
  };

  /*
   *
   * When Add is clicked for the current candidate, add to localStorage then
   * advance to the next
   *
   */
  const addToSavedCandidateList = () => {
    try {
      const savedCandidates: Candidate[] = JSON.parse(
        localStorage.getItem("savedCandidates") ?? "[]"
      ) as Candidate[];
      savedCandidates.push(currentCandidate!);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    } catch (error) {
      console.error("Error saving candidate:", error);
      alert("Failed to save the candidate."); // TODO: find a better way than using a modal!
    }
    handleNextCandidate();
  };

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
