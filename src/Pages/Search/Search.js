// import {
//   Button,
//   createTheme,
//   Tab,
//   Tabs,
//   TextField,
//   ThemeProvider,
// } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Custompagination from "../../components/Pagination/Custompagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from "@mui/material";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=95e641282c5247f0e9731d87cb5bca3d&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      // https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=95e641282c5247f0e9731d87cb5bca3d&language=en-US&query=${searchText}&page=${page}&include_adult=false
      setContent(data.results);
      setNumOfPages(data.total_pages);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            // sx={{fontWeight: 'bold', color:'white'}}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab label="Search Movies" style={{ width: "50%", fontWeight:"bold" }} />
          <Tab label="Search tv series" style={{ width: "50%" ,fontWeight:"bold"}} />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <Custompagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
