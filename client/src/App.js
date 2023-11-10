import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Post from "./Pages/Post";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addpost from "./Pages/Addpost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Post/>} />
          <Route path="/addpost" element={<Addpost/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
