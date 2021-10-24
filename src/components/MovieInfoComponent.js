import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = "e482e9e8";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieInfo = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: black;
  margin: 4px 0;
  overflow: hidden;
  text-transform: capitalize;

  & span {
    opacity: 0.5;
  }
`;

const Close = styled.span`
font-size:16px; 
font-weight:600;
cursor: pointer;
height:fit-content;
padding: 8px;
border-radius: 50%;
background:lightgray; 
color:black;

`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 352px;
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => {
        setMovieInfo(response.data);
      });
  }, [selectedMovie]);
  return (
    <Container>
      <CoverImage src={movieInfo?.Poster}></CoverImage>

      <InfoColumn>
        <MovieName>
          {movieInfo?.Type}: {movieInfo?.Title}
        </MovieName>
        <MovieInfo>
          Language: <span>{movieInfo?.Language}</span>
        </MovieInfo>
        <MovieInfo>
          Rated: <span>{movieInfo?.Rated}</span>
        </MovieInfo>
        <MovieInfo>
          imdb Released: <span>{movieInfo?.Released}</span>
        </MovieInfo>
        <MovieInfo>
          Runtime: <span>{movieInfo?.Runtime}</span>
        </MovieInfo>
        <MovieInfo>
          Genre: <span>{movieInfo?.Genre}</span>
        </MovieInfo>
        <MovieInfo>
          Director: <span>{movieInfo?.Director}</span>
        </MovieInfo>
        <MovieInfo>
          Actors: <span>{movieInfo?.Actors}</span>
        </MovieInfo>
        <MovieInfo>
          Plot: <span>{movieInfo?.Plot}</span>
        </MovieInfo>
      </InfoColumn>

      <Close onClick={() =>props.onMovieSelect()}>X</Close>
    </Container>
  );
};

export default MovieInfoComponent;
