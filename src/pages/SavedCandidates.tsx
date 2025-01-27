import SavedCandidatesList from "../components/SavedCandidatesList";

/* 
 * SavedCandidates
 * 
 * The bulk of the work is in the SavedCandidatesList component for seperation of 
 * concerns
 * 
 */
const SavedCandidates = () => {
  return (
    <>
      <h1>Potential Candidates</h1>
      <SavedCandidatesList />
    </>
  );
};

export default SavedCandidates;
