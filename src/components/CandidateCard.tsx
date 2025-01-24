import Candidate from "../interfaces/Candidate.interface";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

interface CandidateCardProps {
  currentCandidate: Candidate | null;
  addToSavedCandidateList?: () => void; // Optional for saved candidates
  getRandomCandidate?: () => void; // Optional for saved candidates
  isSaved?: boolean; // Indicates whether this card is for a saved candidate
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
        <>
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
          <p>
            GitHub:{" "}
            <a
              href={currentCandidate.html_url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {currentCandidate.html_url ?? "N/A"}
            </a>
          </p>
        </>
      ) : (
        <p>No more candidates are available</p>
      )}
      <br />
      {!isSaved && currentCandidate && (
        <>
          <IoRemoveCircleSharp
            color="red"
            style={{ fontSize: "40px", cursor: "pointer" }}
            onClick={() => getRandomCandidate?.()}
          />
          <MdAddCircle
            color="green"
            style={{ fontSize: "40px", cursor: "pointer" }}
            onClick={() => addToSavedCandidateList?.()}
          />
        </>
      )}
    </div>
  );
};

export default CandidateCard;
