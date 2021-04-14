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


//   Toggle the form's displayed units and update the [unit] checkbox value
export function toggleUnits(unit) {
    let isImperial = unit === 'imperial';
    dom$.get('unitLabel').innerText = isImperial ? 'Uncheck for imperial': 'Switch to metric';
    dom$.get('heightLabelFT').innerText = isImperial ? 'Meters: ': 'Feet: ';
    dom$.get('heightLabelIN').innerText = isImperial ? 'Cm: ' : 'Inches: ';
    dom$.get('weightLabel').innerText = isImperial ? 'kgs' : 'lbs';
};


export function reduceToInches(ft, inches){
    return parseInt(ft, 10) * 12 + parseInt(inches, 10);
}

export function reduceToCentimeters(m, cm){
    return parseInt(m, 10) * 100 + parseInt(cm, 10);
}

export function toggleHeight(height, unit){
    if(unit === 'imperial'){
        return Math.round(parseInt(height, 10) * 2.54);
    }
    return Math.round(parseInt(height, 10) / 2.54);
}

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

// Normalize the comparing values
// Imperial is reduced to inches
// Metric is reduced to centimeters
export function normalizeHeight(num, unit){
    let height;
        // If user is using imperial units
        if(unit === 'imperial' && Array.isArray(num)){
            return height =  reduceToInches(num[0], num[1]);
        }
        // User is using  metric units
        if(unit !== 'imperial' && Array.isArray(num)){
            return height =  reduceToCentimeters(num[0], num[1]);
        }

        // If values are in imperial and the user is using metric
        if(unit !== 'imperial'){
           return height = toggleHeight(parseInt(num), 'imperial');
        }

    // Otherwise return the the input value
    return height = parseInt(num);

};

export function normalizeWeight(num, unit){
    let weight;
        // If user is using metric units
        if(unit === 'metric'){
            return weight =  (parseFloat(num) / 2.203).toFixed(1);
        }
    // Otherwise return the the input value
    return weight = parseFloat(num).toFixed(1);
};