import React, { useEffect } from "react";
import axios from "axios";
import { Chip } from "@mui/material";
// import { Chip } from "@material-ui/core";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {

    const handleAdd=(genre)=>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g)=>g.id!==genre.id))
        setPage(1)
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };


  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=95e641282c5247f0e9731d87cb5bca3d&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
     
    
    // return () => {
    //    setGenres({});
    //  };
     // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            color="#f9fbe7"
            key={genre.id}
            onDelete={()=>handleRemove(genre)}
            clickable
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            key={genre.id}
            clickable
            onClick={()=>handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
