import { parseString } from 'xml2js';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const response = await fetch(body.link, {
        headers: {
            'Content-Type': 'application/xml',
        }
    });
    const text = await response.text();

    let res = ''

    parseString(text, (err: string, result: string) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return;
        }
        res = result
    });
    return {
        data: res,
        source: body.label,
    }
})