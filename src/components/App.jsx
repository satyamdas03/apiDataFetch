import React, { useState } from "react";
import axios from "axios";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

function App() {
  const [apiUrl, setApiUrl] = useState("");
  const [randomJSON, setJSON] = useState("");
  const [isLoading, setLoading] = useState(false);

  function fetchAPI() {
    setLoading(true);
    axios
      .get(apiUrl)
      .then(({ data }) => {
        const formattedJSON = prettier.format(JSON.stringify(data), {
          parser: "json",
          plugins: [parserBabel],
          printWidth: 20,
          tabWidth: 2,
          trailingComma: "none",
          bracketSpacing: true
        });
        setJSON(formattedJSON);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <div className="container">
        <h1>FETCH API DATA</h1>
        <input
          type="text"
          placeholder="Enter API URL"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
        <button onClick={fetchAPI}>GET</button>
      </div>
      <div className="textField">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="JSONstyle">
            <pre>{randomJSON}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
//will make further changes to this repo
