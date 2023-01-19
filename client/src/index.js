import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Login from "./components/Login";
import Register from "./components/Register";
import Write from "./components/Write";
import NotFound from "./components/404";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/articles' element={<Articles />}>
              <Route path=':articleGroup/:articleId' element={<Article />} />
            </Route>
            <Route path='/:memberId/write' element={<Write />} />
          </Route>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);