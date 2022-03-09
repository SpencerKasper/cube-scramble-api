import {handler} from "./src/getSolvesLambdaHandler";

handler({userId: 'spencer.kasper@gmail.com'})
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