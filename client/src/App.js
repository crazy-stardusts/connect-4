// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Board from './Board';
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

function App() {

  // const [state, setstate] = React.useState({});

  // React.useEffect(() => {
  //   fetch("/api")
  //   .then((res) => res.json())
  //   .then((res) => setstate({data : res.data}))
  // }, []);

  socket.on('connect', () => {
    console.log('Connected to server via socket')
  })

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> { !state.data ? "Loading ..." : state.data }</p>
      </header> */}
      <Board />
    </div>
  );
}

export default App;
