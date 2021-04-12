import dinos from './dino.js';
    
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
    
// Create store DOM elements in a object to simplify interactions
function DomCache() {
    let elements = {};
    this.add = function(key, element){
        elements[key] = element;
    };
    this.get = function(id){
        // return elements[key];
        return document.getElementById(id);
    };

    this.toggle = function (id){
        let el = document.getElementById(id)
        el.style.display === 'none' ? el.style.display = 'block' : el.style.display = 'none';
    }

    this.create = function(el, id, className){
        let element = document.createElement(el);
        element.id = id;
        element.className = className;
        return element;    
    }
    this.textNode = function(content){
        let element = document.createTextNode(content);
        element.createTextNode = content || '';
        return element;    
    }
};

const dom$ = new DomCache();

const domElements = {
    unit: document.getElementById("unit"),
    name: document.getElementById("name"),
    weight: document.getElementById("weight"),
    // height: [document.getElementById("feet"), document.getElementById("inches")],
    feet: document.getElementById("feet"),
    inches: document.getElementById("inches"),
    diet: document.getElementById("diet"),
    where: document.getElementById("where"),
    
    compare: document.getElementById("btn"),
    grid: document.getElementById('grid'),

    // Form Labels
    unitLabel: document.getElementById("unitLabel"),
    heightLabelFT: document.getElementById("heightLabelFT"),
    heightLabelIN: document.getElementById("heightLabelIN"),
    weightLabel: document.getElementById("weightLabel"),
}

for (const element in domElements){
    dom$.add(element, domElements[element]);
}


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



function toggleUnitValues(height, weight, unit) { 
    let isImperial = unit === 'imperial';
    dom$.get('unit').value = isImperial ? 'metric' : 'imperial';
    dom$.get('feet').value = isImperial ? Math.floor(height / 100) : Math.floor(height / 12);
    dom$.get("inches").value = isImperial ?  Math.floor(height % 100) : Math.floor(height % 12);
    dom$.get("weight").value = isImperial ?  Math.round(weight / 2.203) : Math.round(weight * 2.203);
};


//   Toggle the form's displayed units and update the [unit] checkbox value   
function toggleUnits(unit) { 
    let isImperial = unit === 'imperial';
    dom$.get('unitLabel').innerText = isImperial ? 'Uncheck for imperial': 'Switch to metric';
    dom$.get('heightLabelFT').innerText = isImperial ? 'Meters: ': 'Feet: ';
    dom$.get('heightLabelIN').innerText = isImperial ? 'Cm: ' : 'Inches: ';
    dom$.get('weightLabel').innerText = isImperial ? 'kgs' : 'lbs';
};

function convertHeight(height, unit){
    if(unit === 'imperial'){
        return Math.round(height * 2.54)
    } 
    return Math.round(height / 2.54);
}

function toggleUnitsAndValues(unit = dom$.get('unit').value){
    let h1 = dom$.get('feet').value || 0;
    let h2 = dom$.get('inches').value || 0;
    let height = 0;

    if(unit === 'imperial'){
        height = parseInt(h1, 10) * 12 + parseInt(h2, 10); 
    } else {
    height = parseInt(h1, 10) * 100 + parseInt(h2, 10);
    }
    
    let convertedHeight = convertHeight(height, unit)
    let weight = dom$.get('weight').value;
    
    toggleUnitValues(convertedHeight, weight, unit);
    toggleUnits(unit);
    
}





// Helper functions
function isValidKey(key, validKeys = Object.keys(userData)){
    return validKeys.includes(key);
}
function convertToInteger(n){
    if(!n){return};
    return parseInt(n);
}

function convertToString(str){
    if(!str){return};
    return str.toString();
}
    
    
const makeComparison = function (compareObj, userObj, objectKey, comparisonUnit){
    
    let previouslyUsedKeys = [];
    let comparison = '';
    let compareObjValue = compareObj[objectKey];
    let userObjValue = userObj[objectKey];
    let userFirstName = userObj['name'].split(' ')[0];
    let unit;
    if(objectKey === 'height'){
        unit = comparisonUnit === 'imperial' ? 'inches' : 'centimeters';
    } else if(objectKey === 'weight'){
        unit = comparisonUnit === 'imperial' ? 'lbs' : 'kgs';
    }
    if(isValidKey(objectKey) && !previouslyUsedKeys.includes(objectKey)){
        
        switch(objectKey){
            case 'species':
                objectKey = !previouslyUsedKeys.includes('height') ? 'height' : 'diet';
            case 'height':
            case 'weight':
                if(typeof compareObjValue === "string"){compareObjValue = convertToInteger(compareObjValue);}
                if(typeof userObjValue === "string"){userObjValue = convertToInteger(userObjValue);} 
                if(compareObjValue > userObjValue){
                    comparison = `${compareObj.name} ${objectKey} is about 
                    ${compareObj.height - userObj.height} ${unit} more than ${userFirstName}`
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                }
                comparison = `${compareObj.name} ${objectKey} is about 
                ${userObj.height - compareObj.height} ${unit} less than ${userFirstName}`
                
                previouslyUsedKeys.push(objectKey);
                break;
            
            case 'diet':
            case 'where':
                if(typeof compareObjValue === "number"){compareObjValue = convertToString(compareObjValue);}
                if(typeof userObjValue === "number"){userObjValue = convertToString(userObjValue);}
                
                if(compareObjValue.toLowerCase() === userObjValue.toLowerCase() 
                || compareObjValue.toLowerCase().includes(userObjValue.toLowerCase())){
                    comparison = objectKey === 'diet' ? `${compareObj.name} and ${userFirstName} are both ${userObj.diet}` 
                    : `${compareObj.name} and ${userFirstName} have ${compareObj.where} in common`
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                }
                comparison = objectKey === 'diet' ? `${compareObj.name} is a ${compareObj.diet} unlike ${userFirstName} the ${userObj.diet}`
                : `${compareObj.name} location: ${compareObj.where} and ${userFirstName} is: ${userObj.where}`
                
                previouslyUsedKeys.push(objectKey);  
                break;
            
            case 'name':
                if(typeof compareObjValue === "number"){compareObjValue = convertToString(compareObjValue);}
                if(typeof userObjValue === "number"){userObjValue = convertToString(userObjValue);}
                if(compareObjValue.toLowerCase() < userObjValue.toLowerCase()){
                    comparison = `Alphabetically ${compareObj.name} comes before ${userFirstName}`;
                    
                    previouslyUsedKeys.push(objectKey); 
                    break;
                } else if(compareObjValue.toLowerCase() > userObjValue.toLowerCase()){
                    comparison = `Alphabetically ${userFirstName} comes before ${compareObj.name}`; 

                    previouslyUsedKeys.push(objectKey); 
                    break;
                } else {
                    comparison = (compareObj.name).length > (userObj.name).length ? `${compareObj.name} name is longer than ${userFirstName}`
                    : `${compareObj.name} name is not longer than ${userFirstName}`;
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                }
                
            default:
                break;
        }
    } else {
        let fact = Math.floor(Math.random() * 5)
        let when = Math.floor(Math.random() * 5)
        comparison = fact > when ? `Fact:  ${compareObj.fact}` : `${compareObj.species} lived during the ${compareObj.when} period`;
                
        previouslyUsedKeys.push(objectKey);
    }
    return comparison;
};


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    
    // Insert an item in the middle of an array of any length
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
    let keys = ['species', 'name', 'height', 'weight', 'where'];
    let items = arrayMiddleInsert(shuffleArray(dino), userObj);
    items.forEach(item => {
        if(item instanceof Dinosaur){
            // TODO: Check for pigeon object
            let randomKey = shuffleArray(keys)[0];
            item.setComparisonToHuman(makeComparison(item, userObj, randomKey, unit));
        }
            // create new Grid Item elements
            const gridItem = dom$.create('div', "grid-item", "grid-item");
        
            // and create title
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
            
            let gridItemContent = {
                // create and add Height + Weight Info
                heightWeight : `Height: ${item.height}  |  weight: ${item.weight} pounds`,
                dietLocation : `Diet: ${item.diet}  |  Location: ${item.where}`,
                timeSpan : `Time Period: ${item.when}`,
                speciesFact : item.fact,
            };

            for(const content in gridItemContent){
                let element = dom$.create('p');
                let text = dom$.textNode(gridItemContent[content]);
                element.appendChild(text);
                gridItemInfoBox.appendChild(element);
            }
            
            gridItem.appendChild(gridItemInfoBox);
          
            // add the newly created element and its content into the DOM
            dom$.get('grid').appendChild(gridItem);
         
    })
} 

 


// Add form Validation
const formValidation = (function () {
    let formFields = {
        name: false,
        feet: false,
        inches: false,
        weight: false
    }

    // change button to read with a message
    // Hightlight the input field with a red border
    // Reset the input to default
    function markInvalid(id){
        let element = dom$.get(id);
        element.value = null;
        element.className += " form-field_invalid";
        element.className = element.className.replace(/\bform-field_valid\b/g, "");
    }
    function markValid(id){
        let element = dom$.get(id);
        element.className += " form-field_valid";
        element.className = element.className.replace(/\bform-field_invalid\b/g, "");

    }
    function checkValidity(id, value){
        switch(id){
            case 'name':
                if(value.length < 1 || value === ' '){
                    markInvalid(id);
                    return false;
                }
                markValid(id);
                return true;
            case 'feet':
            case 'inches':
            case 'weight':
                if(isNaN(value) || value < 0){
                    markInvalid(id);
                    return false;
                }
                markValid(id);
                return true;
        }
    }
    function setState(id, value){
        formFields[id] = checkValidity(id, value);
    }
    function validateFormState(){
        let state = false;
        for(const element in formFields){
            state = formFields[element];
        };
        return state;
    }
    return {
        get: validateFormState,
        set: setState
    }
})();



dom$.get('unit').onclick = () => toggleUnitsAndValues();

dom$.get('name').onchange = () => formValidation.set('name', dom$.get('name').value)
dom$.get('weight').onchange = () => formValidation.set('weight', dom$.get('weight').value)
dom$.get('feet').onchange = () => formValidation.set('feet', dom$.get('feet').value)
dom$.get('inches').onchange = () => formValidation.set('inches', dom$.get('inches').value) 
    
    
// On button click, prepare and display infographic
dom$.get('btn').addEventListener('click', function() {
    // TODO: add form validation
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