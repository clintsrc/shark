import { useState, useEffect } from "react";
import Candidate from "../interfaces/Candidate.interface";
import SavedCandidatesList from "../components/SavedCandidatesList";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    try {
      const savedCandidatesFromStorage = localStorage.getItem("savedCandidates");
      const parsedSavedCandidates: Candidate[] = savedCandidatesFromStorage
        ? JSON.parse(savedCandidatesFromStorage) as Candidate[]
        : [];
      setSavedCandidates(parsedSavedCandidates);
    } catch (error) {
      console.error("Error parsing saved candidates from localStorage:", error);
      setSavedCandidates([]); // Fallback to an empty array
    }
  }, []);
  

  return (
    <>
      <h1>Potential Candidates</h1>
      <SavedCandidatesList
        savedCandidates={savedCandidates}
      />
    </>
  );
};

export default SavedCandidates;
