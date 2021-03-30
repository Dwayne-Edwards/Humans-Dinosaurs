import dinos from './dino.js';
    
    // Create Dino Constructor
    function Dinosaur (dino){
        let comparison = "Comparison";
        this.species = dino.species || null;
        this.name = dino.species.slice(0, 4) + dino.diet.slice(0, 5) || null;
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
    

    // Create Human Object and populate properties on click event button is click 
    let humanData = {};
   document.getElementById("btn").addEventListener('click', function() {
        // TODO: add form validation
        // TODO: add removeForm Function
        // TODO: add toggleButton Fuction - use for compare/reset buttons

        humanData = getHumanData();
        Dinosaurs[3].setComparison("Goodness")
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
                diet: document.getElementById("diet").value
            }
        return (data);
        };
    })();

    //TODO: Remove this test code 
  document.getElementById("diet").onclick = function () { 
    console.log(`Printing the HUMAN DATA NEXT.......`);
    
        console.log(humanData);
        console.log(Dinosaurs); 
        console.log(Dinosaurs[3].getComparison());
  };



    
    const makeComparison = function (obj1, obj2, property='species'){
        // filter by property type

    }

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