import {handler} from "./src/getScrambleLambdaHandler";

handler({})
    .then((response) => {
        console.error(response);
        console.error('Finished.');
    });