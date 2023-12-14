import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const[articles, setArticles]=useState([]);
  const[loading, setLoading]=useState(true);
  const[page, setPage]=useState(1);
  const[totalResults, setTotalResults]=useState(0);
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews=async()=>{
    props.setProgress(10);
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8e188103826746568ad473f94c87f3f1&page=${page}&pageSize=${props.pageSize}`;
    //const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)}-MonkeyNews`;
    updateNews();
  },[])

  const fetchMoreData = async () => {
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8e188103826746568ad473f94c87f3f1&page=${page+1}&pageSize=${props.pageSize}`;

    setPage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };

  
    return (
      <>
      <h2 className='text-center' style={{margin:'35px 0px', marginTop:'90px'}}>{capitalizeFirstLetter(props.category)}-Top HeadLines</h2>
      {loading && <Spinner/>}
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className='container'>
          <div className='row my-3'>
            {articles.map((element) => {
              if (element.title !== null && element.description !== null && element.urlToImage !== null && element.url !== null) {
                return (
                  <div className='col-md-4' key={element.url}>
                    <NewsItem title={(element.title.length > 0) ? element.title.slice(0, 45) : ""} description={element.description !== null ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                )
              }
            })}
          </div>
          </div>
        </InfiniteScroll> 
        </>
    )
  
}

export default  News;

// News.defaultProps = {
//   country: 'in',
//   pageSize: 10,
//   category: 'general'
// }
// News.propsTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string
// }







