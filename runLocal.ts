// import {handler} from './src/dnfLambdaHandler';
//
// handler({userId: 'spencer.kasper@gmail.com', solveId: '6d7b18b1-a5e8-4a5b-9b08-0a4c068b28a2', isDnf: 'false'})
//     .then(response => {
//         console.error(response);
//     })


import {handler} from './src/createSessionLambdaHandler';

handler({
    body: {
        userId: 'spencer.kasper@gmail.com',
        name: '3x3x3 Main'
    }
})
    .then((response) => {
        console.error(response);
        console.error('Finished.');
    });