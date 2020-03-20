import React, { useState, useEffect } from "react";
import axios from "axios";


const initialItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

export default function UpdateMovie(props) {
    const [movie, setMovie] = useState(initialItem);
    console.log(props);

    useEffect(() => {
        const itemToUpdate = props.movieList.find(item => {
            return `${item.id}` === props.match.params.id;
        });

        console.log("itemToUpdate", itemToUpdate);
        if (itemToUpdate) {
            setMovie(itemToUpdate);
        }
    }, [props.items, props.match.params.id]);

    const handleChange = (event) => {
        event.persist();
        // This was for numbers. Realized "stars" meant celebrities and
        //  not movie ratings
        // let value = event.target.value;
        // if (event.target.name === "stars") {
        //     value = parseInt(value, 10);
        // }

        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = event => {
        event.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                console.log(res);
                props.getMovieList();
                props.history.push(`/`);               
            })
            .catch(err => {
                console.log(err)
                throw(err)
            })
    }

    return (
        <div>
            <h2> Update Movie </h2>
            <form>
                <input
                    type="text"
                    name="title"
                    placeholder="New Title"
                    value={movie.title}
                    onChange={handleChange} />
                
                <input
                    type="text"
                    name="director"
                    placeholder="New Director"
                    value={movie.director}
                    onChange={handleChange} />

                <input
                    type="text"
                    name="metascore"
                    placeholder="New Metascore"
                    value={movie.metascore}
                    onChange={handleChange} />
                
                <input
                    type="text"
                    name="stars"
                    placeholder="New Celebrity"
                    value={movie.stars}
                    onChange={handleChange} />

                <button className="update-button" type="submit" onClick={handleSubmit}>
                    Update
                </button>
            </form>
        </div>
    )
}