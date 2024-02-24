import { useState } from 'react';

const usePagination = (totalItems, itemsPerPage) =>{
    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = totalItems.slice(indexOfFirstItem, Math.min(indexOfLastItem, totalItems.length));
    const pageCount = Math.ceil(totalItems.length / itemsPerPage);


    return {currentPage, paginate, currentItems, pageCount};
};

export default usePagination;