import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteItem = event => {
    event.preventDefault();

    axios
      .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(res => {
        console.log(res);

        console.log("Going to push to new URL")
        this.props.history.push("/");
        console.log("Past push to new URL");
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <button className='save-button' onClick={saveMovie}>
        Save
      </button>

      <button className="delete-button" onClick={deleteItem} >
                Delete
      </button>
      <button onClick={() => {
        history.push(`/update-movie/${movie.id}`)
      }}> Edit </button> 
    </div>
  );
}

export default Movie;
