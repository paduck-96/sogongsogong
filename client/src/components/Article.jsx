import React from 'react';
import { useParams } from 'react-router-dom';

const Article = () => {
    const {articleGroup, articleId} = useParams();

    return (
        <div>
            <span>{articleGroup}</span>
            <span>{articleId}</span>
        </div>
    );
};

export default Article;