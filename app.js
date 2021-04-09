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
    heightLabelFT: document.getElementById("heightLabelFT"),
    heightLabelIN: document.getElementById("heightLabelIN"),
    weightLabel: document.getElementById("weightLabel")

}

for (const element in formElements){
    dom$.add(element, formElements[element]);
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



// Returns the current state of the form units in use
function getUnit(){
    return document.getElementById("unit").value;
}


function toggleMeasurements(height, weight, unit) { 
    let isImperial = unit === 'imperial';
    dom$.get('heightFT').value = isImperial ? Math.floor(height / 100) : Math.floor(height / 12);
    dom$.get("heightIN").value = isImperial ?  Math.floor(height % 100) : Math.floor(height % 12);
    dom$.get("weight").value = isImperial ?  Math.round(weight / 2.203) : Math.round(weight * 2.203);
};


//   Toggle the form's displayed units and update the [unit] checkbox value   
function toggleUnits(unit) { 
    let isNotImperial = unit !== 'imperial';
    dom$.get('unit').value = isNotImperial ? 'imperial' : 'metric';
    dom$.get('unitLabel').innerText = isNotImperial ? 'Switch to metric': 'Uncheck for imperial';
    dom$.get('heightLabelFT').innerText = isNotImperial ? 'Feet: ': 'Meters: ';
    dom$.get('heightLabelIN').innerText = isNotImperial ? 'inches: ' : 'Cm: ';
    dom$.get('weightLabel').innerText = isNotImperial ? 'lbs' : 'Kgs';
};

function convertHeight(height, unit){
    if(unit === 'imperial'){
        return Math.round(height * 2.54)
    } 
    return Math.round(height / 2.54);
}

function toggleUnitsAndValues(unit = dom$.get('unit').value){
    let h1 = dom$.get('heightFT').value || 0;
    let h2 = dom$.get('heightIN').value || 0;
    let height = 0;

    if(unit === 'imperial'){
        height = parseInt(h1, 10) * 12 + parseInt(h2, 10); 
    } else {
    height = parseInt(h1, 10) * 100 + parseInt(h2, 10);
    }
    
    let convertedHeight = convertHeight(height, unit)
    let weight = dom$.get('weight').value;
    
    toggleMeasurements(convertedHeight, weight, unit);
    toggleUnits(unit);
    
}

document.getElementById("unit").onclick = () => {
    toggleUnitsAndValues();
};



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
    let obj2Name = obj2.name.split(' ')[0]
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
                if(typeof obj1Value === "string"){obj1Value = convertToInteger(obj1Value);}
                if(typeof obj2Value === "string"){obj2Value = convertToInteger(obj2Value);} 
                if(obj1Value > obj2Value){
                    comparison = `${obj1.name} ${objectKey} is about 
                    ${obj1.height - obj2.height} ${unit} more than ${obj2Name}`
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                }
                comparison = `${obj1.name} ${objectKey} is about 
                ${obj2.height - obj1.height} ${unit} less than ${obj2Name}`
                
                previouslyUsedKeys.push(objectKey);
                break;
            
            case 'diet':
            case 'where':
                if(typeof obj1Value === "number"){obj1Value = convertToString(obj1Value);}
                if(typeof obj2Value === "number"){obj2Value = convertToString(obj2Value);}
                
                if(obj1Value.toLowerCase() === obj2Value.toLowerCase() 
                || obj1Value.toLowerCase().includes(obj2Value.toLowerCase())){
                    comparison = objectKey === 'diet' ? `${obj1.name} and ${obj2Name} are both ${obj2.diet}` 
                    : `${obj1.name} and ${obj2Name} have ${obj1.where} in common`
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                }
                comparison = objectKey === 'diet' ? `${obj1.name} is a ${obj1.diet} unlike ${obj2Name} the ${obj2.diet}`
                : `${obj1.name} location: ${obj1.where} and ${obj2Name} is: ${obj2.where}`
                
                previouslyUsedKeys.push(objectKey);  
                break;
            
            case 'name':
                if(typeof obj1Value === "number"){obj1Value = convertToString(obj1Value);}
                if(typeof obj2Value === "number"){obj2Value = convertToString(obj2Value);}
                if(obj1Value .toLowerCase() < obj2Value.toLowerCase()){
                    comparison = `Alphabetically ${obj1.name} comes before ${obj2Name}`;
                    
                    previouslyUsedKeys.push(objectKey); 
                    break;
                } else if(obj1Value .toLowerCase() > obj2Value .toLowerCase()){
                    comparison = `Alphabetically ${obj2Name} comes before ${obj1.name}`; 

                    previouslyUsedKeys.push(objectKey); 
                    break;
                } else {
                    comparison = (obj1.name).length > (obj2.name).length ? `${obj1.name} name is longer than ${obj2Name}`
                    : `${obj1.name} name is not longer than ${obj2Name}`;
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                }
                
            default:
                break;
        }
    } else {
        let fact = Math.floor(Math.random() * 5)
        let when = Math.floor(Math.random() * 5)
        comparison = fact > when ? `Fact:  ${obj1.fact}` : `${obj1.species} lived during the ${obj1.when} period`;
                
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
    let keys = shuffleArray(Object.keys(human));
    console.log('KEYs' + keys)
    let items = arrayMiddleInsert(shuffleArray(dino), human);
    items.forEach(item => {
        if(item instanceof Dinosaur){
            // TODO: Check for pigeon object
            let key = shuffleArray(Object.keys(human))[0];
            console.log('KEY' + key)
            item.setComparisonToHuman(makeComparison(item, human, key));
        }
        
        

            // create new Grid Item elements
            const gridItem = dom$.create('div', "grid-item", "grid-item");
        
            // and create title
            const gridItemTitle = dom$.create('h3');
            const titleText = dom$.textNode(item.name || item.species );
            gridItemTitle.appendChild(titleText);
            gridItem.appendChild(gridItemTitle);

            // Create comparision to User
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