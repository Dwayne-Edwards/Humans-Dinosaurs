import dom$ from './domcahce.js';

/**
* @description Use to validate the state of a form prior to submission
* @returns {object} An interface for gettting and setting the validity of a form
*/
export default (function () {
    let formFields = {
        name: false,
        feet: false,
        inches: false,
        weight: false
    }
    // Hightlight form input fields red when invalid
    function markInvalid(id){
        let element = dom$.get(id);
        element.className += " form-field_invalid";
        element.className = element.className.replace(/\bform-field_valid\b/g, "");
    }
    // Hightlight form input fields green when valid
    function markValid(id){
        let element = dom$.get(id);
        element.className += " form-field_valid";
        element.className = element.className.replace(/\bform-field_invalid\b/g, "");
    }

    /**
    * @description Check the validity of both string and numeral form input fields and hightlight them green: valid and red: invalid
    * @param {string} id - form element that is been validated
    * @param {string | number} value - content of a form input field
    * @param {string} value
    * @returns {boolean} validate form-field values
    */
    function checkValidity(id, value){
        switch(id){
            case 'name':
                if(value.length < 1 || value === ' '){
                    markInvalid(id);
                    return false;
                }
                markValid(id);
                return true;
            case 'feet':
            case 'inches':
                let height = parseInt(dom$.get('feet').value, 10) + parseInt(dom$.get('inches').value, 10)
                if( height > 0){
                    formFields['feet'] = true;
                    formFields['inches'] = true;
                    markValid('feet');
                    markValid('inches');
                    return true;
                } else {
                    formFields['feet'] = false;
                    formFields['inches'] = false;
                    markInvalid('feet');
                    markInvalid('inches');
                    return false;
                };

            case 'weight':
                if(isNaN(value) || value < 1){
                    markInvalid(id);
                    return false;
                }
                markValid(id);
                return true;
        }
    }

    function setState(id, value){
        formFields[id] = checkValidity(id, value);
    }

    function validateFormState(){
        let state = true;
        for(const element in formFields){
            if(formFields[element] === false){
                state = false;
            }
        };
        return state;
    }

    return {
        get: validateFormState,
        set: setState
    }
})();