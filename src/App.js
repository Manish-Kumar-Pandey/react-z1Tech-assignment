import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

const API_KEY = "479d54d9";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    if (!query) return;
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setSelectedMovie(null);
  };

  const fetchMovieDetails = async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Movie Search App</h1>
      <Form className="d-flex mb-4">
        <Form.Control
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="me-2"
        />
        <Button variant="primary" onClick={searchMovies}>Search</Button>
      </Form>

      {selectedMovie ? (
        <div>
          <Button variant="secondary" onClick={() => setSelectedMovie(null)} className="mb-3">Back</Button>
          <Card>
            <Card.Img variant="top" src={selectedMovie.Poster} />
            <Card.Body>
              <Card.Title>{selectedMovie.Title} ({selectedMovie.Year})</Card.Title>
              <Card.Text><strong>Actors:</strong> {selectedMovie.Actors}</Card.Text>
              <Card.Text><strong>Plot:</strong> {selectedMovie.Plot}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col md={3} key={movie.imdbID} className="mb-4">
              <Card onClick={() => fetchMovieDetails(movie.imdbID)} className="cursor-pointer">
                <Card.Img variant="top" src={movie.Poster} />
                <Card.Body>
                  <Card.Title>{movie.Title} ({movie.Year})</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}