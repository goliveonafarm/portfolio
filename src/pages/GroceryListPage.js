import { useState, useEffect, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import GroceryStore from '../models/GroceryStoreModel';
import AddGroceryStoreForm from '../components/grocery-store-components/AddGroceryStoreForm';
import GroceryStoreCard from '../components/grocery-store-components/GroceryStoreCard';
import GroceryItem from '../models/GroceryItemModel';
import defaultGroceryStores from '../Data/defaultGroceryStores';
import Checkbox from '../components/form-elements/Checkbox/Checkbox'
import CustomTooltip from '../components/ui/CustomTooltip/CustomTooltip';
import roundToCent from '../utils/roundToCent';

const GroceryListPage = () => {
    {/* groceryStores[] contains items[] */ }
    const [groceryStores, setGroceryStores] = useState([]);
    const [highlightCheapest, setHighlightCheapest] = useState(false);

    useEffect(() => {
        const loadedStores = localStorage.getItem('groceryStores');
        if (loadedStores && loadedStores.length > 2) {
            setGroceryStores(JSON.parse(loadedStores));
            //this next line stops local storage from loading (for debugging)
            //setGroceryStores(defaultGroceryStores);
        } else {
            setGroceryStores(defaultGroceryStores);
            localStorage.setItem('groceryStores', JSON.stringify(defaultGroceryStores));
        }
    }, []);

    const cheapestItems = useMemo(() => {
        const map = new Map();

        groceryStores.forEach(store => {
            store.items.forEach(item => {
                const currentCheapest = map.get(item.type);
                const roundedPricePerOz = roundToCent(item.pricePerOz);

                if (!currentCheapest) {
                    map.set(item.type, [{ ...item, storeName: store.name, roundedPricePerOz }]);
                } else {
                    if (currentCheapest[0].roundedPricePerOz === roundedPricePerOz) {
                        currentCheapest.push({ ...item, storeName: store.name, roundedPricePerOz });
                    } else if (currentCheapest[0].roundedPricePerOz > roundedPricePerOz) {
                        map.set(item.type, [{ ...item, storeName: store.name, roundedPricePerOz }]);
                    }
                }
            });
        });

        return map;
    }, [groceryStores]);

    const { uniqueItems, uniqueBrands } = useMemo(() => {
        const itemSet = new Set();
        const brandSet = new Set();

        groceryStores.forEach(store => {
            store.items.forEach(item => {
                itemSet.add(item.type);
                brandSet.add(item.brand);
            });
        });

        return {
            uniqueItems: Array.from(itemSet).sort(),
            uniqueBrands: Array.from(brandSet).sort(),
        };

    }, [groceryStores]);

    const getTooltipContent = (item) => {
        const cheapest = cheapestItems.get(item.type);
        if (!cheapest) return { tooltipText: 'No price comparison available', tooltipColorVariant: 'warning', specialIcon: '❓' };

        const roundedPricePerOz = roundToCent(item.pricePerOz);
        const isCheapest = cheapest.some(cheapestItem => cheapestItem.roundedPricePerOz === roundedPricePerOz);
        const isTiedForCheapest = cheapest.length > 1 && isCheapest;

        let tooltipText = 'This the best price for this item';
        let tooltipColorVariant = 'success';
        let specialIcon = '🌟';

        if (!isCheapest) {
            tooltipText = notCheapestItemToolTip(cheapest, item);
            tooltipColorVariant = 'danger';
            specialIcon = '⛔';
        } else if (isTiedForCheapest) {
            tooltipText = 'Tied for cheapest item with';
            cheapest.forEach((cheapItem, index) => {
                tooltipText += index > 0 ? ` and ${cheapItem.storeName}` : ` ${cheapItem.storeName}`;
            });
            specialIcon = '⭐';
        }

        const deleteToolTip = `Delete ${item.brand} ${item.type} added ${item.dateAdded}`;

        return { tooltipText, tooltipColorVariant, specialIcon, deleteToolTip };
    };

    const notCheapestItemToolTip = (cheapestItemsArray, currentItem) => {
        let output = `${currentItem.type} - Cheaper`;
        let currentPrice = roundToCent(currentItem.pricePerOz);

        cheapestItemsArray.forEach((item, index) => {
            let savingsPercentage = 100 - (Math.round((item.roundedPricePerOz / currentPrice) * 100));
            //checks so we can add 'or' if extra stores are added
            if (index > 0) output += ' or'
            //changes store name based if current item is in current store
            output += item.parentId === currentItem.parentId ?
                ` elsewhere here` : ` at ${item.storeName}`;
            output += ` for \$${item.pricePerOz.toFixed(2)} @ \$${item.cost}`;
            output += ` versus here for \$${currentItem.pricePerOz.toFixed(2)} @ \$${currentItem.cost}`;
            output += ` (a savings of ${savingsPercentage}%)`;
        })

        return output;
    };

    const handleHighlightCheapestChange = (isChecked) => {
        setHighlightCheapest(isChecked);
    };

    const handleAddStore = (storeData) => {
        setGroceryStores(currentStores => {
            const newStore = new GroceryStore(
                Date.now(),
                storeData.name,
                storeData.address,
                storeData.zip
            );
            const updatedStores = [...currentStores, newStore];
            localStorage.setItem('groceryStores', JSON.stringify(updatedStores));
            return updatedStores;
        });
    };

    const handleAddItemToStore = (storeId, itemData) => {
        setGroceryStores(currentStores => {
            const updatedStores = currentStores.map(store => {
                if (store.id === storeId) {
                    const newGroceryItem = new GroceryItem(
                        Date.now(),
                        itemData.type,
                        itemData.brand,
                        itemData.cost,
                        itemData.size,
                        itemData.sizeType,
                        store.id
                    );
                    return { ...store, items: [...store.items, newGroceryItem] };
                }
                return store;
            });
            localStorage.setItem('groceryStores', JSON.stringify(updatedStores));
            return updatedStores;
        });
    };

    const handleRemoveItemFromStore = (storeId, itemId) => {
        setGroceryStores(currentStores => {
            const updatedStores = currentStores.map(store => {
                if (store.id === storeId) {
                    const filteredItems = store.items.filter(item =>

                        item.id !== itemId);
                    return { ...store, items: filteredItems };
                }
                return store;
            });
            localStorage.setItem('groceryStores', JSON.stringify(updatedStores));
            return updatedStores;
        });
    };

    const handleDeleteStore = (storeId) => {
        setGroceryStores(currentStores => {
            const updatedStores = currentStores.filter(store => store.id !== storeId);
            localStorage.setItem('groceryStores', JSON.stringify(updatedStores));
            return updatedStores;
        });
    };

    const handleChangeItemsPerPage = (store, newItemsPerPage) => {
        const updatedStore = { ...store, pageSize: parseInt(newItemsPerPage) };
        const updatedStores = groceryStores.map(s => s.id === store.id ? updatedStore : s);
        setGroceryStores(updatedStores);
        localStorage.setItem('groceryStores', JSON.stringify(updatedStores));
    };

    return (
        <div>
            <h1>Keep track of your grocery items and save money!</h1>
            <Row>
                <CustomTooltip tooltipText='(treats price per ounce and price per unit the same in comparisons)'>
                    <Col xs='auto'>
                        <Checkbox
                            label={'Mark cheapest items (adds icons with tooltips)'}
                            checked={highlightCheapest}
                            onCheckboxChange={handleHighlightCheapestChange} />
                    </Col>
                </CustomTooltip>
            </Row>
            <div>
                {groceryStores.map(store => (
                    <GroceryStoreCard
                        key={`grocery-store-card-${store.id}`}
                        store={store}
                        highlightCheapest={highlightCheapest}
                        onAddItem={handleAddItemToStore}
                        onDeleteItem={handleRemoveItemFromStore}
                        onDeleteStore={handleDeleteStore}
                        onChangeItemsPerPage={handleChangeItemsPerPage}
                        itemList={uniqueItems}
                        brandList={uniqueBrands}
                        getTooltipContent={getTooltipContent}
                    />
                ))}
            </div>
            <h2>Add a new grocery store</h2>
            <AddGroceryStoreForm onSubmit={handleAddStore} />
        </div>
    )
}

export default GroceryListPage;