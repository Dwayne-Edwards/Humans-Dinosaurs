# Dinosuars vs Humans 

## Udacity project for - Intermediate Javascript

### Big Picture

Create a infographic that is derived from data that is provided, as well as user input data. Object-oriented javascript is great for working with complex data, but it’s not of much use without an interface to interact with. You will be pulling in information from a form and using it to complete an array of objects that will then be appended back to the DOM. 



For the project, generate a 3x3 grid of tiles (9 in total) with the human in the center tile. Each title will contain the species, an image, and a fact. For the human tile, you will display the name of the human rather than species and no fact is necessary for the human. When the user clicks to generate the infographic from the form, the grid will appear and the form will be hidden. The facts displayed should be random per dinosaur with an opportunity of displaying at least 6 different types of facts (3 should be from the methods you create). One of the titles should be for a pigeon in which the tile should always display, “All birds are considered dinosaurs.”


### Project Objective

1. Decide how you will work with classes, then build out your classes and objects. 

2. Get human data from the html form to build your human object. Think about what 3 things you are going to compare to your human. You may need to create more fields, adjust the fields that are there, or remove fields to correspond with the data you will be collecting. 

3. Create at least 3 methods that compare dino data to human data. Depending on how you decided to create your objects and what design pattern you chose, you may encounter issues accessing or working with some of the data. Do you need to create any functions to access/store this data?

4. Generate tiles and append to the DOM. Each Dino title must include at least the species, an image and a fact. The dino fact displayed should be chosen at random from at least 6 options (including your 3 methods). The Human tile must include the user’s name, and the human graphic--no fact is needed. The bird tile should include the species, image, and fact, “All birds are considered dinosaurs.”

5. Make certain the grid is not being added until you click the button to submit user data. Additionally, remove the form once the user has clicked to generate the infographic. It is a good idea to remove any calls to console.log at this point. 

6. REFACTOR. At this point, your code should be working properly. Ideally, refactoring happens while you are developing, but as a new developer, you often don’t have the whole picture in your head to be able to do so properly.  Let’s clean the project up. 

7. To preview the final version of your project online, commit the project to your github account. Access the index page at. https://github.com/path/to/project/index.html Copy that URL into https://htmlpreview.github.io/

### Project Requirements

To complete this project, your UI must show the following:

- [ ] The form should contain a button which upon clicking, removes the form
- [ ] The button should append a grid with 9 tiles to the DOM with the Human located in the center
- [ ] The Human tile should display the name of the person and an image, the dino tiles should contain the species, an image and a fact, the bird title should contain the species, image, and "All birds are Dinosaurs."


To complete this project, your backend code must:

- [ ] Contain a class and all necessary objects
- [ ] Contain at least 3 methods for comparing dinosaurs to the human
- [ ] Get user data from the DOM
- [ ] Append tiles with object data to DOM




