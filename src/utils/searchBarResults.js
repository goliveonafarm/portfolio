const searchBarResults = (arrayOfStrings, query) => {
    arrayOfStrings.sort();
    const resultsArray = arrayOfStrings.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );
    return  resultsArray.splice(0, 5);
};

export default searchBarResults;