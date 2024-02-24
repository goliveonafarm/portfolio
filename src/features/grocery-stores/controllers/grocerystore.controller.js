import GroceryItem from '../models/GroceryItemModel';
import GroceryStore from '../models/GroceryStoreModel';

export const handleAddItemToStore = (setGroceryStores, storeId, itemData) => {
    setGroceryStores(groceryStores => {
        const updatedStores = groceryStores.map(store => {
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

export const handleRemoveItemFromStore = (setGroceryStores, storeId, itemId) => {
    setGroceryStores(groceryStores => {
        const updatedStores = groceryStores.map(store => {
            if (store.id === storeId) {
                const filteredItems = store.items.filter(item => item.id !== itemId);
                return { ...store, items: filteredItems };
            }
            return store;
        });
        localStorage.setItem('groceryStores', JSON.stringify(updatedStores));
        return updatedStores;
    });
};

export const handleDeleteStore = (setGroceryStores, storeId) => {
    setGroceryStores(groceryStores => {
        const updatedStores = groceryStores.filter(store => store.id !== storeId);
        localStorage.setItem('groceryStores', JSON.stringify(updatedStores));
        return updatedStores;
    });
};

export const handleAddStore = (setGroceryStores, storeData) => {
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
}

export const handleChangeItemsPerPage = (setGroceryStores, storeId, newItemsPerPage) => {
    setGroceryStores(currentStores => {
        const updatedStores = currentStores.map(s => {
            if (s.id === storeId) {
                return { ...s, pageSize: parseInt(newItemsPerPage) };
            }
            return s;
        });
        localStorage.setItem('groceryStores', JSON.stringify(updatedStores));
        return updatedStores;
    });
}
