import React, { useState } from "react";
import FeedContent from "./component/FeedContent";
import FeedLists from "./component/FeedLists";
import RSSUrlForm from "./component/RSSUrl";
import Pagination from "./component/Pagination";
import {
  formatXMLtoJSON,
  checkBookMarks,
  validateUrl,
  addImageToFeedList,
  handleBookmarkUpdate
} from "./services/helper";
import './styles/utils.css';
import './styles/main.css';

export default function App() {

  const [rssUrl, setRssUrl] = useState("");
  const [feedList, setFeedList] = useState([]);
  const [showFeedContent, setShowFeedContent] = useState(false)
  const [feedContent, showFeedContentData] = useState("")
  const [shareLink, setShareLink] = useState("")
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)

  const [currentPage, setCurrentPage] = useState()
  const [feedsPerPage] = useState(5)

  const getRss = async (e) => {
    e.preventDefault();
    setCurrentPage(0)
    setLoader(true)
    validateUrl(rssUrl)
    const res = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
    const {contents}  = await res.json();
    // const { contents } = await res.json();
    console.log(contents)

    if(!contents.startsWith('<?xml')) {
      setLoader(false)
      return setError(true)
    } else {
      setError(false)
    }
    // return 
    setLoader(false)
    const feedItems = formatXMLtoJSON(contents)
    let feedListWithImage = addImageToFeedList(feedItems)
    checkBookMarks(feedListWithImage)
    setFeedList(feedListWithImage);
    setCurrentPage(1)
  };

  const bookMarkListing = (feedTitle) => {
    const newState = feedList.map((feed) => {
      if (feed.title === feedTitle) {
        feed.isBookMarked = !feed.isBookMarked;
        handleBookmarkUpdate(feed, feedTitle)
      }
      return feed
    })
    setFeedList(newState)
  }

  const getData = (content) => {
    return { __html: content };
  }

  const handleFeedContent = (content, shareLink) => {
    setShareLink(shareLink)
    showFeedContentData(getData(content))
    setShowFeedContent(true)
  }

  const goBackToFeedLists = () => {
    setShowFeedContent(false)
    showFeedContentData("")
  }

  const indexOfLastPost = currentPage * feedsPerPage;
  const indexOfFirstPost = indexOfLastPost - feedsPerPage;
  let currentList = feedList.slice(indexOfFirstPost, indexOfLastPost);

  if(error) return (
    <div className="container">
       <RSSUrlForm
        showFeedContent={showFeedContent}
        getRss={getRss}
        setRssUrl={setRssUrl}
        rssUrl={rssUrl}
      />
      <p> An error occurred </p>
       </div>
  )

  if (loader) return (
    <div className="container m-8">
      Loading...
    </div>
  )

  return (
    <div className="container">
      <h3> RSS Feed Reader </h3>
      <RSSUrlForm
        showFeedContent={showFeedContent}
        getRss={getRss}
        setRssUrl={setRssUrl}
        rssUrl={rssUrl}
      />
      {!showFeedContent ?
        <div className="feed-results">
          {currentList.map((feed) => {
            return (
              <FeedLists key={feed.title}
                feed={feed}
                handleFeedContent={handleFeedContent}
                bookMarkListing={bookMarkListing}
              />
            );
          })}
        </div>
        :
        <FeedContent
          shareLink={shareLink}
          feedContent={feedContent}
          goBackToFeedLists={goBackToFeedLists}
        />
      }

      {!showFeedContent && <Pagination
        feedsPerPage={feedsPerPage}
        totalList={feedList.length}
        feedList={feedList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />}

    </div>
  );
}