const sortItems = (items, criteria, direction = 'asc') => {
    return items.sort((a, b) => {

        if (criteria.toLowerCase().includes('date')) {
            const dateA = new Date(a[criteria]);
            const dateB = new Date(b[criteria]);
            if (dateA < dateB) return direction === 'asc' ? -1 : 1;
            if (dateA > dateB) return direction === 'asc' ? 1 : -1;
            return 0;
        } else {
            if (a[criteria] < b[criteria]) return direction === 'asc' ? -1 : 1;
            if (a[criteria] > b[criteria]) return direction === 'asc' ? 1 : -1;
            return 0;
        }
    });
};

export default sortItems;