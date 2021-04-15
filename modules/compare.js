/**
* @description Compares the values (weight, height, diet, location & name) of two object
* @returns {object} An interface for getting a summary of a the comparing property
*/
export const compare = (function(){
    /**
    * @description Compares the values (weight, height, diet, location & name) of two object
    * @param {object} x - dinosaur data
    * @param {object} y - user data
    * @param {string} type - the requesting comparison object property to return
    * @param {string} unit - height: inches  || centimeters and weight: pounds || kilograms
    * @returns {string} a summary of a the comparing property
    */
    function getComparisonPhrase (x, y, type, unit){
        let username = y['name'].split(' ')[0];
        x.diet = x.diet.toLowerCase();
        y.diet = y.diet.toLowerCase();
        let comparison = {

            // weight
            weight: x.weight > y.weight ? `${x.name} weighs ${(x.weight - y.weight)} ${unit} more than ${username}`
                                        : `${username} weighs ${(y.weight - x.weight)} ${unit} more than ${x.name}`,

            // height
            height: x.height > y.height ? `${x.name} is ${(x.height - y.height)} ${unit} taller than ${username}`
                                        : `${username} is ${(y.height - x.height)} ${unit} taller than ${x.name}`,

            // diet
            diet: x.diet === y.diet ? `${x.name} and ${username} are both ${y.diet}`
                                    : `${x.name} is ${x.diet} but ${username} is a  ${y.diet}`,

            // location
            where: x.where === y.where  ? `${x.name}  and ${username} are connected with ${y.where}`
                                        : `${x.name} location: ${x.where} and ${username} location is ${y.where}`,

            // name - alphabetically ranked a..z
            name: x.name < username ? `Alphabetically ${x.name} comes before ${username}`
                                    : `Alphabetically ${username} comes before ${x.name}`,

            // provide a fact or time period as an alternative
            fact: `${x.fact}`,
            when: `${x.name} lived during the ${x.when} period`,
        }
        return comparison[type];
    };
    return { get: getComparisonPhrase };
})();

/**
* @description make a comparison between two object's property
* @param {object} compareObj - Dinosaurs data
* @param {object} userObj - user input data
* @param {string} objectKey - expected values: imperial || metric
* @param {string} comparisonUnit - the unit to use in the returned string
* @returns {string} a summary of a the comparing property of the two objects
*/
export const makeComparison = function (compareObj, userObj, objectKey, comparisonUnit){
    let comparison = '';
    let unit;
    if(objectKey === 'height'){
        unit = comparisonUnit === 'imperial' ? 'inches' : 'centimeters';
    } else if(objectKey === 'weight'){
        unit = comparisonUnit === 'imperial' ? 'lbs' : 'kgs';
    }
    comparison = compare.get(compareObj, userObj, objectKey, unit);

    return comparison;
};