import { useState } from 'react';
import { Row } from 'react-bootstrap';
import AddGroceryStoreForm from '../components/grocery-store-components/AddGroceryStoreForm';
import Checkbox from '../components/form-elements/Checkbox/Checkbox'
import CustomTooltip from '../components/ui/CustomTooltip/CustomTooltip';
import GroceryStores from '../components/grocery-store-components/GroceryStores';

const GroceryListPage = () => {
    const [groceryStores, setGroceryStores] = useState([]);
    const [highlightCheapest, setHighlightCheapest] = useState(true);

    const handleHighlightCheapestChange = (isChecked) => setHighlightCheapest(isChecked);

    return (
        <div>
            <h1>Keep track of your grocery items and save money!</h1>
            <Row>
                {
                    groceryStores.length === 0 ? (
                        <div>Add a grocery store, or refresh the page to load the default stores</div>
                    ) : (
                        <CustomTooltip tooltipText='(treats price per ounce and price per unit the same in comparisons)'>
                            <Checkbox
                                label={'Mark cheapest items (adds icons with tooltips)'}
                                checked={highlightCheapest}
                                onCheckboxChange={handleHighlightCheapestChange} />
                        </CustomTooltip>
                    )
                }
            </Row>
            <GroceryStores
                highlightCheapest={highlightCheapest}
                setHighlightCheapest={setHighlightCheapest}
                groceryStores={groceryStores}
                setGroceryStores={setGroceryStores}
            />
            <AddGroceryStoreForm setGroceryStores={setGroceryStores} />
        </div>
    )
}

export default GroceryListPage;