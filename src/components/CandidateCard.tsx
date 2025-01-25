import Candidate from "../interfaces/Candidate.interface";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import "./CandidateCard.css";

interface CandidateCardProps {
  currentCandidate: Candidate | null;
  addToSavedCandidateList?: () => void; 
  getRandomCandidate?: () => void; 
  isSaved?: boolean; 
}

const CandidateCard = ({
  currentCandidate,
  addToSavedCandidateList,
  getRandomCandidate,
  isSaved = false,
}: CandidateCardProps) => {
  return (
    <div className="candidate-card">
      {currentCandidate ? (
        <div className="candidate-info">
          <img
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={currentCandidate.avatar_url ?? ""}
            alt={`${currentCandidate.name}'s avatar`}
          />
          <div className="candidate-details">
            <h2>
              {currentCandidate.login}{" "}
              {currentCandidate.name ? `(${currentCandidate.name})` : ""}
            </h2>
            <p>Location: {currentCandidate.location ?? ""}</p>
            <p>
              Email:{" "}
              {currentCandidate.email ? (
                <a href={`mailto:${currentCandidate.email}`}>
                  {currentCandidate.email}
                </a>
              ) : (
                ""
              )}
            </p>
            <p>Company: {currentCandidate.company ?? ""}</p>
            <p>Bio: {currentCandidate.bio ?? ""}</p>
          </div>
        </div>
      ) : (
        <p>No more candidates are available</p>
      )}
      <br />
      {!isSaved && currentCandidate && (
        <>
          <IoRemoveCircleSharp
            className="button-icon reject-button"
            onClick={() => getRandomCandidate?.()}
          />
          <MdAddCircle
            className="button-icon add-button"
            onClick={() => addToSavedCandidateList?.()}
          />
        </>
      )}
    </div>
  );
};

export default CandidateCard;
