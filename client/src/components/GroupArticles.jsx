    import React, { useEffect, useState } from "react";
    import { useParams, Link } from "react-router-dom";
    
    const GroupArticles = () => {
      const { articlegroup } = useParams();
      const [groupArticles, setGroupArticles] = useState([]);
      const [emojis, setEmojis] = useState([]);
      const [modalOpen, setModalOpen] = useState(false);
      const [selectedEmoji, setSelectedEmoji] = useState('');
    
      useEffect(() => {
        fetch(`http://localhost/articles/${articlegroup}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => setGroupArticles(res.data.articles));
      }, [articlegroup]);

      if (!groupArticles || groupArticles.length === 0) {
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
            article: groupArticles.articleId,
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
    
          return reactionsKey.map((key,idx) => (
            <div>
                <span>{key}</span> 
                <span>{reactions[key]}</span>
            </div>
          ));
      };
    
      const groupList = groupArticles.map((article) => (
        <li key={article.articleId}>
          <h2>
            {article.articleTitle}
          </h2>
          <span>작성자: {article.User.nickname}</span>
          <h4>내용: {article.articleContent}</h4>
          {renderReactionCounts(article.Reactions)}
          <br></br>
          <button onClick={onClickHandler}>반응</button>
          <hr />
        </li>
      ));
    
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
        <main>
          <div>
            <ul>{groupList}</ul>
            {modalOpen && renderModal()}
          </div>
        </main>
      );
    };
    
    export default GroupArticles;