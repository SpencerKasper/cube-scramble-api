// import {handler} from "./src/getSolvesLambdaHandler";
import {handler} from './src/dnfLambdaHandler';

handler({userId: 'spencer.kasper@gmail.com', solveId: '6d7b18b1-a5e8-4a5b-9b08-0a4c068b28a2', isDnf: 'false'})
    .then(response => {
        console.error(response);
    })



// import {handler} from './src/saveSolveLambdaHandler';
//
// handler({
//     userId: 'spencer.kasper@gmail.com',
//     body: JSON.stringify({
//         solve: {
//             scramble: "R' D' L U' F R F L U2 B' D L2 B2 R U' F U' L' B2 D2",
//             time: 22180,
//             cubeType: "3x3x3",
//             number: 2
//         },
//     }),
// })
//     .then((response) => {
//         console.error(response);
//         console.error('Finished.');
//     });