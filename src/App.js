import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFact, setCurrentFact] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://dog-api.kinduff.com/api/facts"
        );
        console.log("API Response:", response.data);
        setData(response.data.facts || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(`Error fetching data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setCurrentFact(data[randomIndex]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dog Facts</h1>
        <p>Discover interesting facts about dogs!</p>
        <img
          src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV80X3Bob3RvX29mX2FfaGFwcHlfZG9nX3dlYXJpbmdfc3VuZ2xhc3Nlc19jaGVlcl80ZjNjZjM0MS1jMDcyLTRlNTMtODQ2NS00NzM5NWZlNjc0OTFfMS5qcGc.jpg"
          alt="Dog"
          className="App-image"
        />
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <button onClick={handleButtonClick} className="fact-button">
              Show Random Fact
            </button>
            {currentFact && <Card title="Random Fact" body={currentFact} />}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
