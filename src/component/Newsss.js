//class based component

import React, {Component} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component  {
    
  static defaultProps = {
    country: 'in',
    pageSize: 10,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
      capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

   constructor(props){
    super(props);
    this.state={
        articles:[],
        loading:true,
        page:1,
        totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-MonkeyNews`;
  }

 

  // async updateNews() {
  //   this.props.setProgress(10);
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true })
  //   let data = await fetch(url);
  //   this.props.setProgress(30);
  //   let parseData = await data.json();
  //   this.props.setProgress(70);
  //   this.setState({
  //     articles: parseData.articles,
  //     totalResults: parseData.totalResults,
  //     loading: false

  //   })
  //   this.props.setProgress(100);
  // }

  async componentDidMount() {
    //this.updateNews();
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false

    })
    this.props.setProgress(100);
  }

  // handlePreviousClick=async ()=>{

  //   this.setState({
  //     page:this.state.page-1,
  //   })
  //   this.updateNews();
  // }

  // handleNextClick=async ()=>{

  //   this.setState({
  //     page:this.state.page+1,
  //   })
  //   this.updateNews();

  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e188103826746568ad473f94c87f3f1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      
    })
  };

  
    render(){
      return(
        <>
      <h2 className='text-center'>{this.capitalizeFirstLetter(this.props.category)}-Top HeadLines</h2>
      {this.state.loading && <Spinner/>}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        <div className='container'>
          <div className='row my-3'>
            {this.state.articles.map((element) => {
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
  
}





//`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48beae1f2c2f44a69d780882d680d7be&page={this.state.page}&pageSize=${this.props.pageSize}`;
//`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e188103826746568ad473f94c87f3f1&page={this.state.page}&pageSize=${this.props.pageSize}`;















