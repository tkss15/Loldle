
export default function DataList({data,isPending,error, search, setChampion}) 
{
  return (
    <div>
         {error && <p>{error}</p>}
         {isPending && <p>Loading...</p>}
         {search && 
            <div className='display-champions'>
              {data && 
              data
              .filter((champion) => {
                const lowerCaseName = (champion.name).toLowerCase();
                return lowerCaseName.includes(search.toLowerCase());
              })
              .map((champion) => (
                <em 
                key={champion.name} 
                onClick={() => setChampion(champion.name)}>
                    {champion.name}
                </em>
            ))}
            </div>
        }
    </div>
  )
}
