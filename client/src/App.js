import React from 'react';

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
import { useEffect } from 'react';

const App = () => {
  const state = {
    token:null,
    exDate:null,
    userId:null,
  }
  useEffect(() => {
    state.token = localStorage.getItem("token");
    state.exDate = localStorage.getItem("expierDate");
    state.userId = localStorage.getItem("userId");
    if(!state.exDate || !state.token){
      return;
    }
    if(new Date(state.exDate) <= new Date()){
      localStorage.removeItem('token');
      localStorage.removeItem('expireDate');
      localStorage.removeItem('userId');
    }
    const remainingDate = new Date(state.exDate).getTime()-new Date().getTime();
    autoLogoutHandler(remainingDate);
  })
  const autoLogoutHandler = (ms) => {
    setTimeout(()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('expireDate');
      localStorage.removeItem('userId');
    },ms);
  }
    return (
        <BrowserRouter>
        <div className='mx-auto my-24 max-w-screen-md text-base font-base'>
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
        </div>
      </BrowserRouter>
    );
};

export default App;