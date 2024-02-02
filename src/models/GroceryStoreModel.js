export default function GroceryStore(id, name, address, zip){
    this.id = id;
    this.name = name;
    this.address = address;
    this.zip = zip;
    this.items = [];
    this.pageSize = 10;
};