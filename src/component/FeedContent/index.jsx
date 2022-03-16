import React from 'react';
import SocialShare from './SocialShare';


export default function FeedContent({
  feedContent,
  goBackToFeedLists,
  shareLink,
}) {

  return (
    <div>
      <button onClick={goBackToFeedLists}>
        Go Back to feed lists
      </button>
      <div
        className="html-content"
        dangerouslySetInnerHTML={feedContent} />

      <SocialShare shareLink={shareLink} />
    </div>
  )
}
