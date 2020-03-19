import React, { useState } from "react";

export default function UpdateMovie(props) {
    const [movie, setMovie] = useState({
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars: [],
    })

    const handleChange = (event) => {
        setMovie({
            ...movie
            [event.target.name]: event.target.value
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
            </form>
        </div>
    )
}