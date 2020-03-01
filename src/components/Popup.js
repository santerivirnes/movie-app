import React from 'react'



function Popup({ selected, closePopup, suggestions}) {
    const suggs = Object.values(suggestions)
    return (
        
        <section className="popup">
            <div className="content">
                <h2>{selected.Title} <span>({ selected.Year})</span></h2>
                <p className="rating">Rating: {selected.imdbRating}</p>
                <div className="plot">
                    <img src={selected.Poster} />
                    <p>{selected.Plot}</p>
                </div>
                <button className="close" onClick={closePopup}>close</button>
                <div className="suggestions">
                {suggs.map(suggestion => (
                    <div className="suggestion" key={suggestion.imdbID}>
                    <img src={suggestion.Poster}/>
                    <h3>{suggestion.Title}</h3>    
                    </div>
                ))}
                </div>
            </div>
            
        </section>
    )
}

export default Popup
