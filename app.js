import dinos from './dino.js';
    

    // Create Dino Constructor
    function Dinosaur (dino){
        this.species = dino.species || null;
        this.weight = dino.weight || null;
        this.height = dino.height || null;
        this.diet = dino.diet || null;
        this.where = dino.where || null;
        this.when = dino.when || null;
        this.fact = dino.fact || null;
    }

    // Create Dino Objects
    const Dinosaurs = (function(){
        let dinosaurs = [];
        dinos['Dinos'].forEach(dino => {
            dinosaurs.push(dino.species = new Dinosaur(dino));
        });
    
        return dinosaurs;
    })();
    
    console.log(Dinosaurs);

    // Create Human Constructor
    function Human (person){
        this.name = person.name || null;
        this.weight = person.weight || null;
        this.height = person.height || null;
        this.diet = person.diet || null;
        this.where = person.where || null;
        this.when = person.when || null;
        this.fact = person.fact || null;
    };

    // Create Human Object
//   function compare(){
//     alert("COMPARE CLICKED");
//   }

    // Use IIFE to get human data from form


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
