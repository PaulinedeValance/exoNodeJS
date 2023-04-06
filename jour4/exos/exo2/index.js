const pug = require('pug');

const template = './view/template.pug';

// ----- Exercice avec compileFile ----- //

const compiledFunction = pug.compileFile(template);

const result = compiledFunction({ user: { isAdmin: false } });
console.log(result);


// ----- Exercice avec renderFile ----- //
pug.renderFile(template, { user: { isAdmin: true } }, (err, data) => {
    if (err) throw err;
        console.log(data);
});
