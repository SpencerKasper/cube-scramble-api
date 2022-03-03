require('dotenv').config();
const {Scramble} = require("./Scramble");

exports.handler = async function (event: any) {
    const SCRAMBLE_LENGTH = 20;
    try {
        const scramble = new Scramble(SCRAMBLE_LENGTH).toString();
        return {responseCode: 200, body: {scramble}};
    } catch (e) {
        return e;
    }
};