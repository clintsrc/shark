import { useEffect, useState, useCallback } from "react";
import type Candidate from "../interfaces/Candidate.interface";

/* react icons */
import { IoRemoveCircleSharp } from "react-icons/io5";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

import "./SavedCandidatesList.css";

/*
 * SavedCandidatesList
 *
 * Displays the selected candidates from localStorage or else a message indicating
 * there are no matching candidates. The data is retrieved using the GitHub API during 
 * the search and also saved to localStorage when selected. Here those saved candidates 
 * are read from localStorage in json format and listed in a table. Ther user can 
 * delete candidates from the list which also deletes the record from localStorage.
 * 
 * Provides a sort order option on the list.
 * 
 * Provides a filter to help find specific skills the candidate may have provided
 * in their bio. 
 *
 * NOTE: a future improvement will be to make repeat API queries in order to
 * Fill a temporary list of selectable candidates that have a bio and email
 * at minimum rather than using the batch the api returns 'as is'.
 *
 */
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

  /*
   * Memoize: cache the list for reuse. This helps avoid unnecessary re-renders.
   * useCallback() memoizes a method instead of a value. The function won't be
   * recreated unless the array dependency changes
   *
   */
  const sortCandidates = useCallback(
    (order: "asc" | "desc") => {
      const filteredCandidates = savedCandidates.filter((candidate) => {
        // See the note in the component's comment at the top  of the file
        // When the bio filter input is empty continue to list chosen candidates without bios
        if (filterText === "") {
          return true;
        }
        return candidate.bio?.toLowerCase().includes(filterText.toLowerCase());
      });

      const sortedArray = [...filteredCandidates];
      sortedArray.sort((a, b) => {
        const compareResult = (a.login ?? "").localeCompare(b.login ?? "");
        return order === "asc" ? compareResult : -compareResult;
      });

      setSortedCandidates(sortedArray);
    },
    [savedCandidates, filterText]
  );

  useEffect(() => {
    sortCandidates(sortOrder);
  }, [filterText, sortOrder, savedCandidates, sortCandidates]);

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
        <div className="none-remain">There are no potential candidates.</div>
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
                <td className="cell-graphic">
                  <a
                    href={candidate.html_url ?? ""}
                    target="_blank"
                    rel="noreferrer"
                  >
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
                  </a>
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
                <td className="cell-graphic">
                  <IoRemoveCircleSharp
                    className="delete-button"
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
