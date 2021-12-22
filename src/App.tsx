import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { MovieCard } from "./components/MovieCard";
import { api } from "./services/api";
import { Content } from "./components/Content";
import { SideBar } from "./components/SideBar";
import { MovieProps } from "./models/movies";
import { GenreResponseProps } from "./models/genres";
import "./styles/global.scss";
import "./styles/sidebar.scss";
import "./styles/content.scss";

export function App() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const handleChangeGender = (genre: GenreResponseProps) => {
    setSelectedGenre(genre);
  };

  const handleChangeMovies = (movies: MovieProps[]) => {
    setMovies(movies);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        handleChangeGender={handleChangeGender}
        handleChangeMovies={handleChangeMovies}
      />
      <Content movies={movies} selectedGenre={selectedGenre} />
    </div>
  );
}
