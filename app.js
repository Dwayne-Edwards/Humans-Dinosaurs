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
        humanData = getHumanData();
    });

    // Use IIFE to get human data from form
    const getHumanData = (function() {
        let data = {};
        return function() {
            data = {
                species: "Human",
                sex:  "Gender",
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
  };



    


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