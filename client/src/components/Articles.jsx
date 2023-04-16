import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost/articles');
      const { data } = await response.json();
      setArticles(data.articles);
      setCategories(data.categories);
    };
    fetchData();
  }, []);

  const onClickHandler = async (articleId) => {
    const response = await fetch('http://localhost/article/emojis');
    const emojis = await response.json();
    setEmojis(emojis);
    setModalOpen(true);
    setSelectedArticleId(articleId);
  };

  const registerReaction = async () => {
    if (!selectedEmoji) {
      setSelectedEmoji(null);
      setModalOpen(false);
      return;
    }

    const response = await fetch('http://localhost/article/emojis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emoji: selectedEmoji,
        articleId: selectedArticleId,
      }),
    });

    await response.json();
    setSelectedEmoji(null);
    setModalOpen(false);
  };

  const renderReactionCounts = (reactions) => {
    if (!reactions || reactions.length === 0) {
        return null;
      }
      const reactionsKey = Object.keys(reactions);

      return reactionsKey.map((key) => (
        <div>
            <span>{key}</span> 
            <span>{reactions[key]}</span>
        </div>
      ));
  };
  
  const renderArticleList = () => {
    if (!articles || articles.length === 0) {
      return <h2>게시글 없음</h2>;
    }
    return articles.map((article) => {
      const category = article.Categories.find(
        (category) => category.fk_article_category === article.articleId
      );

      return (
        <li key={article.articleId}>
          <h2>
              제목: {article.articleTitle}
          </h2>
          <span>카테고리: {category ? category.categoryName : '없음'}</span><br></br>
          <span>작성자: {article.User.nickname}</span>
          <h4 >내용: {article.articleContent}</h4>
          {renderReactionCounts(article.Reactions)}
          <br></br>
          <button onClick={()=>onClickHandler(article.articleId)}>반응</button>
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
      <button>
        <Link to={`/articles/${category.categoryName}`}>카테고리: {category.categoryName}</Link>
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