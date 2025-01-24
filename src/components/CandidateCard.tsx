import type Candidate from "../interfaces/Candidate.interface";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

interface CandidateCardProps {
  currentCandidate: Candidate | null;
  addToSavedCandidateList?: (() => void) | null;
  getRandomCandidate?: (() => void) | null;
}

const CandidateCard = ({
  currentCandidate,
  addToSavedCandidateList,
  getRandomCandidate,
}: CandidateCardProps) => {
  return (
    <>
      {currentCandidate ? (
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
              GitHub:{" "}
              <a
                href={currentCandidate.html_url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentCandidate.html_url ?? "N/A"}
              </a>
              <br />
            </div>
          </article>

          <article className="icons">
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
          </article>
        </section>
      ) : (
        <h2>No more candidates available.</h2>
      )}
    </>
  );
};

export default CandidateCard;
