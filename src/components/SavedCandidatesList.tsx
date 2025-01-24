import { useEffect, useState } from "react";
import type Candidate from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";
import { IoRemoveCircleSharp } from "react-icons/io5";

const SavedCandidatesList = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load the saved candidates from localStorage on mount
  useEffect(() => {
    const savedCandidatesFromStorage = localStorage.getItem("savedCandidates");
    const parsedSavedCandidates: Candidate[] = savedCandidatesFromStorage
      ? (JSON.parse(savedCandidatesFromStorage) as Candidate[])
      : [];
    setSavedCandidates(parsedSavedCandidates);
  }, []);

  // Remove a candidate from localStorage, update the state
  const removeCandidate = (candidateToRemove: Candidate) => {
    const savedCandidatesFromStorage = localStorage.getItem("savedCandidates");
    const parsedSavedCandidates: Candidate[] = savedCandidatesFromStorage
      ? (JSON.parse(savedCandidatesFromStorage) as Candidate[])
      : [];

    const updatedCandidates = parsedSavedCandidates.filter(
      (candidate) => candidate.login !== candidateToRemove.login
    );

    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div>
      {savedCandidates.length === 0 ? (
        <p>There are no potential candidates.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.login}>
              <CandidateCard currentCandidate={candidate} isSaved />
              <span style={{ marginRight: "8px" }}>Reject</span>
              <IoRemoveCircleSharp
                color="red"
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={() => removeCandidate(candidate)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidatesList;
