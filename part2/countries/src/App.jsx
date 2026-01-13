import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
// import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (searchTerm.length === 0) {
      setCountries([]);
      setSelectedCountry(null);
      setMessage('');
      return;
    }

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        const filtered = response.data.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length > 10) {
          setMessage('Too many matches, specify another filter');
          setCountries([]);
          setSelectedCountry(null);
        } else if (filtered.length === 1) {
          setSelectedCountry(filtered[0]);
          setCountries([]);
          setMessage('');
        } else {
          setCountries(filtered);
          setSelectedCountry(null);
          setMessage('');
        }
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setMessage('Error fetching data');
      });
  }, [searchTerm]);

  return (
    <div className="App">
      <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {message && <p>{message}</p>}

      {!message && countries.length > 1 && (
        <CountryList countries={countries} onShow={setSelectedCountry} />
      )}

      {!message && selectedCountry && <CountryDetail country={selectedCountry} />}
    </div>
  );
}

export default App;
