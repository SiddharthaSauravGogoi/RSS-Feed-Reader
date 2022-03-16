/**
 * Fn to format from xml to json.
 * @param {*} contents 
 * @returns {array} feedItems - list of object formatted content for feed display
 */

export const formatXMLtoJSON = (contents) => {
  const feed = new window.DOMParser().parseFromString(contents, "text/xml");
  const items = feed.querySelectorAll("item");
  const feedItems = [...items].map((el) => ({
    link: el.querySelector("link").innerHTML,
    title: el.querySelector("title").innerHTML,
    content: el.getElementsByTagNameNS("*", "encoded").item(0)
      ? el.getElementsByTagNameNS("*", "encoded").item(0).textContent
      : `<p> This feed has no content to show </p>`,
    isBookMarked: false,
  }));
  return feedItems
}


/**
 * Fn to check if bookmarks exist for the rss feed data. T(n) - O(n*n)
 * @param {array} feedList - newly fetched rss feed data
 * @returns {array} the list of feed updated with bookmark state crosschecked from localstorage
 */
export const checkBookMarks = (feedList) => {

  if (localStorage.getItem("bookmarks")) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (let i = 0; i < bookmarks.length; i++) {
      for (let j = 0; j < feedList.length; j++) {
        if (feedList[j].title === bookmarks[i].title) {
          feedList[j].isBookMarked = true;
        }
      }
    }
  }
  return feedList;
}

/**
 * Fn to format a title if starts with '<![CDATA'
 * @param {string} title - feed title
 * @returns {string} formatted or original feed tittle
 */

export const formatData = (title) => {
  if (title.startsWith('<![CDATA')) return title.substring(9, title.length - 3);
  return title;
}

/**
 * Fn to validate a url submitted
 * @param {string} url - rss feed url
 * @returns - straight away returns/ stops execution of function if not valid url
 */
export const validateUrl = (url) => {
  const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/;
  if (!urlRegex.test(url)) {
    alert('The url is not valid. Please check again')
    return;
  }
}

/**
 * Fn to find and get the first image tag/url fromt he content string.
 * @param {array} feedList - feedlist
 * @returns {array} - feedList with added image extracted from content
 */
export const addImageToFeedList = (feedList) => {
  const imagePattern = /<img.*?src="(.*?)"[^>]+>/g;
  const imageAddedFeedList = feedList.map((item) => {
    let urls = imagePattern.exec(item.content)
    item.images = urls ? urls[1] : "";
    return item;
  })
  return imageAddedFeedList;
}

/**
 * Fn to update bookmark state on localstorage
 * @param {object} feed - feed item to check against 
 * @param {string} feedTitle - feedTitle for a unique identifier to filter out data from
 */
export const handleBookmarkUpdate = (feed, feedTitle) => {
  if (feed.isBookMarked === true) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    let updatedBookMarks = bookmarks ? [...bookmarks, feed] : [feed];
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookMarks));
  } else if (feed.isBookMarked === false) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    let updatedBookMarks = bookmarks ? bookmarks.filter((item) => item.title !== feedTitle) : [feed];
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookMarks));
  }
}