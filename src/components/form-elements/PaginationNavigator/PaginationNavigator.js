import { useState, useEffect } from 'react';
import './PaginationNavigator.css';
import { Pagination, Row } from 'react-bootstrap';
import generateUniqueId from '../../../utils/generateUniqueId';

const PaginationNavigator = ({ pageCount, currentPage, paginate, variant = 'dark' }) => {
  const [maxPagesToShow, setMaxPagesToShow] = useState(5);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      const isTooSmall = windowWidth <= 576;
      setMaxPagesToShow(isTooSmall ? 3 : 5);
      setIsSmallScreen(isTooSmall);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (pageCount <= 1) {
    return null;
  };

  const calculateStartPage = () => {
    if (currentPage <= 2) {
      return 1;
    } else if (currentPage >= pageCount - 1) {
      return Math.max(pageCount - maxPagesToShow + 1, 1);
    } else {
      return currentPage - 1;
    }
  };

  let startPage = calculateStartPage();
  let endPage = Math.min(startPage + maxPagesToShow - 1, pageCount);

  return (
    <Row className='pt-2'>
      <Pagination data-bs-theme={`${variant}`}>
        <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />

        {startPage > 1 && !isSmallScreen && <Pagination.Ellipsis disabled />}
        {[...Array(endPage + 1 - startPage).keys()].map((i) => {
          const pageNumber = startPage + i
          return (
            <Pagination.Item
              key={generateUniqueId()}
              active={pageNumber === currentPage}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}
        {endPage < pageCount && !isSmallScreen && <Pagination.Ellipsis disabled />}

        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageCount} />
        <Pagination.Last onClick={() => paginate(pageCount)} disabled={currentPage === pageCount} />
      </Pagination>
    </Row>
  )
}

export default PaginationNavigator;