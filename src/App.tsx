import { useState } from "react";
import "./App.css";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div style={{ margin: 0, padding: 0 }}>
        <Header />
        <Container sx={{ mt: 0, p: 0, width: "100%" }}>
          <Outlet />
        </Container>
      </div>
    </>
  );
}

export default App;
