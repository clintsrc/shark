import { useEffect, useState } from "react";
import type Candidate from "../interfaces/Candidate.interface";
import CandidateCard from "./CandidateCard";
import { IoRemoveCircleSharp } from "react-icons/io5";

const SavedCandidatesList = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [sortedCandidates, setSortedCandidates] = useState<Candidate[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    const savedCandidatesFromStorage = localStorage.getItem("savedCandidates");
    const parsedSavedCandidates: Candidate[] = savedCandidatesFromStorage
      ? (JSON.parse(savedCandidatesFromStorage) as Candidate[])
      : [];
    setSavedCandidates(parsedSavedCandidates);
    setSortedCandidates(parsedSavedCandidates);
  }, []);

  const removeCandidate = (candidateToRemove: Candidate) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== candidateToRemove.login
    );

    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
    setSortedCandidates(updatedCandidates);
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortCandidates(newSortOrder);
  };

  // Filter on the bio field to narrow on skills
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    setFilterText(filterValue);
  };

  const sortCandidates = (order: "asc" | "desc") => {
    const filteredCandidates = savedCandidates.filter((candidate) =>
      candidate.bio?.toLowerCase().includes(filterText.toLowerCase())
    );

    const sortedArray = [...filteredCandidates];
    sortedArray.sort((a, b) => {
      const compareResult = (a.login ?? "").localeCompare(b.login ?? "");
      return order === "asc" ? compareResult : -compareResult;
    });

    setSortedCandidates(sortedArray);
  };

  useEffect(() => {
    sortCandidates(sortOrder);
  }, [filterText, sortOrder, savedCandidates]);

  return (
    <div>
      <h2>Saved Candidates</h2>
      <div>
        <label htmlFor="bio-filter">Filter on bio: </label>
        <input
          id="bio-filter"
          type="text"
          value={filterText}
          onChange={handleFilterChange}
          placeholder="Search by bio"
        />
      </div>

      <div>
        <button onClick={handleSortChange}>
          Sort by login ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      {sortedCandidates.length === 0 ? (
        <p>There are no potential candidates.</p>
      ) : (
        <ul>
          {sortedCandidates.map((candidate) => (
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
