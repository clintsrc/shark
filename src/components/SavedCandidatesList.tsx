import { useEffect, useState, useCallback } from "react";
import type Candidate from "../interfaces/Candidate.interface";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import "./SavedCandidatesList.css";

/*
 * SavedCandidatesList component
 *
 * Displays the selected candidates read from localStorage, or else a message indicating
 * there are no matching candidates when the list is empty.
 *
 * The candidates are previously selected
 * and saved by the user from the Candidate Search (home) page by utilizing the GitHub API
 * and localStorage.
 *
 * Here they are read from localStorage then added to an HTML table. Ther user can
 * click a delete button to remove candidates from the list. This action deletes the
 * user from localStorage
 *
 * Additional options include:
 *  - Sort order for the list.
 *  - A filter helps narrow the list to candidates with specific skills they have
 *    provided in their GitHub profile bio.
 *
 * NOTE: a future improvement will be to make repeat API queries in order to
 * Fill a temporary list of selectable candidates that have a bio and email
 * at minimum rather than using the batch the api returns 'as is'.
 *
 */
const SavedCandidatesList = () => {
  // This state tracks the candidates flagged to be saved
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // This state tracks the list of saved candidates in a sorted order for display
  const [sortedCandidates, setSortedCandidates] = useState<Candidate[]>([]);

  // This state tracks the sort order that the user specifies (initially ascending)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // This filter entered by the user to apply to the candidates bio field for a match
  const [filterText, setFilterText] = useState<string>("");

  /* When the page first loads retrieve the list of saved candidates from 
     localStorage */
  useEffect(() => {
    const savedCandidatesFromStorage = localStorage.getItem("savedCandidates");
    const parsedSavedCandidates: Candidate[] = savedCandidatesFromStorage
      ? (JSON.parse(savedCandidatesFromStorage) as Candidate[])
      : [];
    // update the original list
    setSavedCandidates(parsedSavedCandidates);
    // update the sorted list to be displayed
    setSortedCandidates(parsedSavedCandidates);
  }, []); // empty dependencies: only run once when the component first mounts

  /*
   * removeCandidate()
   *
   * Prepare the list of candidates to be saved in localStorage so that it only
   * includes candidate records are not tracked in the list of candidates to be
   * removed. It generates a new list of candidates to retain.
   *
   */
  const removeCandidate = (candidateToRemove: Candidate) => {
    // updatedCandidates has the candidates that are not flagged to be removed
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== candidateToRemove.login
    );

    // convert the javascript list to json and store the updated list in localStorage
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    // update the list of saved candidates
    setSavedCandidates(updatedCandidates);
    // update the list of sorted candidates
    setSortedCandidates(updatedCandidates);
  };

  /*
   * handleSortChange()
   *
   * Update the state when the user togles the sort order change
   */
  const handleSortChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortCandidates(newSortOrder);
  };

  /*
   * handleFilterChange()
   *
   * Update the filter state to dynamically update the list for the matching filter
   * search result
   *
   */
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    setFilterText(filterValue);
  };

  /*
   * sortCandidates()
   *
   * Sort and Filter the list of saved candidates:
   *  - Sorting is applied to the candidates GitHub login value
   *  - Filtering is applied to the candidate's GitHub bio field
   *
   * Sort the list of candidates according to the option the user toggles. It also
   * applies the filter if the input is populated. It handles the the candidate list
   * sorting but also controls whether a filter is also currently applied or not.
   *
   * 'Memoise': cache the list for reuse. This helps avoid unnecessary re-renders.
   * useCallback() memoizes a method instead of a value. The function won't be
   * recreated unless the array dependency changes
   *
   */
  const sortCandidates = useCallback(
    (order: "asc" | "desc") => {
      const filteredCandidates = savedCandidates.filter((candidate) => {
        /* When the bio filter input is empty be sure to list all saved candidates, 
           including those without bios. This could be improved in the future by
           fetching multiple batches of users and being more selective of which are
           selectable in the Candidate Search page */
        if (filterText === "") {
          return true;
        }
        // ignore case in the filter search
        return candidate.bio?.toLowerCase().includes(filterText.toLowerCase());
      });

      /* Copy the saved users list to a list of filtered candidates to preserve the
         original unfiltered list */
      const sortedArray = [...filteredCandidates];
      // sort the list alphabeically by the candidate's github login id
      sortedArray.sort((a, b) => {
        /* ?? (aka 'nullish'): apply empty string "" if the field is null 
           localeCompare(): handle I18n, likely to be seen for GitHub users! */
        const compareResult = (a.login ?? "").localeCompare(b.login ?? "");
        /* order asc: return the results as-is (compareResult)
           order desc: return the results in reverse order (-compareResult) */
        return order === "asc" ? compareResult : -compareResult;
      });

      // update the sorted state
      setSortedCandidates(sortedArray);
    },
    /* update the ui when a candidate is saved (after removal) or when a filter 
       change applies */
    [savedCandidates, filterText]
  );

  useEffect(
    () => {
      sortCandidates(sortOrder);
    },
    /* update the ui when the filter or the sort order changes, or when a candidate 
       is saved (after removal) */
    [filterText, sortOrder, savedCandidates, sortCandidates]
  );

  /*
   * JSX
   *
   * Draws the HTML table and adds a row for each saved candidate from localStorage
   * so that the saved candidates will persist between browser sessions.
   * 
   * Shows the sort and filter controls when there are saved candidates to display
   * in the list.
   * 
   * By default the list is sorted on the saved GitHub login fields in ascending order,
   * and the user can toggle the sort order.
   * 
   * The user can enter text in the filter field to limit the list to contain only
   * users that have matching text in their bio field. When the field is cleared, all
   * saved candidates are displayed once again, including any that have no bio content.
   * 
   * A remove button is available for each candidate in the list. When the user clicks 
   * it, the items is removed from the list (and localStorage is updated to remove
   * the record permanently).
   * 
   * The Image logo includes a hyperlink to the the user's GitHub page (when that URL
   * exists in the data retieved by the GitHub API). Similarly, if a value is available
   * for the user's email, it will appear as a mailto hyperlink in that field.
   *
   * When there are no candidates, the sort and filter controls are removed along with
   * the table. Instead it displays a message to indicate there are no potential 
   * candidates.
   * 
   */
  return (
    <div>
      {savedCandidates.length > 0 && (
        <div className="controls-container">
          <div>
            <label htmlFor="bio-filter">Filter Bio: </label>
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
                <td className="graphic-cell">
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
                <td className="graphic-cell">
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
