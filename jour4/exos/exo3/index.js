const pug = require('pug')

const compileTemplate = pug.compileFile('./view/template.pug');

const loggedUser = {
    name: {
        first: 'Jean',
        last: 'Dupont',
    },
    age: 36,
    birthdate: new Date('1986-04-18'),
    location: {
        zipcode: '77420',
        city: 'Champs-sur-Marne',
    },
    isAdmin: false
};

const result = compileTemplate({ loggedUser, pretty: true });
console.log(result);
