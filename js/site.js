// a object to store the current state of the site
var state = {
    vendors: [],
    categories: [],
};

// init method
function init() {
    // initilize the site

    // fetch the data
    const data = fetchCSV('data/vendors.csv');
    // loop through the data
    data.forEach(function(vendor) {
        state.vendors.push(new Vendor(...vendor.split(',')));
        state.vendors[state.vendors.length - 1].category.forEach((vendorCategory) => {
            if (!state.categories.includes(vendorCategory)) {
                state.categories.push(vendorCategory);
            }
        });
    });

    renderCategoryCheckboxes(state.categories);
}

function renderCategoryCheckboxes(categories) {
    // render the category checkboxes
    const categoryCheckboxes = document.querySelector('.category-checkboxes');
    categories.forEach(function(category) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'category';
        checkbox.value = category;
        checkbox.id = category;
        checkbox.className = 'category-checkbox';
        categoryCheckboxes.appendChild(checkbox);
        const label = document.createElement('label');
        label.htmlFor = category;
        label.innerHTML = uppercaseFirstLetter(category);
        categoryCheckboxes.appendChild(label);
    });
}

// A class to store the data of a vendor
class Vendor {
    constructor(name, category, url, bcorp) {
        this.name = name;
        this.category = category.split('|');
        this.url = url;
        this.bcorp = bcorp.substring(0,4) === 'TRUE';
    }
}

// function which makes the first letter of a string uppercase
function uppercaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCheckedCategoriesFromForm(checkboxes) {
    return [...document.search.category].filter((check) => check.checked).map((check) => check.value);
}

// a search funciton
function search(state, term, categories, bcorp) {
    // open a new window with the search results for the term
    state.vendors.forEach(function(vendor) {
        categories.forEach(function(category) {
            if (!vendor.category.includes(category) || (!!document.search.bcorp.checked && !vendor.bcorp)) return;
            window.open(`${vendor.url}${term}`);
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
