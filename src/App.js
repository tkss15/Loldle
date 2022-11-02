import { useEffect, useState } from 'react';
import './App.css';
import { useFetch } from './hooks/useFetch';

import BadGuess from './Components/BadGuess';
import DataList from './Components/DataList';
// import SearchArea from './Components/SearchArea';

function App() {
  const {data,isPending,error} = useFetch('http://localhost:3000/champion')
  const [srcChampion, setChampion] = useState('')
  const [newdata, setData] = useState([])
  const [randomChampion, setRandomChampion] = useState({
    name:"",
    quote:"",
    title:""
  })
  const [isWinner, setIsWinner] = useState(false)
  const [badChampion, setbadChampion] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [guesses, setGuesses] = useState(0)

  const createNewGame = () => {
    setData(data);
    setbadChampion([]);
    setIsWinner(false);
    getRandomChampion();
    setChampion('');
    setGuesses(0);
    console.log('newgame', badChampion,isWinner,randomChampion,srcChampion)
  }
  const getRandomChampion = () => {
    const length = data.length;
    const randomNumber = Math.floor(Math.random() * length);
    setRandomChampion(
      {
        name:data[randomNumber].name,
        title:data[randomNumber].title,
        quote:data[randomNumber].quote
      })
  }
  useEffect(() => {
    if(firstLoad && data)
    {
      setFirstLoad(false)
      createNewGame()
    }
  }, [firstLoad,data])

  const handleGuess = (e) => {
    //e.preventDefault();
    if(srcChampion === randomChampion.name)
    {
      setIsWinner(true)
      setTimeout(() => createNewGame(), 2000);
    }
    else
    {
      setGuesses((prevGuess) => prevGuess + 1)
      setbadChampion((prevchampion) => {
        return [...prevchampion, srcChampion]
      })
      setData((prevData) => {
        return prevData.filter((champion) => {
          if(champion.name === srcChampion)
            return false;
          return true;
        })
      })
      console.log(newdata)
    }
  }
  return (
    <div className="App">
      <h1>Todays Abillty Quote:</h1>
      {randomChampion && <h2>{randomChampion.quote}</h2>}
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
              <DataList
              data={newdata}
              isPending={isPending}
              error={error}
              search={srcChampion}
              setChampion={setChampion}/>
            <button>Guess !</button>
        </form>
      {isWinner && <p>Won !</p>}

      {randomChampion && <BadGuess championsQuote={randomChampion.title} badChampion={badChampion} guessAmount={guesses}/>}
    </div>
  );
}

export default App;

