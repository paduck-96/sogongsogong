import React, {useState, useEffect} from 'react';
import {Link, useParams } from 'react-router-dom';

const Articles = () => {
    // const {articlegroup} = useParams();
    // const [groupArticles, setGroupArticles] = useState([]);
    // useEffect(()=>{
    //     fetch(`http://localhost/articles/${articlegroup}`,{
    //         headers:{
    //             "Content-Type":"application/json",
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(res => {setGroupArticles(res.data)});
    //         }, [setGroupArticles, articlegroup])
    //         if(groupArticles ===`${articlegroup} 게시글 없음`){
    //             return (
    //                 <div>
    //                     <main>
    //                         <ul>
    //                             <li>
    //                                 <h2>{groupArticles}</h2>
    //                             </li>
    //                         </ul>
    //                     </main>
    //                 </div>
    //             )
    //         }
    //         const groupList = groupArticles.map(article=>
    //             (
    //                     <li key={article.articleId}>
    //                         <h2>
    //                             <Link to={`/article/${article.articleId}`}>
    //                                 {article.articleTitle}
    //                             </Link>
    //                         </h2>
    //                         <hr/>
    //                     </li>
    //             )
    //     )
    //         return(
    //                 <main>
    //                     <div>
    //                         <ul>
    //                             {groupList}
    //                         </ul>
    //                     </div>
    //                 </main>
    //         )
    const { articlegroup } = useParams();
  const [groupArticles, setGroupArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/articles/${articlegroup}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setGroupArticles(res.data));
  }, [articlegroup]);

  if (groupArticles.length===1) {
    return (
      <div>
        <main>
          <ul>
            <li>
              <h2>{`${articlegroup} 게시글 없음`}</h2>
            </li>
          </ul>
        </main>
      </div>
    );
  }

  const groupList = groupArticles.map((article) => (
    <li key={article.articleId}>
      <h2>
        <Link to={`/article/${article.articleId}`}>{article.articleTitle}</Link>
      </h2>
      <p>{`작성자: ${article.User.userName}`}</p>
      <hr />
    </li>
  ));

  return (
    <main>
      <div>
        <ul>{groupList}</ul>
      </div>
    </main>
  );
};

export default Articles;