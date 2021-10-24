import styled from "styled-components";
import axios from "axios";
import "./index.css";
import { useState } from "react";
// all components
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

const API_KEY = "e482e9e8";

//CSS portion using styled components

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: black;
  color: white;
  display: flex;
  padding: 10px;
  box-shadow: 0 3px 6px 0 #555;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AppName = styled.div`
  font-size: 25px;
  font-weight: bold;
  opacity: 0.9;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const MovieIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  width: 50%;
  height: 30px;
  border-radius: 5px;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
  opacity: 0.8;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin: 0 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log("response", response);
    updateMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <>
      <Container>
        <Header>
          <AppName>
            <MovieIcon src="/movie-icon.svg" />
            React Movie App
          </AppName>

          <SearchBox>
            ;<SearchIcon src="/search-icon.svg"></SearchIcon>
            <SearchInput
              placeholder="Search Movie"
              value={searchQuery}
              onChange={onTextChange}
            />
          </SearchBox>
        </Header>

        {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie}  onMovieSelect={onMovieSelect}/>}
        <MovieListContainer>
          {movieList?.length
            ? movieList.map((movie, index) => (
                <MovieComponent
                  movie={movie}
                  key={index}
                  onMovieSelect={onMovieSelect}
                />
              ))
            : "No movie in search"}
        </MovieListContainer>
      </Container>
    </>
  );
}

export default App;
