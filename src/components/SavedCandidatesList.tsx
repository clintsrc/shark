import type Candidate from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";

interface SavedCandidatesListProps {
  savedCandidates: Candidate[];
}

const SavedCandidatesList = ({ savedCandidates }: SavedCandidatesListProps) => {
  return (
    <ul>
      {savedCandidates.map((candidate) => (
        <li key={candidate.login}>
          <CandidateCard currentCandidate={candidate} isSaved />
        </li>
      ))}
    </ul>
  );
};

export default SavedCandidatesList;
