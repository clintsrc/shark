import SavedCandidatesList from "../components/SavedCandidatesList";

/* 
 * seperation of concerns: delegates the bulk of the work to the 
 * SavedCandidatesList component
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
