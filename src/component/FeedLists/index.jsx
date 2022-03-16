import React from 'react';
import { BookMarked, DidNotBookMark } from "../../assets";
import { formatData } from '../../services/helper';

export default function FeedLists({
  feed,
  handleFeedContent,
  bookMarkListing
}) {
  return (
    <div
      tabIndex="1"
      key={feed.title}
      className="p-8 border-blue m-8 flex-column list-item"
    >

      {/* {feed.images && <img
        src={feed.images}
        alt={formatData(feed.title)}
        style={{ minWidth: "300px", maxWidth: "425px" }}
      />} */}

      <div className='flex justify-between align-center'>
        <p
          className="cursor-pointer"
          onClick={() => handleFeedContent(feed.content, feed.link)}
        >
          {formatData(feed.title)}
        </p>

        {feed.isBookMarked ?
          <img
            src={BookMarked}
            alt="bookmark"
            className="cursor-pointer"
            onClick={() => bookMarkListing(feed.title)}
          />
          : <img
            src={DidNotBookMark}
            alt="no-bookmark"
            className="cursor-pointer"
            onClick={() => bookMarkListing(feed.title)}
          />
        }
      </div>
    </div>
  )
}
