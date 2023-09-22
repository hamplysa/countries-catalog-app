import React, { useState, useEffect } from "react";
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const CountryPagination = (props) => {
  const {
    totalRecords,
    pageLimit,
    pageNeighbours,
    onPageChanged,
    currentPage
  } = props;
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
  }, [setTotalPages]);

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers() || [];
  return (
    // <nav aria-label="Countries Pagination">
    <nav aria-label="Page navigation">
      {/* <ul className="pagination"> */}
      <ul className="inline-flex -space-x-px text-base h-10">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  href="/"
                  className="page-link flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  aria-label="Previous"
                  onClick={(e) => onPageChanged(e, pageNeighbours * 2 - 1)}
                >
                  {/* <span aria-hidden="true">&laquo;</span> */}
                  <span aria-hidden="true">Prev</span>
                </a>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  className="page-link flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="/"
                  aria-label="Next"
                  onClick={(e) => onPageChanged(e, pageNeighbours * 2 + 3)}
                >
                  {/* <span aria-hidden="true">&raquo;</span> */}
                  <span aria-hidden="true">Next</span>
                </a>
              </li>
            );

            if (page === 1)
            return (
              <li key={index} className="page-item">
                <a
                  href="/"
                  className="page-link flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  aria-label="Previous"
                  onClick={(e) => onPageChanged(e, page)}
                >
                  {/* <span aria-hidden="true">&laquo;</span> */}
                  <span aria-hidden="true">First</span>
                </a>
              </li>
            );

            if (page === totalPages)
            return (
              <li key={index} className="page-item">
                <a
                  className="page-link flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="/"
                  aria-label="Next"
                  onClick={(e) => onPageChanged(e, totalPages)}
                >
                  {/* <span aria-hidden="true">&raquo;</span> */}
                  <span aria-hidden="true">Last</span>
                </a>
              </li>
            );

          return (
            <li
              key={index}
              className={`page-item${currentPage === page ? " active" : ""}`}
            >
              <a
                className={`${currentPage === page ? 
                    "flex items-center justify-center px-4 h-10 text-white border border-gray-300 bg-blue-900 hover:bg-blue-500 hover:text-white dark:border-gray-700 dark:bg-gray-700 dark:text-white" : 
                    "page-link flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`}
                // className={`page-link flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                href="/"
                onClick={(e) => onPageChanged(e, page)}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CountryPagination;
