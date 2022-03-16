import React from 'react';

export default function Pagination({
  feedsPerPage,
  totalList,
  setCurrentPage,
  currentPage,
  feedList,
}) {

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const prevPage = () => {
    if (currentPage > 1)
      setCurrentPage(currentPage - 1);
  }

  const nextPage = () => {
    if (currentPage < Math.ceil(feedList.length / feedsPerPage))
      setCurrentPage(currentPage + 1);
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalList / feedsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers.length ? <li onClick={prevPage}>
        &#8592;
      </li> : null}

      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? 'current-page' : ''}
        >
          {number}
        </li>
      ))}

      {pageNumbers.length ? <li onClick={nextPage}>
        &#8594;
      </li> : null}

    </nav>
  )
}
