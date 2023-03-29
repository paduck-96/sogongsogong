import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
            fetch('http://localhost/articles',{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            .then(res=>res.json())
            .then(res => {
                setArticles(res.article);
                setCategories(res.category);
            });
                }, [setArticles, setCategories])
                if(categories === "카테고리 없음"){
                    if(articles === "게시글 없음"){
                        return (
                                <main>
                                    <ul>
                                        <li>
                                            <h2>{articles}</h2>
                                        </li>
                                    </ul>
                                </main>
                        )
                    }else{
                    const articleList = articles.map(article=>
                            (
                                    <li key={article.articleId}>
                                        <h2>
                                            <Link to={`/article/${article.articleId}`}>
                                                {article.articleTitle}
                                            </Link>
                                        </h2>
                                        <hr/>
                                    </li>
                            )
                    )
                        return(
                                <main>
                                    <div>
                                        <ul>
                                            {articleList}
                                        </ul>
                                    </div>
                                </main>
                        )
                    }
                }else{
                    const articleList = articles.map(article=>
                        (
                                <li key={article.articleId}>
                                    <h2>
                                        <Link to={`/article/${article.articleId}`}>
                                            {article.articleTitle}
                                        </Link>
                                    </h2>
                                    <hr/>
                                </li>
                        )
                )
                const categoryList = categories.map(category=>(
                    <button key={categories.indexOf(category)}>
                        <Link to={`/articles/${category}`}>
                            {category}
                        </Link>
                    </button>
                ))
                    return(
                        <>
                        <header>
                            <div>
                                {categoryList}
                            </div>
                        </header>
                            <main>
                                <div>
                                    <ul>
                                        {articleList}
                                    </ul>
                                </div>
                            </main>
                        </>
                    )
                }
                }

export default Articles;