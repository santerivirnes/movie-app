import React, {useState} from 'react';
import Search from './components/Search';
import axios from 'axios';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    suggestions: {}
  })
  const apiurl = "http://www.omdbapi.com/?apikey=33980cae"
  const pyapiurl = "http://localhost:5000/movies"

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;
        console.log(data)
        setState(prevState => {
          return {...prevState, results: results }
        })
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return {...prevState, s: s}
    });

  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;
      console.log(id)
      setState(prevState => {
        return {...prevState, selected: result}
      });
    });

    axios.post(pyapiurl,{
      id: id
    }).then(({ data }) => {
      let suggestions = data;
      console.log("suggestions")
      console.log(suggestions)

      setState(prevState => {
        return {...prevState, suggestions: Array.from(suggestions)}
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return {...prevState, selected: {}}
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search}/>
        <Results results={state.results} openPopup={openPopup}/>

        {(typeof state.selected.Title != "undefined") ? <Popup suggestions={state.suggestions}  selected={state.selected} closePopup={closePopup} /> : false }
      </main>
    </div>
  );
}

export default App;
