import axios from "axios";
import "./Trending.css";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import Custompagination from "../../components/Pagination/Custompagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const fetchtrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=95e641282c5247f0e9731d87cb5bca3d&page=${page}`
    );
    setContent(data.results);
  };
  useEffect(() => {
    fetchtrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
        <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <Custompagination setPage={setPage} numOfPages={10}/>
    </div>
  );
};

export default Trending;
