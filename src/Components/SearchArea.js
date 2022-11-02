
import { useState } from "react"

import DataList from "./DataList"
export default function SearchArea({handleGuess, data, isPending, error}) 
{
    const [search,setSearch] = useState('')

    const SubmitGuess = (e) => {
      e.preventDefault();
      handleGuess();
    }
//ata,isPending,error, search, setChampion}
    return(
    <div>
       <form className='search-area' onSubmit={() => SubmitGuess()}>
            <label>
              <input 
              type='text'
              id='search'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              autoComplete="off"></input>
            </label>
              <DataList 
                data={data}
                isPending={isPending}
                error={error}
                search={search}
                setChampion={setSearch}
                />
            <button>Guess !</button>
        </form> 
    </div>
    )
    // const [search, setSearch] = useState('')
    // return (
    //         <div>
    //         <form className='search-area' onSubmit={handleGuess}>
    //             <label>
    //             <input 
    //             type='text'
    //             id='search'
    //             onChange={(e) => setSearch(e.target.value)}
    //             value={search}
    //             autoComplete="off"></input>
    //             </label>
    //             {error && <p>{error}</p>}
    //             {isPending && <p>Loading...</p>}
    //             {srcChampion && <div className='display-champions'>
    //             {newdata && 
    //             newdata.map((champion) => (
    //                 <em 
    //                 key={champion.name} 
    //                 onClick={() => setSearch(champion.name)}>
    //                     {champion.name}
    //                 </em>
    //             ))}</div>}

    //             <button>Guess !</button>
    //         </form>
    //     </div>
    
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