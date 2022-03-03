import {handler} from "./src/getScrambleLambdaHandler";

handler({})
    .then(() => {
        console.error('Finished.');
    });