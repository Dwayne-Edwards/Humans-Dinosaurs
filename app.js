import dinos from './dino.js';
    

    // Create Dino Constructor
    function Dinosuar(dino){
        this.species = dino.species;
        this.weight = dino.weight;
        this.height = dino.height;
        this.diet = dino.diet;
        this.where = dino.where;
        this.when = dino.when;
        this.fact = dino.fact;
    }

    // Create Dino Objects
    const Dinosaurs = (function(){
        let dinosaurs = [];
        dinos['Dinos'].forEach(dino => {
            dinosaurs.push(dino.species = new Dinosuar(dino));
            // console.log(dino)
        });
    
        return dinosaurs;
    })();
    
    // Dinosaurs(dinos).forEach(dino => {
    //     console.log(dino)
    // });
    console.log(Dinosaurs);

    // Create Human Object

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
