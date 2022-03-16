import React from 'react';

export default function RSSUrlForm({
  showFeedContent,
  getRss,
  setRssUrl,
  rssUrl
}) {
  return (
    <>
      {!showFeedContent && <form onSubmit={getRss}>
        <input
          className="rss-input"
          onChange={(e) => setRssUrl(e.target.value)}
          value={rssUrl}
          placeholder="https://medium.com/feed/bac..."
          required
        />
        <br />
        <button type="submit">
          Submit
        </button>
      </form>
      }
    </>
  )
}
