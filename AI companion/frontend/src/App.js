
import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({ mental: '', emotional: '', spiritual: '' });
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="App">
      <h1>Eliana Méndez ✨</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Objetivo Mental (ej: "Aprender Python"):
          <input 
            type="text" 
            value={inputs.mental} 
            onChange={(e) => setInputs({...inputs, mental: e.target.value})} 
          />
        </label>
        <label>
          Estado Emocional (ej: "Me siento ansioso"):
          <input 
            type="text" 
            value={inputs.emotional} 
            onChange={(e) => setInputs({...inputs, emotional: e.target.value})} 
          />
        </label>
        <label>
          Objetivo Espiritual (ej: "Meditar más"):
          <input 
            type="text" 
            value={inputs.spiritual} 
            onChange={(e) => setInputs({...inputs, spiritual: e.target.value})} 
          />
        </label>
        <button type="submit">Generar Plan</button>
      </form>

      {results && (
        <div className="results">
          <h2>Mental 🧠</h2>
          <p>{results.mental}</p>
          <h2>Emocional ❤️</h2>
          <p>{results.emotional}</p>
          <h2>Espiritual 🌟</h2>
          <p>{results.spiritual}</p>
        </div>
      )}
    </div>
  );
}

export default App;