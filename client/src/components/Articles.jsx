import React from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import ArticleItem from "./ArticleItem";

const Articles = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const group = searchParams.get("group");

    const onClickHandler = (e) => {
        e.preventDefault();
        setSearchParams(group);
    }

    return (
        <div>
            <header>
                <button onClick={onClickHandler} value='athlete'>운동</button>
                <button onClick={onClickHandler} value='food'>음식</button>
                <button onClick={onClickHandler} value='traffic'>교통</button>
            </header>
            <main>
                <ul>
                    <ArticleItem articleGroup={'athelete'} articleId={'1'}/>
                    <ArticleItem articleGroup={'food'} articleId={'2'}/>
                    <ArticleItem articleGroup={'미정'} articleId={'3'}/>
                </ul>
                <Outlet />
            </main>
        </div>
    );
};

export default Articles;