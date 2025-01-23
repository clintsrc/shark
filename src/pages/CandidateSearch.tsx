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

  const addToSavedCandidateList = () => {
    alert("got here");
  };

  // Define getRandomCandidate outside of useEffect for reusability
  const getRandomCandidate = async () => {
    try {
      // Fetch a random batch of users
      const usersBatch: { login: string }[] = await searchGithub();
      if (Array.isArray(usersBatch) && usersBatch.length > 0) {
        // Fetch detailed information for the first user in the batch
        console.log("GOT HERE", usersBatch);
        const userDetails = await searchGithubUser(usersBatch[0].login);
        setCurrentCandidate(userDetails); // Update the state with the candidate details
      }
    } catch (error) {
      console.error("Error fetching candidate data:", error);
    }
  };

  // Fetch the first candidate when the component mounts
  useEffect(() => {
    getRandomCandidate().catch((error) =>
      console.error("Error in getRandomCandidate:", error)
    ); // Call the function to fetch data on mount
  }, []); // Empty dependency array ensures this runs only once when the component

  return (
    <>
      <h1>Candidate Search</h1>
      <section id="searchSection"></section>{" "}
      {/* This section no longer relies on onLoad */}
      <CandidateCard 
      currentCandidate={currentCandidate} 
      addToSavedCandidateList={addToSavedCandidateList}
      getRandomCandidate={getRandomCandidate}
      />
    </>
  );
};

export default CandidateSearch;
