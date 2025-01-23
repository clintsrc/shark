import type React from "react";
import type Candidate from "../interfaces/Candidate.interface";
import { ImCross } from "react-icons/im"; // import { IoRemoveCircleSharp } from "react-icons/io5"; | <IoRemoveCircleSharp />
import { CgPlayListAdd } from "react-icons/cg"; // import { MdAddCircle } from "react-icons/md"; | <MdAddCircle />

interface CandidateCardProps {
  currentCandidate: Candidate;
  addToSavedCandidateList?: (() => void) | null;
  onSavedCandidatesList?: boolean | null;
  getRandomCandidate?: (() => void) | null;
  removeFromStorage?:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnCandidateList: boolean | null | undefined,
        candidatName: string | null
      ) => void)
    | null;
}

const CandidateCard = ({
  currentCandidate,
  addToSavedCandidateList,
  onSavedCandidatesList,
  getRandomCandidate,
  removeFromStorage,
}: CandidateCardProps) => {
  return (
    <>
      {currentCandidate?.login ? (
        <section className="currentCandidate">
          <article className="details">
            <div>
              <div className="image-container">
                <img
                  src={currentCandidate.avatar_url ?? ""}
                  alt={`${currentCandidate.name}'s avatar`}
                />
              </div>
              {currentCandidate.name} ({currentCandidate.login})<br />
              Location: {currentCandidate.location}
              <br />
              Email:{" "}
              <a href={`mailto:${currentCandidate.email}`}>
                {currentCandidate.email}
              </a>
              <br />
              Company: {currentCandidate.company}
              <br />
              GitHub: {currentCandidate.html_url}
              <br />
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
                    currentCandidate.name
                  )
                }
              />
            </article>
          ) : (
            <article className="icons">
              <div>TODO</div>
              <CgPlayListAdd
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={() => addToSavedCandidateList?.()}
              />
              <ImCross
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={() => getRandomCandidate?.()}
              />
            </article>
          )}
        </section>
      ) : (
        <h2>Finding a candidate...</h2>
      )}
    </>
  );
};

export default CandidateCard;
