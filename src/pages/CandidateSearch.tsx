import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    avatar_url: "",
    name: "",
    login: "",
    location: "",
    email: "",
    company: "",
    html_url: "",
  });

  // const addToSavedCandidateList = () => {};

  useEffect(() => {
    const getRandomCandidate = async () => {
      try {
        // Fetch a random batch of users
        const usersBatch = await searchGithub();
        if (usersBatch.length > 0) {
          // Fetch detailed information for the first user in the batch
          console.log("GOT HERE", usersBatch);
          const userDetails = await searchGithubUser(usersBatch[0].login);
          setCurrentCandidate(userDetails); // Update the state with the candidate details
        }
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    getRandomCandidate(); // Call the function to fetch data on mount
  }, []); // Empty dependency array ensures this runs only once when the component

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
