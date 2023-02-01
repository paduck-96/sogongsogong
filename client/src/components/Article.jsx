import React,{useState, useEffect} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Article = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({});
    const [category, setCategory] = useState([]);
    useEffect(()=>{
            fetch(`http://localhost/article/${params.articleId}`,{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            .then(res=>res.json())
            .then(res => {
                setArticle(res.article)
                setCategory(res.category)});
                },[params.articleId, setArticle])
        const onClickDeleteHandler = async (e) => {
            const response = await fetch(`http://localhost/article/${params.articleId}`,{
                method:"DELETE"
            })
            .then(res=>res.json())
            if(response.result==="success"){
                return navigate("/articles", {replace:true})
            }
        }
                if(article==="게시글 없음"){
                    return (
                        <div>
                            <main>
                                <ul>
                                    <li>
                                        <h2>{article}</h2>
                                    </li>
                                </ul>
                            </main>
                        </div>
                    )
                }
                const categoryList = category.map(el=><span key={category.indexOf(el)}>{el}</span>)
    return (
        <main>
            <div>
                <h2>{article.articleTitle}</h2>
                <div>
                    {categoryList}
                </div>
                <p>{article.articleContent}</p>
            </div>
            <div>
                <button><Link to={`/article/${params.articleId}/update`}>수정</Link></button><br/>
                <button onClick={onClickDeleteHandler}>삭제</button>
            </div>
        </main>
    )
};

export default Article;