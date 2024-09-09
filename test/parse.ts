import t from 'tap';
import fs from 'fs';
import {parse} from '../src/parser.js';

t.test('parse 1.0', t => {
    const gpx = parse(fs.readFileSync('testdata/gpx1.0_with_all_fields.gpx').toString());
    console.log(JSON.stringify(gpx, undefined, 2));
    t.end();
});

t.test('parse 1.1', t => {
    const gpx = parse(fs.readFileSync('testdata/gpx1.1_with_all_fields.gpx').toString());
    console.log(JSON.stringify(gpx, undefined, 2));
    t.end();
});
