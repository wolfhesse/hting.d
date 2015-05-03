module.exports = {
    people: getPeople(),
    peopleFn: getPeople
};

function getPeople() {
    console.log('getPeople');
    return [
        {id: 1, firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida', updatedAt: new Date() },
        {id: 2, firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California', updatedAt: new Date() },
//        {id: 3, firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York', updatedAt: new Date() },
        {id: 4, firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota', updatedAt: new Date() },
        {id: 5, firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota', updatedAt: new Date() },
        {id: 6, firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina', updatedAt: new Date() },
        {id: 7, firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming', updatedAt: new Date() },
        {id: 8, firstName: 'Aaron', lastName: 'Jinglehiemer', age: 22, location: 'Utah', updatedAt: new Date() },
        {id: 9, firstName: 'Roger', lastName: 'Andel', age: 48, location: 'Austria', updatedAt: new Date() }
    ];
}
