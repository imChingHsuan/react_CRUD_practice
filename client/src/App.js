import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    setMovieList([...movieList, { movieName: movieName, movieReview: review }]);
  };

  const deleteReview = (movieId) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieId}`);
  };

  const updateReview = (movieId) => {
    Axios.put(`http://localhost:3001/api/update/${movieId}`, {
      newReview: newReview,
    });
  };

  return (
    <div className="App">
      <div className="form">
        <label>Movie name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
          placeholder="enter a movie name"
        ></input>
        <label>Movie review:</label>
        <input
          type="text"
          name="movieReview"
          onChange={(e) => {
            setReview(e.target.value);
          }}
          placeholder="enter a movie review"
        ></input>
        <button onClick={submitReview}>submit</button>
      </div>
      {movieList.map((val) => {
        return (
          <div className="card">
            <div className="card-wrap">
              <h2>
                Movie Name:
                <br />
                {val.movieName}
              </h2>
              <p>
                Movie Review:
                <br />
                {val.movieReview}
              </p>
              <div className="delete-box">
                <button
                  className="delete-btn"
                  onClick={() => {
                    deleteReview(val.id);
                  }}
                >
                  DELETE
                </button>
              </div>
              <div className="update-box">
                <button
                  className="update-btn"
                  onClick={() => {
                    updateReview(val.id);
                  }}
                >
                  UPDATE
                </button>
                <input
                  type="text"
                  className="update-input"
                  onChange={(e) => {
                    setNewReview(e.target.value);
                  }}
                ></input>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
