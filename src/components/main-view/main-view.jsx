import React from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: '60ec914057305332ff582a4b',
          title: 'Inception',
          description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. -IMDb',
          director: [
            'Christopher Nolan',
          ],
          actors: [
            'Leonardo DiCaprio',
            'Joseph Gordon-Levitt',
            'Elliot Page',
          ],
          genre: [
            'Adventure',
          ],
          image_url: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9c592dee1ac813fcaf8c93557a487557_675ff711-4f45-4a98-95a5-0f97302b2126_480x.progressive.jpg?v=1573618688',
          featured: true,
        },
        {
          _id: '60ec918557305332ff582a52',
          title: 'Hidden Figures',
          description: 'The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program -IMDb',
          director: [
            'Theodore Melfi',
          ],
          actors: [
            'Taraji P. Henson',
            'Octavia Spencer',
            'Janelle Monáe',
          ],
          genre: [
            'Adventure',
          ],
          image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Bild_21_-_Verbot_der_%C3%9Cberschreitung_bestimmter_Fahrgeschwindigkeiten_-_30_km%2C_StVO_1953.svg/1200px-Bild_21_-_Verbot_der_%C3%9Cberschreitung_bestimmter_Fahrgeschwindigkeiten_-_30_km%2C_StVO_1953.svg.png',
          featured: false,
        },
        {
          _id: '60ec917c57305332ff582a51',
          title: 'Toni Erdmann',
          description: 'A practical joking father tries to reconnect with his hard working daughter by creating an outrageous alter ego and posing as her CEO\'s life coach. -IMDb',
          director: [
            'Maren Ade',
          ],
          actors: [
            'Sandra Hüller',
            'Peter Simonischek',
            'Michael Wittborn',
          ],
          genre: [
            'Drama',
          ],
          image_url: 'https://www.filmposter-archiv.de/filmplakat/2016/toni-erdmann.jpg',
          featured: false,
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) {
      return (
        <MovieView
          movie={selectedMovie}
          onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}
        />
      );
    } if (movies.length === 0) {
      return (
        <div className="main-view"> The list is empty!</div>
      );
    } return (
      <div className="main-view">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movieData={movie}
            onMovieClick={() => { this.setSelectedMovie(movie); }}
          />
        ))}
      </div>
    );
  }
}

export default MainView;
