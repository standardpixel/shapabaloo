// a object to store the current state of the site
var state = {
    vendors: [],
};

// init method
function init() {
    // initilize the site

    // fetch the data
    const data = fetchCSV('data/vendors.csv');
    // loop through the data
    data.forEach(function(vendor) {
        state.vendors.push(vendor.split(','));
    });
}   // end init

function getCheckedCategoriesFromForm(checkboxes) {
    return [...document.search.categories].filter((check) => check.checked).map((check) => check.value);
}

// a search funciton
function search(state, term, categories, bcorp) {
    // open a new window with the search results for the term
    state.vendors.forEach(function(vendor) {
        categories.forEach(function(category) {
            const categories = vendor[1].split('|');
            if (categories.length && !categories.split('|').includes(category)) return;
            window.open(`${vendor[2]}${term}`);
        });
    });
}


// fetch data and return an array of objects
function fetchCSV(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    if (request.status === 200) {
        return request.responseText.split('\n');
    } else {
        return [];
    }
}
