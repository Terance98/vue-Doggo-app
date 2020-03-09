
const fetch = require('node-fetch')
// const _ = require('lodash')

const results = fetch("https://dog.ceo/api/breeds/list/all").then(res => res.json())

const allBreedsArrayPromise = results.then(res => {
    const op = res.message;
    const names = [];
    const map = new Map(Object.entries(op));
    map.forEach((subcategories, breed) => {
        if (subcategories.length > 0) {
            const filteredName = subcategories.map(item => item + " " + breed);
            names.push(...filteredName)
        } else {
            names.push(breed)
        }
    });
    return names;
}).catch(err => err);

export default {
    allBreedsArrayPromise
}
