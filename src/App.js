import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MovieModal from './MovieModal';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";

  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get(`${API_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
        },
      });
      setCategories(response.data.genres);
    }
    fetchCategories();
  }, []);

  const fetchMoviesByCategory = async (category) => {
    const type = category === 'Todas' ? 'discover' : 'discover';
    const response = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: category,
      },
    });
    setMovies(response.data.results);
  };

  const fetchMovieTrailer = async (id) => {
    const response = await axios.get(`${API_URL}/movie/${id}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    const trailerKey = response.data.results[0]?.key;
    setTrailer(trailerKey);
  };

  useEffect(() => {
    fetchMoviesByCategory(selectedCategory);
  }, [selectedCategory]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    fetchMovieTrailer(movie.id);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setTrailer(null);
  };

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">Pagina pelicula IU Digital</h2>

      <div className="category-navigation">
        <button
          className={`category-button ${selectedCategory === 'Todas' ? 'selected' : ''}`}
          onClick={() => setSelectedCategory('Todas')}
        >
          Todas
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h4 className="card-title">{movie.title}</h4>
                  <p className="card-text">{movie.overview}</p>
                  <button onClick={() => openModal(movie)} className="btn btn-primary">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          trailerKey={trailer}
          isOpen={selectedMovie !== null}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
