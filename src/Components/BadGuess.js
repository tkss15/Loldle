
export default function BadGuess({badChampion}) {
  return (
    <div>
        <h2>Wrong Guesses</h2>
      <p>
        {badChampion && badChampion.map(champion => <em key={champion}>{champion}, </em>)}
      </p>
    </div>
  )
}
