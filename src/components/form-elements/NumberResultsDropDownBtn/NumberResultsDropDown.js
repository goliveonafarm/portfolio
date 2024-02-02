import { Dropdown, DropdownButton } from 'react-bootstrap';
import './NumberResultsDropDown.css';

const NumberResultsDropDownBtn = ({ itemsPerPage, setItemsPerPage, setCurrentPage, onChangeItemsPerPage, objectWithPageValue = {}, resultsPerPage, variant }) => {
    return (
        <DropdownButton
        className='pt-2'
            variant={`${variant}`}
            data-bs-theme={`${variant}`}
            name='items per page'
            title={itemsPerPage}
            onSelect={(eventKey) => {
                setItemsPerPage(eventKey)
                setCurrentPage(1)
                onChangeItemsPerPage(objectWithPageValue, eventKey)
            }}
        >
            <Dropdown.ItemText>Results per page</Dropdown.ItemText>
            <Dropdown.Divider />

            {resultsPerPage.map(result => {
                return (
                    <Dropdown.Item
                        eventKey={result}
                        key={`dropdown-item-${result}`}
                    >
                        {`${result}`}
                    </Dropdown.Item>
                )
            })}
        </DropdownButton>
    )
}

export default NumberResultsDropDownBtn;