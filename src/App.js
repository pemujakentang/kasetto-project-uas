import React, { useEffect } from 'react';
import Login from './components/Login';
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
import Main from './components/Spotify';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [{ token }, dispatch] = useStateProvider()
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      // console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token })
    }
  }, [token, dispatch]);
  return (
    <div className="App">
      <BrowserRouter>

        <div>
          {
            token ? <Main /> : <Login />
          }
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;