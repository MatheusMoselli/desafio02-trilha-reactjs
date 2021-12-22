import { useEffect, useState } from "react";
import { GenreResponseProps } from "../models/genres";
import { MovieProps } from "../models/movies";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
  handleChangeMovies: (movies: MovieProps[]) => void;
  handleChangeGender: (genre: GenreResponseProps) => void;
}

export function SideBar({
  handleChangeMovies,
  handleChangeGender,
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });

    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        handleChangeMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        handleChangeGender(response.data);
      });
  }, [selectedGenreId]);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => setSelectedGenreId(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
