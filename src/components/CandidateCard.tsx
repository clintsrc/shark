import Candidate from "../interfaces/Candidate.interface";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import "./CandidateCard.css";

/*
 * CandidateCardProps interface
 *
 * Define the shape of the properties passed into CandidateCard. It has a Candidate 
 * interface that defines the shape of the data we're interested in from the GitHub
 * API. It also needs the parent properties that handle saving and rejecting candidates
 * and tracking whether the candidate has been flagged as saved.
 * 
 */
interface CandidateCardProps {
  currentCandidate: Candidate | null;
  addToSavedCandidateList?: () => void;
  getRandomCandidate?: () => void;
  isSaved?: boolean;
}

/*
 * CandidateCard component
 *
 * Displays details of a GitHub user as a potential candidate for hire. Provides the 
 * UI controls to reject the current candidate and advance to the next, or else to add 
 * them to localStorage to track in a list of other selected candidates.
 * 
 * When there are no more candidates to choose from, replacd the candidate UI with a 
 * simple message that no more candidates are available
 *
 */

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
              <a
                href={currentCandidate.html_url ?? ""}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="candidate-image"
                  src={currentCandidate.avatar_url ?? ""}
                  alt={`${currentCandidate.name}'s avatar`}
                />
              </a>
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
              className="search-button reject-button"
              onClick={() => getRandomCandidate?.()}
            />
            <MdAddCircle
              className="search-button add-button"
              onClick={() => addToSavedCandidateList?.()}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
