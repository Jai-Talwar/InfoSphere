import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [api, setapi] = useState("8ddbea3cdafb4e0a82209d5978a1b9d9");
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatenews = async () => {
    props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${api}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    try {
      let data = await fetch(url);
      props.setprogress(30);

      let parsedData = await data.json();
      props.setprogress(70);
      let mainArray = parsedData.articles;
      let urlToImageArray = mainArray.filter((item) => {
        return item.urlToImage;
      });
      let urlWithoutImage = mainArray.filter((item) => {
        return item.urlToImage == null;
      });
      mainArray = urlToImageArray.concat(urlWithoutImage);
      setArticles(mainArray || []);
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      props.setprogress(100);
    }
  };

  const fetchData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${api}&page=${nextPage}&pageSize=${props.pageSize}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles((prevArticles) => [
        ...prevArticles,
        ...(parsedData.articles || []),
      ]);
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)}-InfoSphere`;
    updatenews();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-3">
        InfoSphere Top {capitalize(props.category)} Headlines
      </h2>
      <hr />
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="row">
          {articles.map((element, index) => (
            <div className="col-md-4 my-3" key={element.url || index}>
              <Newsitem
                title={element.title?.slice(0, 45) || ""}
                description={element.description?.slice(0, 70) || ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                time={element.publishedAt}
                source={element.source?.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
