import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Articles from "./components/Articles";
import GroupAritlces from "./components/GroupArticles";
import Article from "./components/Article";
import Login from "./components/Login";
import Register from "./components/Register";
import Write from "./components/Write";
import Update from "./components/Update";
import NotFound from "./components/404";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/articles' element={<Articles />}/>
            <Route path='/articles/:articlegroup' element={<GroupAritlces />} />
            <Route path='/article' element={<Write />} />
            <Route path='/article/:articleId' element={<Article />} />
            <Route path='/article/:articleId/update' element={<Update />} />
          <Route path='*' element={<NotFound />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  // </React.StrictMode>
);