import t from 'tap';
import fs from 'fs';
import {parse} from '../src/parser.js';

t.test('parse 1.0', t => {
    const gpx = parse(fs.readFileSync('testdata/gpx1.0_with_all_fields.gpx').toString());
    console.log(JSON.stringify(gpx, undefined, 2));
    if (t.not(gpx, undefined)) {
        if (t.not(gpx.metadata, undefined)) {
            t.equal(gpx.metadata.name, 'example name');
            t.equal(gpx.metadata.desc, 'example description');
            if (t.not(gpx.metadata.author, undefined)) {
                t.equal(gpx.metadata.author.name, 'example author');
                t.equal(gpx.metadata.author.email, 'example@domain.com');
                t.equal(gpx.metadata.author.link, undefined);
            }
        }
        t.equal(gpx.metadata.copyright, undefined);
        if (t.not(gpx.metadata.link, undefined)) {
            t.equal(gpx.metadata.link.href, 'https://domain.com/gpx/example');
            t.equal(gpx.metadata.link.text, 'doc link text');
            t.equal(gpx.metadata.link.type, undefined);
        }
    }

    t.end();
});

t.test('parse 1.1', t => {
    const gpx = parse(fs.readFileSync('testdata/gpx1.1_with_all_fields.gpx').toString());
    console.log(JSON.stringify(gpx, undefined, 2));
    if (t.not(gpx, undefined)) {
        if (t.not(gpx.metadata, undefined)) {
            t.equal(gpx.metadata.name, 'example name');
            t.equal(gpx.metadata.desc, 'example description');
            if (t.not(gpx.metadata.author, undefined)) {
                t.equal(gpx.metadata.author.name, 'example author');
                t.equal(gpx.metadata.author.email, 'example@domain.com');
                if (t.not(gpx.metadata.author.link, undefined)) {
                    t.equal(gpx.metadata.author.link.href, 'https://domain.com/authors/example');
                    t.equal(gpx.metadata.author.link.text, 'author link text');
                    t.equal(gpx.metadata.author.link.type, 'author link type');
                }
            }
            if (t.not(gpx.metadata.copyright, undefined)) {
                t.equal(gpx.metadata.copyright.author, 'gpx author');
                t.equal(gpx.metadata.copyright.year, 2013);
                t.equal(gpx.metadata.copyright.license, 'example license');
            }
            if (t.not(gpx.metadata.link, undefined)) {
                t.equal(gpx.metadata.link.href, 'https://domain.com/gpx/example');
                t.equal(gpx.metadata.link.text, 'doc link text');
                t.equal(gpx.metadata.link.type, 'doc link type');
            }
        }
    }
    t.end();
});
