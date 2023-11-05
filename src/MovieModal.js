import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function MovieModal({ movie, trailerKey, isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detalles de la Película"
      className="movie-modal" 
      overlayClassName="movie-overlay" 
    >
      <div className="movie-details">
        <div className="movie-content">
          <div className="movie-media">
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
            />
            <h2>{movie.title}</h2>
          </div>
          {trailerKey && (
            <iframe
              title="Trailer"
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allowFullScreen
            />
          )}
        </div>
        <button onClick={onRequestClose} class="btn btn-primary">Cerrar</button>
      </div>
    </Modal>
  );
}

export default MovieModal;
