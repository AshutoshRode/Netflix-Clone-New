import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../component/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../component/TitleCards/TitleCards';
import Footer from '../../component/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [heroData, setHeroData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjQ1M2QxNWRmMDgxZTlhMWMyMDQyNTU5NzUwOTRkMyIsIm5iZiI6MTcwOTIxNTcwOC4yMjEsInN1YiI6IjY1ZTA4ZmRjMzkxYjljMDE4NjgyYzlmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DxaSyPPdQMk1P46gCA4HcTYyWfsBDO-ahZjh6NPF8qk',
    },
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?region=IN&page=1', options)
      .then((res) => res.json())
      .then((res) => {
        const randomMovie = res.results[Math.floor(Math.random() * res.results.length)];
        setHeroData(randomMovie);

        fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?language=en-US`, options)
          .then((res) => res.json())
          .then((res) => {
            const trailer = res.results.find((video) => video.type === 'Trailer');
            setTrailerKey(trailer ? trailer.key : null);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='home'>
      <Navbar />
      {heroData && (
        <div className="hero">
          <img
            src={`https://image.tmdb.org/t/p/original${heroData.backdrop_path}`}
            alt={heroData.title}
            className='banner-img'
          />
          <div className="hero-caption">
            <img
              src={`https://image.tmdb.org/t/p/original${heroData.poster_path}`}
              alt={heroData.title}
              className='caption-img'
            />
            <p>{heroData.overview}</p>
            <div className="hero-btns">
              <button
                className='btn'
                onClick={() => {
                  if (trailerKey) {
                    navigate(`/player/${heroData.id}`);
                  } else {
                    alert('Trailer not available!');
                  }
                }}
              >
                <img src={play_icon} alt="Play Icon" />
                Play
              </button>
              <button className='btn dark-btn'>
                <img src={info_icon} alt="Info Icon" />
                More Info
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Picks for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
