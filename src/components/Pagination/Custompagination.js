import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
// import { createTheme } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";

import React from "react";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const Custompagination = ({setPage ,numOfPages}) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
    
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          hideNextButton
          hidePrevButton
          color="primary"
          sx={{fontWeight: 'bold'}}
          
        />
      </ThemeProvider>
    </div>
  );
};

export default Custompagination;
