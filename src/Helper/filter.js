
function isFirstGreater(x, y) {
    if (x >= y)
        return 1;

    return -1;
}

export const sortedData = (data, action) => {
    if (action.sortBy === 'last') {

        if (action.field === 'created') {
            data.sort((a, b) => {
                return isFirstGreater(parseInt(a.created), parseInt(b.created))
            });
        }

        else if (action.field === 'modified') {
            data.sort((a, b) => {
                return isFirstGreater(parseInt(a.modified), parseInt(b.modified))
            });
        }
        else if (action.field === 'name') {
            data.sort((a, b) => {
                // Compare the 'name' values using localeCompare() for alphabetical sorting
                return b.name.localeCompare(a.name);
            });
        }
    }
    if (action.sortBy === 'first') {

        if (action.field === 'created') {
            data.sort((a, b) => {
                return isFirstGreater(parseInt(b.created), parseInt(a.created))
            });
        }
        else if (action.field === 'modified') {
            data.sort((a, b) => {
                return isFirstGreater(parseInt(b.modified), parseInt(a.modified))
            });
        }
        else if (action.field === 'name') {
            data.sort((a, b) => {
                // Compare the 'name' values using localeCompare() for alphabetical sorting
                return a.name.localeCompare(b.name);
            });
        }

    }

    return data;
}

export default function filterFiles(data, action) {
    
    return data.filter(file => action.includes(file.type.toUpperCase()))        
    
}

export const filterAvailable = data => ['All',...new Set(data.map(file => file.type.toUpperCase()))];    