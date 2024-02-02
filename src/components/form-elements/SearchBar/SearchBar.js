import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';   
import searchBarResults from '../../../utils/searchBarResults';
import capitalizeFirstLetterOfString from '../../../utils/capitalizeFirstLetterOfString';
import './SearchBar.css';


const SearchBar = ({ value, field, resultsList, handleFormDataChange }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [highlightedItemIndex, setHighlightedItemIndex] = useState(-1);

    useEffect(() => {
        const handleClickAnywhere = (e) => {
            if (!e.target.closest('.search-results')) {
                clearSearchResults();
            }
        };
        document.addEventListener('mousedown', handleClickAnywhere);
        return () => document.removeEventListener('mousedown', handleClickAnywhere)
    }, []);

    const clearSearchResults = () => {
        setSearchResults([]);
        setHighlightedItemIndex(-1);
    };

    const handleOnChange = (e) => {
        handleFormDataChange(field, e.target.value);
        setSearchResults(e.target.value ? searchBarResults(resultsList, e.target.value) : [])
    };

    const handleOnKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = e.key === 'ArrowDown' ?
                (highlightedItemIndex + 1) % searchResults.length :
                (highlightedItemIndex - 1 + searchResults.length) % searchResults.length;
            setHighlightedItemIndex(newIndex)
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const selectedItem = searchResults[highlightedItemIndex];
            handleFormDataChange(field, highlightedItemIndex === -1 ?
                e.target.value : selectedItem)
            clearSearchResults();
        } else if (e.key === "Tab") {
            setHighlightedItemIndex(-1);
        } else if (e.key === "Escape") {
            clearSearchResults();
        }
    };

    const handleClickOnSearchResult = (item) => {
        handleFormDataChange(field, item);
        clearSearchResults();
    };

    const handleKeyDownSearchResult = (e, item) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleFormDataChange(field, item);
            clearSearchResults();
        }
    };

    const handleMouseClickSearchBar = (e) => {
        setSearchResults(e.target.value ? searchBarResults(resultsList, e.target.value) : [])
    };

    const handleMouseOutSearchResult = () => {
        clearSearchResults();
    };

    const handleMouseEnterSearchResult = (index) =>{
        setHighlightedItemIndex(index)
    };

    return (
        <span
            aria-label={`Enter or search ${field}s`}
            onMouseLeave={() => handleMouseOutSearchResult()}
        >
            <Form.Control
                required
                type="text"
                name={'text'}
                value={value}
                placeholder={capitalizeFirstLetterOfString(field)}
                onChange={(e) => handleOnChange(e)}
                onKeyDown={(e) => { handleOnKeyDown(e) }}
                onClick={(e) => handleMouseClickSearchBar(e)}
            />

            <div
                className='position-absolute search-results'
                style={{ zIndex: 1 }}
            >
                {searchResults.map((item, index) => (
                    <Form.Control
                        key={`form-control-${item}-${index}`}
                        aria-label={`Search result:${item}`}
                        className='search-result-item'
                        role='option'
                        name={item}
                        value={item}
                        readOnly
                        onClick={() => handleClickOnSearchResult(item)}
                        style={index === highlightedItemIndex ? { backgroundColor: 'lightgray' } : {}}
                        onKeyDown={(e) => handleKeyDownSearchResult(e, item)}
                        onMouseEnter={()=>handleMouseEnterSearchResult(index)}
                    />
                ))}
            </div>
        </span>
    )
}

export default SearchBar;