import React, {useState, useEffect} from 'react'
import Home from './pages/home/Home';
import Form from './pages/form/Form';
import Roulette from './pages/roulette/RoulettePage';
import End from './pages/end/End';

function App() {

  const routes = {
    home: 0,
    form: 1,
    roulette: 2,
    end: 3
  }

  const [page, setPage] = useState(1);
  const [prize, setPrize] = useState(0);

  return (
    <>
      {page === routes.home && <Home setPage={setPage} nextPage={routes.form}/>}
      {page === routes.form && <Form setPage={setPage} nextPage={routes.roulette}/>}
      {page === routes.roulette && <Roulette setPage={setPage} nextPage={routes.end} setPrize={setPrize}/>}
      {page === routes.end && <End setPage={setPage} prize={prize}/>}
    </>
  )
}

export default App