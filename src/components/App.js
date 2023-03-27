import React, { useEffect, useState } from "react";
import fetchFlagLocation from "../lib/fetchFlagLocation";
import fetchFlag from "../lib/fetchFlag";
import LetterList from "./LetterList";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState("");

  useEffect(() => {
    const captureTheFlag = async () => {
      try {
        // Decode the url to complete step 2 with fetchFlagLocation
        const flagLocation = await fetchFlagLocation();
        // Retrieve the flag
        const retrievedFlag = await fetchFlag(flagLocation);
        // Make sure the flag meets the requirement of a single word
        if (retrievedFlag.split(" ").length === 1) {
          setFlag(retrievedFlag);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };

    captureTheFlag();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {error ? (
        <p>{error.message || "An error has occurred"}</p>
      ) : loading ? (
        "Loading..."
      ) : (
        <LetterList letters={flag} />
      )}
    </div>
  );
}
