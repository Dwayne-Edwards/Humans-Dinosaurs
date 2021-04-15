import dom$ from './domcahce.js';

/**
* @description Swaps an input value between metric and imperial
* @param {string} id - form element value been converted
* @param {number} height - inches or centimeters
* @param {number} weight - pounds or kgs
* @param {string} unit - accepted values:  'imperial' or 'metric'
* @returns {number} input converted to metric or imperial
*/
export function imperialMetricSwap(id, height, weight, unit){
    let isImperial = unit === 'imperial';
    if(id === 'unit'){ return isImperial ? 'metric' : 'imperial'};
    if(id === 'feet'){ return isImperial ? Math.floor(height / 100) : Math.floor(height / 12)};
    if(id === 'inches'){ return isImperial ?  Math.floor(height % 100) : Math.floor(height % 12)};
    if(id === 'weight'){ return isImperial ?  Math.round(weight / 2.203) : Math.round(weight * 2.203)};
    return;
}

/**
* @description Loop through a list DOM elements by id and call a swapping function to toggle between imperial and metric
* @param {number} height - inches or centimeters
* @param {number} weight - pounds or kgs
* @param {string} unit - accepted values:  'imperial' or 'metric'
* @param {array} elementIds - Array of DOM elements ids
* @returns {}
*/
export function toggleValues(height, weight, unit, elementIds) {
    elementIds.forEach( id => {
        dom$.get(id).value = imperialMetricSwap(id, height, weight, unit);
    });
};


/**
* @description Toggle a form's displayed label and update the [unit] checkbox value
* @param {array} elementIds - Array of DOM elements ids
*/
export function toggleUnits(unit) {
    let isImperial = unit === 'imperial';
    dom$.get('unitLabel').innerText = isImperial ? 'Uncheck for imperial': 'Switch to metric';
    dom$.get('heightLabelFT').innerText = isImperial ? 'Meters: ': 'Feet: ';
    dom$.get('heightLabelIN').innerText = isImperial ? 'Cm: ' : 'Inches: ';
    dom$.get('weightLabel').innerText = isImperial ? 'kgs' : 'lbs';
};


/**
* @description Reduce a pair of imperial value inputs to a single output
* @param {number} ft - positive integer
* @param {number} inches - positive integer
* @returns {number} The sum of ft and inches converted to inches
*/
export function reduceToInches(ft, inches){
    return parseInt(ft, 10) * 12 + parseInt(inches, 10);
}

/**
* @description Reduce a pair of imperial value inputs to a single output
* @param {number} m - positive integer in meters
* @param {number} cm - positive integer in centimeters
* @returns {number} The sum of m and cm converted to cm
*/
export function reduceToCentimeters(m, cm){
    return parseInt(m, 10) * 100 + parseInt(cm, 10);
}

/**
* @description Toggles the input value between imperial and metric
* @param {number} height - positive integer in meters
* @param {string} unit - accepted values:  'imperial' or 'metric'
* @returns {number} an integer that is inverse of the input unit
*/
export function toggleHeight(height, unit){
    if(unit === 'imperial'){
        return Math.round(parseInt(height, 10) * 2.54);
    }
    return Math.round(parseInt(height, 10) / 2.54);
}

/**
* @description Toggles the input value between imperial and metric
* @param {number} h1 - positive integer representing feet or meters
* @param {number} h2 - positive integer representing inches or centimeters
* @param {number} weight - positive integer in pounds or kilograms
* @param {string} unit - accepted values:  'imperial' or 'metric'
* @param {array} elementIds - Array of DOM element[ids] values to toggle
*/
export function toggleUnitsAndValues(h1, h2, weight, unit, elementIds){
    let height = 0;
    if(unit === 'imperial'){
        height =  reduceToInches(h1, h2);
    } else {
        height = reduceToCentimeters(h1, h2);
    }
    toggleValues(toggleHeight(height || 0, unit), weight, unit, elementIds);
    toggleUnits(unit);
}

/**
* @description Normalize a value, where imperial reduce to inches and metric to centimeters
* @param {number || array} num - positive integer or array of two integer representing feet/inches or meters/centimeters
* @param {string} unit - accepted values:  'imperial' or 'metric'
* @returns {number} returns the input value reduced to inches or centimeters
*/
export function normalizeHeight(num, unit){
    let height;
        // User is using imperial units
        if(unit === 'imperial' && Array.isArray(num)){
            return height =  reduceToInches(num[0], num[1]);
        }
        // User is using  metric units
        if(unit !== 'imperial' && Array.isArray(num)){
            return height =  reduceToCentimeters(num[0], num[1]);
        }

        // Values are in imperial and the user is using metric
        if(unit !== 'imperial'){
           return height = toggleHeight(parseInt(num), 'imperial');
        }

    // Otherwise return the the input value
    return height = parseInt(num);

};

/**
* @description Normalize a value, where pounds converted to kilograms
* @param {number} num - positive number representing pounds or kiograms
* @param {string} unit - accepted values:  'imperial' or 'metric'
* @returns {number} returns the input value converted to kilograms
*/
export function normalizeWeight(num, unit){
    let weight;
        // User is using metric units
        if(unit === 'metric'){
            return weight =  (parseFloat(num) / 2.203).toFixed(1);
        }
    // Otherwise return the the input value
    return weight = parseFloat(num).toFixed(1);
};