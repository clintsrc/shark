import type React from "react";
import type Candidate from "../interfaces/Candidate.interface";
import { ImCross } from "react-icons/im"; // import { IoRemoveCircleSharp } from "react-icons/io5"; | <IoRemoveCircleSharp />
import { CgPlayListAdd } from "react-icons/cg"; // import { MdAddCircle } from "react-icons/md"; | <MdAddCircle />

type CandidateCardProps = {
  currentCandidate: Candidate;
  addToSavedCandidates?: (() => void) | null;
  onSavedCandidatesList?: boolean | null;
  removeFromStorage?:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnCandidateList: boolean | null | undefined,
        candidatName: string | null
      ) => void)
    | null;
};

const CandidateCard = ({
  currentCandidate,
  addToSavedCandidates,
  onSavedCandidatesList,
  removeFromStorage,
}: CandidateCardProps) => {
  return (
    <>
      {currentCandidate?.candidateName ? (
        <section className="currentCandidate">
          <article className="details">
            <div>

            <div className="image-container">
            <img
              src={currentCandidate.avatar ?? ''} alt={`${currentCandidate.candidateName}'s avatar`} />
            </div>
              {currentCandidate.candidateName} ({currentCandidate.username})<br/>
              Location: {currentCandidate.location}<br/>
              Email: <a href={`mailto:${currentCandidate.email}`}>{currentCandidate.email}</a><br/>
              Company: {currentCandidate.company}<br/>
              GitHub: {currentCandidate.html_url}<br/>
            </div>
          </article>
          {onSavedCandidatesList ? (
            <article className="icons">
              <ImCross
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  removeFromStorage?.(
                    e,
                    onSavedCandidatesList,
                    currentCandidate.candidateName
                  )
                }
              />
            </article>
          ) : (
            <article className="icons">
              <CgPlayListAdd
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={() => addToSavedCandidates?.()}
              />
            </article>
          )}
        </section>
      ) : (
        <h2>GitHub API error</h2>
      )}
    </>
  );
};

export default CandidateCard;
