
// This file holds utility functions we can use if we do vanilla js to do similar things to jQuery. If we use jQuery we can delete this file.

//This function will grab an element by its class, but only the last one in the array of elements by class. Most useful when replacing html IDs with Classes.
function elemByClass (selectedClass) {
    let result;
    selectedClass.forEach(element => {
        result = element
    });
    return result;
};

function funcOnClass (querySeleced, func) {
    querySeleced.forEach(element => {
        func(element)
    });
}

function clickClass (querySeleced, func) {
    if (typeof querySeleced === 'object' && querySeleced !== null){
        if(querySeleced.length >= 1){
            querySeleced.forEach(element => {
                element.addEventListener('click', func)
            });
        } else if (objectLength(querySeleced) === 0) {
            querySeleced.addEventListener('click', func)
        } else if (querySeleced === null) {
            say ("The element is null.");
        } else if (querySeleced === undefined) {
            say ("The element is undefined.");
        } else {
            say ("Something is wrong here!")
        };
    };
};

function hasClass (el, className) {
    if (el.classList)
        return el.classList.contains(className)
    else
        return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`))
}
// ----------------

function addClass (el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += ' ' + className
}
// ----------------

function removeClass (el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        const reg = new RegExp(`(\\s|^)${className}(\\s|$)`)
        el.className = el.className.replace(reg, ' ')
    }
}

function extend() { // This function is based off of the one written by __ at __, with a few minor tweaks.
    // Establish our variables
    const extended = {};
    let deep = false;
    let i = 0;

    //Check if this is a deep merge
    if (typeof (arguments[0]) === 'boolean') {
        deep = arguments[0];
        i++
    }

    //Merge the object into the extended object
    const merge = obj => {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                //If it is both a deep merge and the property is an object, send the property through this function recursively.
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
                    // Otherwise do a regular merge
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    while (i < arguments.length) { merge (arguments[i]) };

    return extended;

    // use reference:
    // const shallowMerge = extend(obj1, obj2);
    // const deepMerge = extend(true, obj1, obj2);
};



function q (check) {
    console.log(`Q: This ${typeof check} has a value of:`);
    console.log(check)
}

function say (log) {
    console.log(`Message: ${log}`);
}

function objectLength (object) {
    return Object.keys(object).length;
}

