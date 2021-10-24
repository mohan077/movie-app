import React from "react";
import styled from "styled-components";
// css using styled components

const MovieContainer = styled.div`
  display: flex;
  box-shadow: 0 4px 5px 0 black;
  padding: 10px;
  width: 280px; //
  cursor: pointer;
  flex-direction: column;
`;

const CoverImage = styled.img`
  height: 362px;
  object-fit: cover;
  width: 280px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  object-fit: cover;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  text-transform: capitalize;
`;

const MovieComponent = (props) => {
  console.log("props in movie compo-- >", props.movie);

  const { Title, Year, imdbID, Type, Poster } = props.movie;
  return (
    <MovieContainer onClick={() => props.onMovieSelect(imdbID)}>
      <CoverImage src={Poster} />
      <MovieName>{Title}</MovieName>
      <InfoColumn>
        <MovieInfo>{Year}</MovieInfo>
        <MovieInfo>{Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};

export default MovieComponent;
