import dom$ from './domcahce.js';

// Add form Validation
export default (function () {
    let formFields = {
        name: false,
        feet: false,
        inches: false,
        weight: false
    }
    function markInvalid(id){
        let element = dom$.get(id);
        element.className += " form-field_invalid";
        element.className = element.className.replace(/\bform-field_valid\b/g, "");
    }

    function markValid(id){
        let element = dom$.get(id);
        element.className += " form-field_valid";
        element.className = element.className.replace(/\bform-field_invalid\b/g, "");
    }

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