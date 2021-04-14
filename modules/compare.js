export const compare = (function(){
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