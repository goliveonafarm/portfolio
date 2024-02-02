import { useEffect, useState } from 'react';
import { Table, CloseButton, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import './FormTable.css';
import CustomTooltip from '../../ui/CustomTooltip/CustomTooltip';
import usePagination from '../../../hooks/usePagination';
import PaginationNavigator from '../PaginationNavigator/PaginationNavigator';
import NumberResultsDropDownBtn from '../NumberResultsDropDownBtn/NumberResultsDropDown';
import sortItems from '../../../utils/arraySorting';
import generateUniqueId from '../../../utils/generateUniqueId';

const FormTable = ({ onChangeItemsPerPage, paginationObject, hasSpecialCol, handleCloseButton, getTooltipContent }) => {
    const [itemsPerPage, setItemsPerPage] = useState(paginationObject.pageSize);
    const [sortCriteria, setSortCriteria] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortedItems, setSortedItems] = useState(paginationObject.items);

    useEffect(() => {
        const sorted = sortItems([...paginationObject.items], sortCriteria, sortDirection);
        setSortedItems(sorted);
    }, [paginationObject.items.length, sortCriteria, sortDirection]);

    const { currentPage, paginate, currentItems, pageCount } = usePagination(sortedItems, itemsPerPage);

    const handleSortCriteriaChange = (newCriteria) => {
        if (sortCriteria === newCriteria) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortCriteria(newCriteria);
            setSortDirection('asc');
        }
    };

    useEffect(() => {
        paginate(1)
    }, [itemsPerPage]);

    if (currentItems.length === 0) return (<><hr />Add an item to get started</>);
    return (
        <>
            <Table
            responsive
                bordered
                hover
                size="sm"
                variant='dark'
                className='table-striped'
                key={generateUniqueId()}
            >
                <thead>
                    <tr >
                        {hasSpecialCol && <th></th>}
                        {Object.keys(currentItems[0]).map((key) => (
                            key !== 'id' && key !== 'parentId' && (
                                <CustomTooltip key={`th-${key}-${currentItems[0].id}`} tooltipText={`Sort by ${key}`}>
                                    <th style={{ cursor: 'pointer' }} onClick={() => { handleSortCriteriaChange(key) }} tabIndex="0">
                                        {key}
                                        <FontAwesomeIcon icon={faSort} />
                                    </th>
                                </CustomTooltip>
                            )
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => {
                        const { tooltipText, tooltipColorVariant, specialIcon, deleteToolTip } = getTooltipContent(item)
                        return (
                            <tr
                                key={`tr-${item.id}`}
                                className='table-dark'>
                                {hasSpecialCol && (
                                    <CustomTooltip tooltipText={tooltipText} variant={tooltipColorVariant}>
                                        <td>
                                            {specialIcon}
                                        </td>
                                    </CustomTooltip>
                                )}
                                {Object.keys(item).map((key) => (
                                    key !== 'id' && key !== 'parentId' ? (
                                        <CustomTooltip key={generateUniqueId()} tooltipText={`${key} is ${item[key]}`}>
                                            <td>
                                                {key === 'pricePerOz' || key === 'cost' ?
                                                    `$${item[key].toFixed(2)}` :
                                                    item[key]
                                                }
                                            </td>
                                        </CustomTooltip>
                                    ) : null
                                ))}
                                <td>
                                    <CustomTooltip tooltipText={deleteToolTip} variant={'danger'}>
                                        <CloseButton className='bg-secondary' onClick={(e) => handleCloseButton(item.id)} />
                                    </CustomTooltip>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Row>
                <Col>
                    <PaginationNavigator
                        pageCount={pageCount}
                        currentPage={currentPage}
                        paginate={paginate}
                        variant={'dark'}
                    />
                </Col>
                <Col>
                    <NumberResultsDropDownBtn
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        setCurrentPage={paginate}
                        onChangeItemsPerPage={onChangeItemsPerPage}
                        objectWithPageValue={paginationObject}
                        resultsPerPage={[5, 10, 20, 50, 100]}
                        variant={'dark'}
                    />
                </Col>
            </Row>
        </>
    )
}

export default FormTable;