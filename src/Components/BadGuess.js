
export default function BadGuess({championsQuote, badChampion, guessAmount}) {
  return (
    <div>
        <h2>Wrong Guesses</h2>
        <p>Guess Amount:{guessAmount}</p>
      <p>
        {badChampion && badChampion.map(champion => <em key={champion}>{champion}, </em>)}
      </p>
      {guessAmount > 5 && <p>Hint: Champions title is <b>{championsQuote}</b></p>}
    </div>
  )
}
