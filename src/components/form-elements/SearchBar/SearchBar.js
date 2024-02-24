import { useRef, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import searchBarResults from './utils/searchBarResults';
import useClickOutside from './hooks/useClickOutside';
import capitalizeFirstLetterOfString from '../../../utils/capitalizeFirstLetterOfString';
import styles from './SearchBar.module.css';

const SearchBar = ({ value, field, resultsList, handleFormDataChange }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [highlightedItemIndex, setHighlightedItemIndex] = useState(-1);

    const clearSearchResults = () => {
        setSearchResults([]);
        setHighlightedItemIndex(-1);
    };

    // Ref to the search bar to detect clicks outside of it (to clear search results)
    const searchBarRef = useRef(null);
    useClickOutside(searchBarRef, clearSearchResults);

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

    const handleMouseClickSearchBar = (e) => setSearchResults(e.target.value ? searchBarResults(resultsList, e.target.value) : [])

    return (
        <span
            ref={searchBarRef}
            aria-label={`Enter or search ${field}s`}
            onMouseLeave={() => clearSearchResults()}
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
            <Container
                className={`position-absolute ${styles['search-results']}`}
                style={{ zIndex: 1 }}
            >
                <Row>
                    {searchResults.map((item, index) => (
                        <Form.Control
                            key={`form-control-${item}-${index}`}
                            aria-label={`Search result:${item}`}
                            className={styles['search-result-item']}
                            role='option'
                            name={item}
                            value={item}
                            readOnly
                            onClick={() => handleClickOnSearchResult(item)}
                            style={index === highlightedItemIndex ? { backgroundColor: 'lightgray' } : {}}
                            onKeyDown={(e) => handleKeyDownSearchResult(e, item)}
                            onMouseEnter={() => setHighlightedItemIndex(index)}
                        />
                    ))}
                </Row>
            </Container>
        </span>
    )
}

export default SearchBar;