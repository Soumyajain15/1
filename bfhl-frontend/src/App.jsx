import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
];

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const json = JSON.parse(input);
      const res = await axios.post('http://localhost:3001/bfhl', json);
      setResponse(res.data);
      setError('');
    } catch (e) {
      setError('Invalid JSON or server error');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>BFHL Challenge</h2>
      <textarea
        rows="6"
        cols="60"
        placeholder='Enter JSON e.g. {"data": ["A", "1", "c"]}'
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <Select
            options={options}
            isMulti
            onChange={setSelected}
            placeholder="Select response fields"
          />
          <div style={{ marginTop: 10 }}>
            {selected.map(opt => (
              <div key={opt.value}>
                <strong>{opt.label}:</strong> {JSON.stringify(response[opt.value])}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
