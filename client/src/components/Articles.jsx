import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost/articles');
      const { data } = await response.json();
      const categories = Array.from(
        new Set(data.categories.map((category) => category.categoryName))
      );
      setArticles(data.articles);
      setCategories(categories);
      setReactions(data.reactions);
    };
    fetchData();
  }, []);

  const onClickHandler = async () => {
    const response = await fetch('http://localhost/articles/emojis');
    const emojis = await response.json();
    setEmojis(emojis);
    setModalOpen(true);
  };

  const registerReaction = async () => {
    if (!selectedEmoji) {
      setSelectedEmoji(null);
      setModalOpen(false);
      return;
    }

    const response = await fetch('http://localhost/articles/emojis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emoji: selectedEmoji,
        article: articles.articleId,
      }),
    });

    const data = await response.json();
    console.log(data);
    setSelectedEmoji(null);
    setModalOpen(false);
  };

  const renderReactionCounts = (articleId) => {
    const articleReactions = reactions.filter(
      (reaction) => reaction.articleId === articleId
    );
    return articleReactions.map((reaction) => (
      <span key={reaction.reactionContent}>
        {reaction.reactionContent}: {reaction.count}
      </span>
    ));
  };
  

  const renderArticleList = () => {
    if (!articles || articles.length === 0) {
      return <h2>게시글 없음</h2>;
    }
    return articles.map((article) => {
      const category = categories.find(
        (category) => category.articleId === article.articleId
      );
      return (
        <li key={article.articleId}>
          <h2>
            <Link to={`/article/${article.articleId}`}>
              제목: {article.articleTitle}
            </Link>
          </h2>
          <span>카테고리: {category ? category.categoryName : '없음'}</span>
          <h4>내용: {article.articleContent}</h4>
          {renderReactionCounts(article.articleId)}
          <br></br>
          <button onClick={onClickHandler}>반응</button>
          <hr />
        </li>
      );
    });
  };

  const renderCategoryList = () => {
    if (!categories || categories.length === 0) {
      return <h2>카테고리 없음</h2>;
    }

    return categories.map((category) => (
      <button key={category}>
        <Link to={`/articles/${category}`}>카테고리: {category}</Link>
      </button>
    ));
  };

  const renderModal = () => {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <ul>
                {emojis.map((emoji, idx) => (
                  <li
                    key={idx}
                    onClick={() => setSelectedEmoji(emoji.emojiChar)}
                  >
                    {emoji.emojiChar}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={registerReaction}
              >
                등록
              </button>
              <button
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header>
        <div>{renderCategoryList()}</div>
      </header>
      <main>
        <ul>{renderArticleList()}</ul>
        {modalOpen && renderModal()}
      </main>
    </>
  );
};

export default Articles;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Articles = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost/articles", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         setArticles(res.articles);
//       });
//   }, []);

//   if (!articles.length) {
//     return (
//       <main>
//         <ul>
//           <li>
//             <h2>게시글 없음</h2>
//           </li>
//         </ul>
//       </main>
//     );
//   }else{
//     const articleList = articles.map((article) => (
//         <li key={article.articleId}>
//           <span>
//             <Link to={`/article/${article.articleId}`}>제목: {article.articleTitle}</Link>
//           </span>
//           <h3>내용: {article.articleContent}</h3>
//           <h4>작성일: {article.createdAt} 작성자: {article.nickname}</h4>
//           <div>
//             {article.Reactions.map((reaction) => (
//               <span key={reaction.emoji}>{reaction.emoji}: {reaction.count}</span>
//             ))}
//           </div>
//           <button>이모지 등록</button>
//           <hr />
//         </li>
//       ));
    
//       return (
//         <main>
//           <ul>{articleList}</ul>
//         </main>
//       );
//   }
// };

// export default Articles;
