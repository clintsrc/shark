import { useState, useEffect } from "react";
import { searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    avatar: "",
    candidateName: "",
    username: "",
    location: "",
    email: "",
    company: "",
    html_url: "",
  });

  // const addToSavedCandidateList = () => {};

  const findGitHubUser = async () => {
    const rawData = await searchGithubUser("clintsrc");
    const mappedData: Candidate = {
      avatar: rawData.avatar_url || null,
      candidateName: rawData.name || null,
      username: rawData.login || null,
      location: rawData.location || null,
      email: rawData.email || null,
      company: rawData.company || null,
      html_url: rawData.html_url || null,
    };

    if (mappedData) {
      setCurrentCandidate(mappedData);
    }
    console.log("Mapped and set currentCandidate:", mappedData);
  };

  useEffect(() => {
    findGitHubUser(); // Triggered when the component mounts
  }, []); // Empty dependency array ensures this runs once when the component mounts.

  return (
    <>
      <h1>Candidate Search</h1>
      <section id="searchSection"></section>{" "}
      {/* This section no longer relies on onLoad */}
      <CandidateCard currentCandidate={currentCandidate} />
    </>
  );
};

export default CandidateSearch;
