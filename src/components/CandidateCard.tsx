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
            <h2>{currentCandidate.candidateName}</h2>
            <div>
              {currentCandidate.avatar}
              {currentCandidate.candidateName}
              {currentCandidate.username}
              {currentCandidate.location}
              {currentCandidate.email}
              {currentCandidate.company}
              {currentCandidate.html_url}
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
        <h2>test</h2>
      )}
    </>
  );
};

export default CandidateCard;
