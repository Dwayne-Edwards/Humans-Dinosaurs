import dinos from './dino.js';
import dom$ from './modules/domcahce.js';
import formValidation from './modules/form.js';
import { toggleUnitsAndValues, normalizeHeight,
        normalizeWeight } from './modules/units.js';

import { makeComparison } from './modules/compare.js';

// Create Dino Constructor
function Dinosaur (dino){
    let comparison = null;
    this.species = dino.species || null;
    this.name = dino.species || null;
    this.weight = dino.weight || null;
    this.height = dino.height || null;
    this.diet = dino.diet || null;
    this.where = dino.where || null;
    this.when = dino.when || null;
    this.fact = dino.fact || null;
    this.setComparisonToHuman = function(set){
        comparison = set;
    }
    this.getComparison = function(){
        return comparison;
    }
}

// Create Dino Objects from import dinosuar array of objects
const Dinosaurs = (function(){
    let dinosaurs = [];
    dinos['Dinos'].forEach(dino => {
        dinosaurs.push(new Dinosaur(dino));
    });

    return dinosaurs;
})();



// Create userObj Object and populate properties when [compare button] is clicked
// Use IIFE to get userObj data from form
const userData = (function() {
    let data = {};
    function set(key, value){
        data[key] = value;
    };
    data['set'] = set;
    return data;
})();


// Insert an item in the middle of an array
function arrayMiddleInsert(array, middleItem){
    let middle = Math.floor(array.length / 2);
    array.splice(middle, 0, middleItem);
    return array;
}

// Shuffle an array of any length
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}



// Generate Tiles for each Dino in Array
function generateTileGrid(dino, userObj, unit){
    let keys = ['name', 'height', 'weight', 'diet', 'where'];

    // normalize user height and weight before comparison
    userObj.height = normalizeHeight(userObj.height, unit);
    let items = arrayMiddleInsert(shuffleArray(dino), userObj);
    items.forEach(item => {
        let objectKey = shuffleArray(keys)[0];

        if(item instanceof Dinosaur){
            item.height = normalizeHeight(item.height, unit);
            item.weight = normalizeWeight(item.weight, unit);
            item.setComparisonToHuman(makeComparison(item, userObj, objectKey, unit));
        }
            // create new Grid Item elements
            const gridItem = dom$.create('div', "grid-item", "grid-item");

            // create title element
            const gridItemTitle = dom$.create('h3');
            const titleText = dom$.textNode(item.name || item.species );
            gridItemTitle.appendChild(titleText);
            gridItem.appendChild(gridItemTitle);

            // Create comparison to User
            const gridItemComparison = dom$.create('div', `grid-${item.species}-comparison`, 'grid-comparison');
            const comparisonText = item.species.toLowerCase() !== 'human' ? dom$.textNode(item.getComparison()) : dom$.textNode('');
            gridItemComparison.appendChild(comparisonText);
            gridItem.appendChild(gridItemComparison);

            // Create and add image
            const gridItemImage = dom$.create('img', 'species-diet', 'full-info');
            gridItemImage.src = `/images/${item.species.toLowerCase()}.png`;
            gridItem.appendChild(gridItemImage);

            // create grid infobox
            const gridItemInfoBox = dom$.create('div', `${(item.species).toLowerCase()}-info`, 'grid-item-info');

            // create and add Height and Weight Information
            let gridItemContent = {
                heightWeight : `Height: ${item.height}  |  weight: ${item.weight} pounds`,
                dietLocation : `Diet: ${item.diet}  |  Location: ${item.where}`,
                timeSpan : `Time Period: ${item.when}`,
                speciesFact : item.fact,
            };

            for(const content in gridItemContent){
                let element = dom$.create('p');
                if(content !== 'speciesFact'){
                    element.className += " extra-content";
                }
                let text = dom$.textNode(gridItemContent[content]);
                element.appendChild(text);
                gridItemInfoBox.appendChild(element);
            }

            gridItem.appendChild(gridItemInfoBox);

            // add the newly created element and its content into the DOM
            dom$.get('grid').appendChild(gridItem);
    })
}



// Toggle form units between Imperial and Metric
dom$.get('unit').onclick = () => {
    toggleUnitsAndValues(
        dom$.get('feet').value,
        dom$.get('inches').value,
        dom$.get('weight').value,
        dom$.get('unit').value,
        ['feet', 'inches', 'weight', 'unit']
    );
}

// Realtime form validation feedback
dom$.get('name').onchange = () => formValidation.set('name', dom$.get('name').value);
dom$.get('weight').onchange = () => formValidation.set('weight', dom$.get('weight').value);
dom$.get('feet').onchange = () => formValidation.set('feet', dom$.get('feet').value);
dom$.get('inches').onchange = () => formValidation.set('inches', dom$.get('inches').value);

// On button click, prepare and display infographic
dom$.get('btn').addEventListener('click', function() {
    // TODO: add toggleButton Fuction - use for compare/reset buttons
    if(formValidation.get(dom$.get('btn'))){
        let formData = {
            species: 'Human',
            name: dom$.get('name').value,
            weight: dom$.get('weight').value,
            height: [parseInt(dom$.get('feet').value), parseInt(dom$.get('inches').value)],
            diet: dom$.get('diet').value,
            where: dom$.get("where").value,
            fact: "Dinosaurs believe Humans to be the most stupid things"
        }
        for (const [key, value] of Object.entries(formData)) {
            userData.set(key, value);
        }
        generateTileGrid(Dinosaurs, userData, dom$.get('unit').value)
        // Toggle HTML Element diplay property
        dom$.toggle("dino-compare");
    } else{
        dom$.get('error-message').className += " form_invalid";
    }
});