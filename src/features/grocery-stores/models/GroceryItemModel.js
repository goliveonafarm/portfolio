import { convertToPricePerOz } from '../utils/conversionUtils';

 class GroceryItem {
    constructor(id, type, brand, cost, size, sizeType, storeId) {
        this.id = id;
        this.type = type;
        this.brand = brand;
        this.cost = parseFloat(cost);
        this.size = parseFloat(size);
        this.sizeType = sizeType;
        this.parentId = storeId;
        this.pricePerOz = convertToPricePerOz(cost, size, sizeType);
        this.dateAdded = (new Date(Date.now())).toLocaleDateString("en-US");
    }
};

export default GroceryItem;