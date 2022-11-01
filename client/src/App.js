import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {

  const [state, setstate] = React.useState({});

  React.useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((res) => setstate({data : res.data}))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> { !state.data ? "Loading ..." : state.data }</p>
      </header>
    </div>
  );
}

export default App;
