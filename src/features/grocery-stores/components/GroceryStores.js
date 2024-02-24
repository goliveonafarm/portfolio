import { useEffect, useMemo } from "react";
import defaultGroceryStores from "../data/defaultGroceryStores";
import GroceryStoreCard from "./GroceryStoreCard";
import { roundToCent } from "../../../utils";

import { handleAddItemToStore, handleRemoveItemFromStore, handleDeleteStore, handleChangeItemsPerPage } from "../controllers/grocerystore.controller";

const GroceryStores = ({ highlightCheapest, groceryStores, setGroceryStores }) => {
    useEffect(() => {
        const loadedStores = localStorage.getItem('groceryStores');

        if (loadedStores && JSON.parse(loadedStores).length > 0) {
            setGroceryStores(JSON.parse(loadedStores));
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
        let savingsPercentage = 0;
        cheapestItemsArray.forEach((item, index) => {
            savingsPercentage = 100 - (Math.round((item.roundedPricePerOz / currentPrice) * 100));
            //checks so we can += 'or' to output if extra stores are added
            if (index > 0) output += ' or'
            //changes store name based if current item is in current store
            output += item.parentId === currentItem.parentId ?
                ` elsewhere here` : ` at ${item.storeName}`;
            output += ` for \$${item.pricePerOz.toFixed(2)} @ \$${item.cost}`;
        })
        output += ` - versus this item for \$${currentItem.pricePerOz.toFixed(2)} @ \$${currentItem.cost}`;
        output += ` (a savings of ${savingsPercentage}%)`;
        
        return output;
    };

    return (
        <div>{groceryStores.map(store => (
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
                groceryStores={groceryStores}
                setGroceryStores={setGroceryStores}
            />
        ))}</div>
    )
}

export default GroceryStores;