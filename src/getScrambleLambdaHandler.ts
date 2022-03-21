import {Scramble} from './scramble/Scramble';

const DEFAULT_SCRAMBLE_LENGTH = 30;

export const handler = async (event: any) => {
    const scrambleLength = event.scrambleLength ? event.scrambleLength : DEFAULT_SCRAMBLE_LENGTH;
    console.error(`Scramble Length: ${scrambleLength}`);
    try {
        const scramble = new Scramble(scrambleLength).toString();
        return {responseCode: 200, body: {scramble}};
    } catch (e) {
        return e;
    }
};