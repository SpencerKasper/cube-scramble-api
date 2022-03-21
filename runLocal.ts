// // import {handler} from "./src/getSolvesLambdaHandler";
// import {handler} from './src/dnfLambdaHandler';
//
// handler({userId: 'spencer.kasper@gmail.com', solveId: '6d7b18b1-a5e8-4a5b-9b08-0a4c068b28a2', isDnf: 'false'})
//     .then(response => {
//         console.error(response);
//     })

// https://3kshxn7a1g.execute-api.us-east-1.amazonaws.com/prod/solves/0bb1f014-2e10-43bc-a501-135b74190f7c/spencer.kasper%40gmail.com?sessionId=DEFAULT_SESSION
import {handler} from './src/deleteSolveLambdaHandler';

handler({
    // body: {
    //     userId: 'spencer.kasper@gmail.com',
    //     scramble: "R' D' L U' F R F L U2 B' D L2 B2 R U' F U' L' B2 D2",
    //     time: 22180,
    //     cubeType: "3x3x3",
    //     number: 2,
    //     sessionId: '45b922ca-1696-4921-a556-9e3a9f738c53'
    // },
    userId: 'spencer.kasper@gmail.com',
    sessionId: 'DEFAULT_SESSION',
    solveId: '6d7b18b1-a5e8-4a5b-9b08-0a4c068b28a2',
})
    .then((response) => {
        console.error(response);
        console.error('Finished.');
    });