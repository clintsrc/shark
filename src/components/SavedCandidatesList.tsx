import { useEffect, useState } from "react";
import type Candidate from "../interfaces/Candidate.interface";

/* icons */
import { IoRemoveCircleSharp } from "react-icons/io5";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

import "./SavedCandidatesList.css";

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    setFilterText(filterValue);
  };

  const sortCandidates = (order: "asc" | "desc") => {
    const filteredCandidates = savedCandidates.filter((candidate) =>
      candidate.login?.toLowerCase().includes(filterText.toLowerCase())
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
      {savedCandidates.length > 0 && (
        <div className="controls-container">
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

          <button onClick={handleSortChange}>
            {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
        </div>
      )}

      {sortedCandidates.length === 0 ? (
        <p>There are no potential candidates.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>

          <tbody>
            {sortedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img
                    src={candidate.avatar_url ?? ""}
                    alt={`${candidate.name}'s avatar`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>
                  {candidate.login} ({candidate.name ?? "N/A"})
                </td>
                <td>{candidate.location ?? "N/A"}</td>
                <td>
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{candidate.company ?? "N/A"}</td>
                <td>{candidate.bio ?? "N/A"}</td>
                <td>
                  <IoRemoveCircleSharp
                    className="button-icon reject-button"
                    onClick={() => removeCandidate(candidate)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidatesList;
