import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  articles = [
    {
      source: {
        id: null,
        name: "AppleInsider",
      },
      author: "news@appleinsider.com (Charles Martin)",
      title:
        "Photoshop Web beta hands on: Nifty, but no match for the competition",
      description:
        "Currently free, the Photoshop on the Web beta is an impressive feat — but seems aimed at casual users who need quick fixes and a simpler toolset, at least for now.In one of Adobe's more ambitious experiments, its engineers have been working on web-based versi…",
      url: "https://appleinsider.com/articles/23/03/15/photoshop-web-beta-hands-on-nifty-but-no-match-for-the-competition",
      urlToImage:
        "https://photos5.appleinsider.com/gallery/53437-107252-PSBeta-CoverShot-xl.jpg",
      publishedAt: "2023-03-15T11:01:20Z",
      content:
        "AppleInsider may earn an affiliate commission on purchases made through links on our site.\r\nCurrently free, the Photoshop on the Web beta is an impressive feat — but seems aimed at casual users who n… [+8307 chars]",
    },
    {
      source: {
        id: null,
        name: "The Guardian",
      },
      author: "Lucy Mangan",
      title:
        "Ted Lasso season three review – still so charming it brings order to our crumbling universe",
      description:
        "The squad is back for a third and rumoured final time, so sit back and enjoy the magnificently comforting comedy while you still can. Go team!For many, mental shelter during the long months of lockdown was found under a canopy slung between two televisual pol…",
      url: "https://www.theguardian.com/tv-and-radio/2023/mar/15/ted-lasso-season-three-review-still-so-charming-it-brings-order-to-our-crumbling-universe",
      urlToImage:
        "https://i.guim.co.uk/img/media/a4a4cf878407d3352844f6fc1bbbc858024d9ca3/0_250_7932_4759/master/7932.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctcmV2aWV3LTQucG5n&enable=upscale&s=9a49ac9c052c941ddd82a4e5cf183432",
      publishedAt: "2023-03-15T08:00:04Z",
      content:
        "For many, mental shelter during the long months of lockdown was found under a canopy slung between two televisual poles; Schitts Creek and Ted Lasso. Both became unexpected hits for the precious esca… [+4484 chars]",
    },
    {
      source: {
        id: null,
        name: "MacRumors",
      },
      author: "Tim Hardwick",
      title:
        "Spotify Still Intends to Launch Delayed HiFi Lossless Plan, Just Don't Ask When",
      description:
        'Spotify says it still plans to launch a lossless music experience, although when that will be and what form it will take still appear undecided.\n\n\n\n\n\nIt\'s been more than two years since Spotify announced it would introduce a "HiFi" premium tier that would giv…',
      url: "https://www.macrumors.com/2023/03/15/spotify-hifi-lossless-plan-still-coming/",
      urlToImage:
        "https://images.macrumors.com/t/7-nfr3K2_BPQYeb0zBLJE8hdAb0=/2500x/article-new/2021/08/General-Spotify-Feature.jpg",
      publishedAt: "2023-03-15T11:29:57Z",
      content:
        "Spotify says it still plans to launch a lossless music experience, although when that will be and what form it will take still appear undecided.\r\nIt's been more than two years since Spotify announced… [+1645 chars]",
    },
    {
      source: {
        id: "business-insider",
        name: "Business Insider",
      },
      author: "dsiu@insider.com (Diamond Naga Siu)",
      title:
        "Google wasted its pandemic opportunity. Now, it's scrambling to catch up.",
      description:
        "In today's edition: A high school teacher uses ChatGPT to teach math and science, the rise of penis implants, and more headlines.",
      url: "https://www.businessinsider.com/google-bank-red-apple-tesla-ai-mark-tesla-teacher-chatgpt-2023-3",
      urlToImage:
        "https://i.insider.com/6410ff4db6d9f20018911fa5?width=1200&format=jpeg",
      publishedAt: "2023-03-15T10:30:00Z",
      content:
        "Hey there, buds. I'm Diamond Naga Siu, and I'll be writing to you from San Diego for the foreseeable future. Big thanks to my editor Matt Weinberger and my teammate Paayal Zaveri for filling in while… [+4128 chars]",
    },
  ];
  capatalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("hello i am JT constructor ");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capatalize(this.props.category)}-JT News`;
  }
  async updatenews() {
    this.props.setprogress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8ddbea3cdafb4e0a82209d5978a1b9d9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });

    let data = await fetch(url);
    this.props.setprogress(30);

    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setprogress(70);

    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    });
    this.props.setprogress(100);
  }
  fetchData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8ddbea3cdafb4e0a82209d5978a1b9d9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),

      totalresults: parsedData.totalResults,
      loading: false,
    });
  };
  async componentDidMount() {
    this.updatenews();
  }
  // nextclick = async () => {

  //   console.log("nestttt");

  //   this.setState({
  //     page: this.state.page + 1
  //   })
  //   this.updatenews();

  // }
  // pervclick = async () => {

  //   this.setState({
  //     page: this.state.page - 1,

  //   })
  //   this.updatenews();

  // }

  render() {
    return (
      <div className="container ">
        <center>
          <h2 className="my-3">JT News Top {this.props.category} Headlines</h2>
        </center>
        <hr />
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 70)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    time={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
