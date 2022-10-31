import { useEffect, useState } from 'react';
import './App.css';
import { useFetch } from './hooks/useFetch';

import BadGuess from './Components/BadGuess';

function App() {
  const {data,isPending,error} = useFetch('http://localhost:3000/champion')
  const [srcChampion, setChampion] = useState('')
  const [newdata, setData] = useState([])
  const [randomChampion, setRandomChampion] = useState(null)
  const [isWinner, setIsWinner] = useState(false)
  const [badChampion, setbadChampion] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)

  const createNewGame = () => {
    setbadChampion([]);
    setIsWinner(false);
    setRandomChampion(getRandomChampion());
    setChampion('');
    console.log('newgame', badChampion,isWinner,randomChampion,srcChampion)
  }
  const getRandomChampion = () => {
    const length = data.length;
    return Math.floor(Math.random() * length);
  }
  useEffect(() => {
    if(firstLoad && data)
    {
      setFirstLoad(false)
      createNewGame()
    }
  }, [firstLoad,data])
  useEffect(() => {
    if(srcChampion === '')
    { 
      setData([]);
    }
    if(data && srcChampion)
    {
      setData(data.filter((champion) => ((champion.name).toLowerCase()).includes(srcChampion.toLowerCase())))
    }
  }, [data,srcChampion])

  const handleGuess = (e) => {
    e.preventDefault();
    if(srcChampion === data[randomChampion].name)
    {
      setIsWinner(true)
      setTimeout(() => createNewGame(), 2000);
    }
    else
    {
      setbadChampion((prevchampion) => {
        return [...prevchampion, srcChampion]
      })
    }
  }
  return (
    <div className="App">
      <h1>Todays Abillty Quote:</h1>
      {randomChampion && <h2>{data[randomChampion].quote}</h2>}
            <h3>Search bar</h3>
        <form className='search-area' onSubmit={handleGuess}>
            <label>
              <input 
              type='text'
              id='search'
              onChange={(e) => setChampion(e.target.value)}
              value={srcChampion}
              autoComplete="off"></input>
            </label>
            {error && <p>{error}</p>}
            {isPending && <p>Loading...</p>}
            {srcChampion && <div className='display-champions'>
              {newdata && newdata.map((champion) => (
              <em key={champion.name} onClick={() => setChampion(champion.name)}>{champion.name}</em>
            ))}</div>}

            <button>Guess !</button>
        </form>
      {isWinner && <p>Won !</p>}

      <BadGuess badChampion={badChampion}>
        <h2>Wrong Guesses</h2>
      </BadGuess>
    </div>
  );
}

export default App;
