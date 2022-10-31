
import { useState } from "react"

export default function SearchArea() 
{
    const [search, setSearch] = useState('')

    return (
        <div>
            <form className="search-area" onSubmit={handleGuess}>
                <label>
                    <input
                    type="text"
                    id="search"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    autoComplete="off"
                    />
                </label>
            </form>
        </div>
    )
}

/*

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

*/