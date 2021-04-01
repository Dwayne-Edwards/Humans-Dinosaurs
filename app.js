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
    

    // Create Human Object and populate properties when [compare button] is clicked 
    let humanData = {};
   document.getElementById("btn").addEventListener('click', function() {
        // TODO: add form validation
        // TODO: add removeForm Function
        // TODO: add toggleButton Fuction - use for compare/reset buttons

        humanData = getHumanData();
        Dinosaurs[3].setComparisonToHuman("Goodness")
    });

    // Use IIFE to get human data from form
    const getHumanData = (function() {
        let data = {};
        return function() {
            data = {
                species: "Human",
                name: document.getElementById("name").value,
                weight: document.getElementById("weight").value,
                height: document.getElementById("feet").value,
                diet: document.getElementById("diet").value,
                where: document.getElementById("where").value
            }
        return data;
        };
    })();

    //TODO: Remove this test code 
  document.getElementById("diet").onclick = function () { 
    console.log(`Printing the HUMAN DATA NEXT.......`);
    
        console.log(humanData);
        console.log(Dinosaurs); 
        console.log(Dinosaurs[3].getComparison());
        console.log(isValidKey('height'));
        console.log(makeComparison(Dinosaurs[3], humanData, 'name'));
    
  };


    
    const makeComparison = function (obj1, obj2, objectKey, comparisonUnit){
        let previouslyUsedKeys = [];
        let comparison = '';
        let obj1Value = obj1[objectKey];
        let obj2Value = obj2[objectKey];
        
        if(isValidKey(objectKey) && !previouslyUsedKeys.includes(objectKey)){
            switch(objectKey){
                case 'height':
                case 'weight':
                    if(typeof obj1Value === "string"){obj1Value = convertToInteger(obj1Value);}
                    if(typeof obj2Value === "string"){obj2Value = convertToInteger(obj2Value);} 
                    if(obj1Value > obj2Value){
                        comparison = `The ${objectKey} of ${obj1.name} is about 
                        ${obj1.height - obj2.height} ${comparisonUnit} more than ${obj2.name}`
                        
                        previouslyUsedKeys.push(objectKey);
                        break;
                    }
                    comparison = `The ${objectKey} of ${obj1.name} is about 
                    ${obj2.height - obj1.height} ${comparisonUnit} less than ${obj2.name}`
                    
                    previouslyUsedKeys.push(objectKey);
                    break;
                
                case 'diet':
                case 'where':
                    if(typeof obj1Value === "number"){obj1Value = convertToString(obj1Value);}
                    if(typeof obj2Value === "number"){obj2Value = convertToString(obj2Value);}
                    
                    if(obj1[objectKey].toLowerCase() === obj2[objectKey].toLowerCase() 
                    || obj1[objectKey].toLowerCase().includes(obj2[objectKey].toLowerCase())){
                        comparison = objectKey === 'diet' ? `${obj1.name} and ${obj2.name} are both ${obj2.diet}` 
                        : `${obj1.name} and ${obj2.name} have ${obj1.where} in common`
                        
                        previouslyUsedKeys.push(objectKey);
                        break;
                    }
                    comparison = objectKey === 'diet' ? `${obj1.name} is a ${obj1.diet} unlike ${obj2.name} the ${obj2.diet}`
                    : `${obj1.name} were found in ${obj1.where} and ${obj2.name} location is ${obj2.where}`
                   
                    previouslyUsedKeys.push(objectKey);  
                    break;
                
                case 'name':
                    if(convertToString(obj1Value).toLowerCase() < convertToString(obj2Value).toLowerCase()){
                        comparison = `${obj1.name} name would come before ${obj2.name} in a list`;
                        
                        previouslyUsedKeys.push(objectKey); 
                        break;
                    } else if(convertToString(obj1Value).toLowerCase() > convertToString(obj2Value).toLowerCase()){
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
            comparison = fact > when ? `[ ${obj1.species} ]?: ${obj1.fact}` : `[ ${obj1.species} ]?: lived during the ${obj1.when} period`;
                    
            previouslyUsedKeys.push(objectKey);
        }
        return comparison;
    };

    // Helper functions
    function isValidKey(key, validKeys = Object.keys(getHumanData())){
        return validKeys.includes(key);

    }
    function convertToInteger(n){
        return parseInt(n);
    }

    function convertToString(str){
        return str.toString();
    }

    //   function isString(str){
    //       return typeof str === "string";
    //   }

    //   function isNumber(n){
    //     return typeof n === "number";
    // }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
    // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic