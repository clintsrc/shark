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
    <div className="candidate-card-wrapper">
      <div className="candidate-card">
        {currentCandidate ? (
          <>
            <div className="candidate-info">
              <img
                className="candidate-image"
                src={currentCandidate.avatar_url ?? ""}
                alt={`${currentCandidate.name}'s avatar`}
              />
            </div>
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
          </>
        ) : (
          <div className="none-remain">No more candidates are available</div>
        )}
      </div>

      <div className="buttons-container">
        {!isSaved && currentCandidate && (
          <>
            <IoRemoveCircleSharp
              className="reject-button"
              onClick={() => getRandomCandidate?.()}
            />
            <MdAddCircle
              className="add-button"
              onClick={() => addToSavedCandidateList?.()}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
