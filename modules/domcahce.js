/**
* @description Use to speed up simple DOM interaction, adding, getting, hiding and creating elements.
* @returns {object} An interface for adding, getting, hiding and creating elements.
*/
export default (function() {
    let elements = {};
    function addElement(key, element){
        elements[key] = element;
    };
    function getElement(id){
        return document.getElementById(id);
    };

    function toggleElemet(id){
        let el = document.getElementById(id)
        el.style.display === 'none' ? el.style.display = 'block' : el.style.display = 'none';
    }

    function createElement(el, id, className){
        let element = document.createElement(el);
        element.id = id || "";
        element.className = className || "";
        return element;
    }
    function createTextNode(content){
        let element = document.createTextNode(content);
        element.createTextNode = content || '';
        return element;
    }

    return {
        add: addElement,
        get: getElement,
        toggle: toggleElemet,
        create: createElement,
        textNode: createTextNode

    }
})();