import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showArticle} from "redux/features/document/article/showArticelSlice";
import {useParams} from "react-router-dom";
import {FirstLoadingCore, LoadingCore} from "core";
import DocumentBody from "../DocumentBody";
import {NoAccess} from "../../../components";

const ShowArticle = () => {
    const [article, setArticles] = useState(null)
    const {data, loading} = useSelector((state) => state.showArticleSlice)
    const {data: user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const {id} = useParams();
    const ref = useRef(false)

    React.useEffect(() => {
        dispatch(showArticle({id: id, page: 1, perPage: 5}))
    }, [dispatch, id]);

    React.useEffect(() => {
        setArticles(data)
    }, [data]);


    useEffect(() => {
        if (loading && article !== null) {
            ref.current = true
        }
    }, [loading, article])


    if (checkOutput(article?.status_type, user?.data?.id, article?.user?.id, article?.acceptor?.id)) {
        return (!ref.current && loading) ? <FirstLoadingCore loading={loading}/> : (<>
            {loading && <LoadingCore loading={loading}/>}
            <DocumentBody user={user?.data} id={id} data={article} setData={setArticles}/>
        </>);
    } else {
        return <NoAccess/>
    }
};
export default ShowArticle;

const checkOutput = (status, user, author, acceptor) => {
    if (status === 'writing') {
        return author === user || acceptor === user;
    }
    return true;
}