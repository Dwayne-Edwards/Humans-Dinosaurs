import dinos from './dino.js';
    
// Create Dino Constructor
function Dinosaur (dino){
    let comparison = null;
    this.species = dino.species || null;
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
function DomCache () {
    let elements = {};
    this.add = function(key, element){
        elements[key] = element;
    };
    this.get = function(key){
        return elements[key];
    };

    this.toggle = function (el){
        el.style.display === 'none' ? el.style.display = 'block' : el.style.display = 'none';
    }

    this.create = function(el, id, className){
        
    }
    this.appendChild = function(parent, child){

    }
 
    this.print = function(){
        console.log(elements);
    }

};

const dom$ = new DomCache();

const formElements = {
    unit: document.getElementById("unit"),
    name: document.getElementById("name"),
    weight: document.getElementById("weight"),
    // height: [document.getElementById("feet"), document.getElementById("inches")],
    heightFT: document.getElementById("feet"),
    heightIN: document.getElementById("inches"),
    diet: document.getElementById("diet"),
    where: document.getElementById("where"),

    // Form Labels
    unitLabel: document.getElementById("unitLabel"),
    heightLabelFT: document.getElementById("heightLabel"),
    heightLabelIN: document.getElementById("heightLabelIN"),
    weightLabel: document.getElementById("weightLabel")

}

for (const element in formElements){
    dom$.add(element , formElements[element]);
}


// Create Human Object and populate properties when [compare button] is clicked 
let humanData = {};
// Use IIFE to get human data from form
const getHumanData = (function() {
    let data = {};
    return function() {
        data = {
            species: 'Human',
            name: dom$.get('name').value,
            weight: dom$.get('weight').value,
            height: [parseInt(dom$.get('heightFT').value), parseInt(dom$.get('heightIN').value)],
            diet: dom$.get('diet').value,
            where: dom$.get("where").value
        }
        
    return data;
    };
})();





document.getElementById("unit").onclick = () => {
    toggleUnitsAndValues();
};

// Returns the current state of the form units in use
function getUnit(){
    return document.getElementById("unit").value;
}


function updateFormMeasurements(height, weight, unit = dom$.get('unit')) { 
    let isImperial = unit === 'imperial';
    dom$.get('heightFT').value = isImperial ? Math.floor(height / 100) : Math.floor(height / 12);
    dom$.get("heightIN").value = isImperial ?  Math.floor(height % 100) : Math.floor(height % 12);
    dom$.get("weight").value = isImperial ?  Math.round(weight / 2.203) : Math.round(weight * 2.203);
};


//   Toggle the form's displayed units and update the [unit] checkbox value   
function updateFormDisplayUnits(unit = getUnit()) { 
    let isNotImperial = unit !== 'imperial';
    document.getElementById("unit").value = isNotImperial ? 'imperial' : 'metric';
    document.getElementById("label_units").innerText = isNotImperial ? 'Switch to metric': 'Uncheck for imperial';
    document.getElementById("heightA").innerText = isNotImperial ? 'Feet: ': 'Meters: ';
    document.getElementById("heightB").innerText = isNotImperial ? 'inches: ' : 'Cm: ';
    document.getElementById("label_weight").innerText = isNotImperial ? 'lbs' : 'Kgs';

};

function toggleUnitsAndValues(unit = getUnit()){
    let h1 = document.getElementById("feet").value || 0;
    let h2 = document.getElementById("inches").value || 0;
    let height = 0;

    if(unit === 'imperial'){
        height = parseInt(h1, 10) * 12 + parseInt(h2, 10); 
    } else {
    height = parseInt(h1, 10) * 100 + parseInt(h2, 10);
    }
    
    let convertedHeight = convertHeight(height, unit)
    let weight = document.getElementById("weight").value;
    
    updateFormMeasurements(convertedHeight, weight);
    updateFormDisplayUnits(getUnit());
    
}



function convertHeight(height, unit = getUnit()){
    if(unit === 'imperial'){
        return Math.round(height * 2.54)
    } 
    return Math.round(height / 2.54);
}

// Helper functions
function isValidKey(key, validKeys = Object.keys(getHumanData())){
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
    
    
const makeComparison = function (obj1, obj2, objectKey, comparisonUnit = getUnit()){
    let previouslyUsedKeys = [];
    let comparison = '';
    let obj1Value = obj1[objectKey];
    let obj2Value = obj2[objectKey];
    let unit;
    if(objectKey === 'height'){
        unit = comparisonUnit === 'imperial' ? 'inches' : 'centimeters';
    } else if(objectKey === 'weight'){
        unit = comparisonUnit === 'imperial' ? 'lbs' : 'kgs';
    }
    if(isValidKey(objectKey) && !previouslyUsedKeys.includes(objectKey)){
        switch(objectKey){
            case 'height':
            case 'weight':
                if(typeof obj1Value === "string"){obj1Value = convertToInteger(obj1Value);}
                if(typeof obj2Value === "string"){obj2Value = convertToInteger(obj2Value);} 
                if(obj1Value > obj2Value){
                    comparison = `The ${objectKey} of ${obj1.name} is about 
                    ${obj1.height - obj2.height} ${unit} more than ${obj2.name}`
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                }
                comparison = `The ${objectKey} of ${obj1.name} is about 
                ${obj2.height - obj1.height} ${unit} less than ${obj2.name}`
                
                previouslyUsedKeys.push(objectKey);
                break;
            
            case 'diet':
            case 'where':
                if(typeof obj1Value === "number"){obj1Value = convertToString(obj1Value);}
                if(typeof obj2Value === "number"){obj2Value = convertToString(obj2Value);}
                
                if(obj1Value.toLowerCase() === obj2Value.toLowerCase() 
                || obj1Value.toLowerCase().includes(obj2Value.toLowerCase())){
                    comparison = objectKey === 'diet' ? `${obj1.name} and ${obj2.name} are both ${obj2.diet}` 
                    : `${obj1.name} and ${obj2.name} have ${obj1.where} in common`
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                }
                comparison = objectKey === 'diet' ? `${obj1.name} is a ${obj1.diet} unlike ${obj2.name} the ${obj2.diet}`
                : `${obj1.name} are found in ${obj1.where} and ${obj2.name} location is ${obj2.where}`
                
                previouslyUsedKeys.push(objectKey);  
                break;
            
            case 'name':
                if(typeof obj1Value === "number"){obj1Value = convertToString(obj1Value);}
                if(typeof obj2Value === "number"){obj2Value = convertToString(obj2Value);}
                if(obj1Value .toLowerCase() < obj2Value.toLowerCase()){
                    comparison = `${obj1.name} name would come before ${obj2.name} in a list`;
                    
                    previouslyUsedKeys.push(objectKey); 
                    break;
                } else if(obj1Value .toLowerCase() > obj2Value .toLowerCase()){
                    comparison = `${obj2.name} name would come before ${obj1.name} in a list`; 

                    previouslyUsedKeys.push(objectKey); 
                    break;
                } else {
                    comparison = (obj1.name).length > (obj2.name).length ? `${obj1.name} name is longer than ${obj2.name}`
                    : `${obj1.name} name is not longer than ${obj2.name}`;
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                }
                
            default:
                break;
        }
    } else {
        let fact = Math.floor(Math.random() * 5)
        let when = Math.floor(Math.random() * 5)
        comparison = fact > when ? `${obj1.species} fact:  ${obj1.fact}` : `${obj1.species} lived during the ${obj1.when} period`;
                
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
function generateTileGrid(dino, human){
    let keys = shuffleArray(Object.keys(dino[0]));
    let items = arrayMiddleInsert(shuffleArray(dino), human);
    items.forEach(item => {
        if(item instanceof Dinosaur){
            // TODO: Check for pigeon object
            let key = keys.pop();
            item.setComparisonToHuman(makeComparison(item, human, keys.pop()));
            console.log(item.getComparison());
        }
        
        

            // create a new div element
            const gridItem = document.createElement("div");
            
            gridItem.id = "grid-item"
            gridItem.className = "grid-item";
            // and give it some content

            const gridItemTitle = document.createTextNode(`Species: ${item.name || item.species }`);
            const gridItemImage = document.createElement("img");
            gridItemImage.src = `/images/${item.species.toLowerCase()}.png`;
          
            // add the text node to the newly created div
            gridItem.appendChild(gridItemTitle);
            gridItem.appendChild(gridItemImage);
          
            // add the newly created element and its content into the DOM
            document.getElementById('grid').appendChild(gridItem);
         
    })
} 

 


    // Add tiles to DOM

    // Toggle HTML Element diplay property
function toggleElement(element){
    element.style.display === 'none' ? element.style.display = 'block' : element.style.display = 'none';
}



// On button click, prepare and display infographic

document.getElementById("btn").addEventListener('click', function() {
    // TODO: add form validation
    // TODO: add removeForm Function
    // TODO: add toggleButton Fuction - use for compare/reset buttons

    humanData = getHumanData();
    // Dinosaurs[3].setComparisonToHuman("Goodness")
    generateTileGrid(Dinosaurs, humanData)
    toggleElement(document.getElementById("dino-compare"));
});