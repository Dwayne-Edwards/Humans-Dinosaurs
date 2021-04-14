import dinos from './dino.js';
import dom$ from './modules/domcahce.js';
import formValidation from './modules/form.js';
import { toggleUnitsAndValues, normalizeHeight,
        normalizeWeight } from './modules/units.js';

import { makeComparison } from './modules/compare.js'

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
    
// // Create store DOM elements in a object to simplify interactions
// const dom$ = (function() {
//     let elements = {};
//     function addElement(key, element){
//         elements[key] = element;
//     };
//     function getElement(id){
//         return document.getElementById(id);
//     };

//     function toggleElemet(id){
//         let el = document.getElementById(id)
//         el.style.display === 'none' ? el.style.display = 'block' : el.style.display = 'none';
//     }

//     function createElement(el, id, className){
//         let element = document.createElement(el);
//         element.id = id || "";
//         element.className = className || "";
//         return element;    
//     }
//     function createTextNode(content){
//         let element = document.createTextNode(content);
//         element.createTextNode = content || '';
//         return element;    
//     }

//     return {
//         add: addElement,
//         get: getElement,
//         toggle: toggleElemet,
//         create: createElement,
//         textNode: createTextNode

//     }
// })();


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


// function imperialMetricSwap(id, height, weight, unit){
//     let isImperial = unit === 'imperial';
//     if(id === 'unit'){ return isImperial ? 'metric' : 'imperial'};
//     if(id === 'feet'){ return isImperial ? Math.floor(height / 100) : Math.floor(height / 12)};
//     if(id === 'inches'){ return isImperial ?  Math.floor(height % 100) : Math.floor(height % 12)};
//     if(id === 'weight'){ return isImperial ?  Math.round(weight / 2.203) : Math.round(weight * 2.203)};
//     return;
// }


// function toggleValues(height, weight, unit, elementIds) { 
//     elementIds.forEach( id => {
//         dom$.get(id).value = imperialMetricSwap(id, height, weight, unit);
//     });

// };


// //   Toggle the form's displayed units and update the [unit] checkbox value   
// function toggleUnits(unit) { 
//     let isImperial = unit === 'imperial';
//     dom$.get('unitLabel').innerText = isImperial ? 'Uncheck for imperial': 'Switch to metric';
//     dom$.get('heightLabelFT').innerText = isImperial ? 'Meters: ': 'Feet: ';
//     dom$.get('heightLabelIN').innerText = isImperial ? 'Cm: ' : 'Inches: ';
//     dom$.get('weightLabel').innerText = isImperial ? 'kgs' : 'lbs';
// };


// function reduceToInches(ft, inches){
//     return parseInt(ft, 10) * 12 + parseInt(inches, 10);
// }

// function reduceToCentimeters(m, cm){
//     return parseInt(m, 10) * 100 + parseInt(cm, 10)
// }

// function toggleHeight(height, unit){
//     if(unit === 'imperial'){
//         return Math.round(parseInt(height, 10) * 2.54)
//     } 
//     return Math.round(parseInt(height, 10) / 2.54);
// }

// function toggleUnitsAndValues(h1, h2, weight, unit, elementIds){
//     let height = 0;
//     if(unit === 'imperial'){
//         height =  reduceToInches(h1, h2);
//     } else {
//         height = reduceToCentimeters(h1, h2);
//     }
//     toggleValues(toggleHeight(height || 0, unit), weight, unit, elementIds);
//     toggleUnits(unit);
// }

// // Normalize the comparing values
// // Imperial is reduced to inches
// // Metric is reduced to centimeters
// function normalizeHeight(num, unit){
//     let height;
//         // If user is using imperial units
//         if(unit === 'imperial' && Array.isArray(num)){
//             return height =  reduceToInches(num[0], num[1]);
//         }
//         // User is using  metric units
//         if(unit !== 'imperial' && Array.isArray(num)){
//             return height =  reduceToCentimeters(num[0], num[1]);
//         }

//         // If values are in imperial and the user is using metric
//         if(unit !== 'imperial'){
//            return height = toggleHeight(parseInt(num), 'imperial');
//         }
      
//     // Otherwise return the the input value
//     return height = parseInt(num);
    
// };

// function normalizeWeight(num, unit){
//     let weight;
//         // If user is using metric units
//         if(unit === 'metric'){
//             return weight =  parseFloat(num) / 2.203;
//         }
//     // Otherwise return the the input value
//     return weight = parseFloat(num);
// };
  

// const compare = (function(){
//     function getComparisonPhrase (x, y, type, unit){
//         let username = y['name'].split(' ')[0];
//         x.diet = x.diet.toLowerCase();
//         y.diet = y.diet.toLowerCase();
//         x.where = x.where.toLowerCase();
//         y.where = y.where.toLowerCase();
//         let comparison = {   

//             // weight
//             weight: x.weight > y.weight ? `${x.name} weighs ${x.weight - y.weight } ${unit} more than ${username}` 
//                                         : `${username} weighs ${y.weight - x.weight } ${unit} more than ${x.name}`,
            
//             // height
//             height: x.height > y.height ? `${x.name} is ${x.height - y.height} ${unit} taller than ${username}`
//                                         : `${username} is ${y.height - x.height} ${unit} taller than ${x.name}`,

//             // diet
//             diet: x.diet === y.diet ? `${x.name} and ${username} are both ${y.diet}`
//                                     : `${x.name} is ${x.diet} but ${username} is a  ${y.diet}`,

//             // location
//             where: x.where === y.where  ? `${x.name}  and ${username} are connected with ${y.where}`
//                                         : `${x.name} location: ${x.where} and ${username} location is ${y.where}`,

//             // name - alphabetically ranked a..z
//             name: x.name < username ? `Alphabetically ${x.name} comes before ${username}`
//                                     : `Alphabetically ${username} comes before ${x.name}`,

//             // provide a fact or time period as an alternative
//             fact: `${x.fact}`,
//             when: `${x.name} lived during the ${x.when} period`,
//         }
//         return comparison[type];
//     };
//     return { get: getComparisonPhrase };
// })();


// const makeComparison = function (compareObj, userObj, objectKey, comparisonUnit){
//     let comparison = '';
//     let unit;
//     if(objectKey === 'height'){
//         unit = comparisonUnit === 'imperial' ? 'inches' : 'centimeters';
//     } else if(objectKey === 'weight'){
//         unit = comparisonUnit === 'imperial' ? 'lbs' : 'kgs';
//     }
//     comparison = compare.get(compareObj, userObj, objectKey, unit);
 
//     return comparison;
// };

    
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
            const gridItemInfoBox = dom$.create('div', `${(item.species).toLowerCase()}-info`, 'grid-item-info')
            
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

// // Add form Validation
// const formValidation = (function () {
//     let formFields = {
//         name: false,
//         feet: false,
//         inches: false,
//         weight: false
//     }
//     function markInvalid(id){
//         let element = dom$.get(id);
//         element.className += " form-field_invalid";
//         element.className = element.className.replace(/\bform-field_valid\b/g, "");
//     }

//     function markValid(id){
//         let element = dom$.get(id);
//         element.className += " form-field_valid";
//         element.className = element.className.replace(/\bform-field_invalid\b/g, "");
//     }

//     function checkValidity(id, value){
//         switch(id){
//             case 'name':
//                 if(value.length < 1 || value === ' '){
//                     markInvalid(id);
//                     return false;
//                 }
//                 markValid(id);
//                 return true;
//             case 'feet':
//             case 'inches':
//                 let height = parseInt(dom$.get('feet').value, 10) + parseInt(dom$.get('inches').value, 10)
//                 if( height > 0){
//                     formFields['feet'] = true;
//                     formFields['inches'] = true;
//                     markValid('feet');
//                     markValid('inches');
//                     return true;
//                 } else {
//                     formFields['feet'] = false;
//                     formFields['inches'] = false;
//                     markInvalid('feet');
//                     markInvalid('inches'); 
//                     return false;
//                 };
                
//             case 'weight':
//                 if(isNaN(value) || value < 1){
//                     markInvalid(id);
//                     return false;
//                 }
//                 markValid(id);
//                 return true;
//         }
//     }

//     function setState(id, value){
//         formFields[id] = checkValidity(id, value);
//     }

//     function validateFormState(){
//         let state = true;
//         for(const element in formFields){
//             if(formFields[element] === false){
//                 state = false;
//             }
//         };
//         return state;
//     }

//     return {
//         get: validateFormState,
//         set: setState
//     }
// })();


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
dom$.get('name').onchange = () => formValidation.set('name', dom$.get('name').value)
dom$.get('weight').onchange = () => formValidation.set('weight', dom$.get('weight').value)
dom$.get('feet').onchange = () => formValidation.set('feet', dom$.get('feet').value)
dom$.get('inches').onchange = () => formValidation.set('inches', dom$.get('inches').value) 
    
    
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