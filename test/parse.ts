import t, {Test} from 'tap';
import {MessageExtra} from '@tapjs/core';
import fs from 'fs';
import {parse} from '../src/parser.js';
import {type Waypoint} from '../src/types.js';

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
            t.equal(gpx.metadata.copyright, undefined);
            if (t.not(gpx.metadata.link, undefined)) {
                t.equal(gpx.metadata.link.href, 'https://domain.com/gpx/example');
                t.equal(gpx.metadata.link.text, 'doc link text');
                t.equal(gpx.metadata.link.type, undefined);
            }
            t.equal(gpx.metadata.time?.toISOString(), '2013-01-01T12:00:00.000Z');
            t.equal(gpx.metadata.keywords, 'example keywords');
            if (t.not(gpx.metadata.bounds, undefined)) {
                t.equal(gpx.metadata.bounds.minlat, 1.2);
                t.equal(gpx.metadata.bounds.minlon, 3.4);
                t.equal(gpx.metadata.bounds.maxlat, 5.6);
                t.equal(gpx.metadata.bounds.maxlon, 7.8);
            }
        }
        if (t.not(gpx.wpt, undefined)) {
            if (t.equal(gpx.wpt.length, 2)) {
                if (t.not(gpx.wpt[0], undefined)) {
                    const wpt = gpx.wpt[0];
                    t.equal(wpt.lat, 12.3);
                    t.equal(wpt.lon, 45.6);
                    t.equal(wpt.ele, 75.1);
                    t.equal(wpt.magvar, 1.1);
                    t.equal(wpt.geoidheight, 2.0);
                    t.equal(wpt.name, 'waypoint name');
                    t.equal(wpt.cmt, 'waypoint comment');
                    t.equal(wpt.desc, 'waypoint description');
                    t.equal(wpt.src, 'waypoint source');
                    if (t.not(wpt.link, undefined)) {
                        t.equal(wpt.link.href, 'https://domain.com/gpx/wpt/1');
                        t.equal(wpt.link.text, 'waypoint 1');
                        t.equal(wpt.link.type, undefined);
                    }
                    t.equal(wpt.sym, 'waypoint symbol');
                    t.equal(wpt.type, 'waypoint type');
                    t.equal(wpt.fix, '2d');
                    t.equal(wpt.sat, 5);
                    t.equal(wpt.hdop, 6);
                    t.equal(wpt.vdop, 7);
                    t.equal(wpt.pdop, 8);
                    t.equal(wpt.ageofdgpsdata, 9);
                    t.equal(wpt.dgpsid, 45);
                }
                if (t.not(gpx.wpt[1], undefined)) {
                    const wpt = gpx.wpt[1];
                    t.equal(wpt.lat, 13.4);
                    t.equal(wpt.lon, 46.7);
                    t.equal(wpt.ele, undefined);
                    t.equal(wpt.magvar, undefined);
                    t.equal(wpt.geoidheight, undefined);
                    t.equal(wpt.name, undefined);
                    t.equal(wpt.cmt, undefined);
                    t.equal(wpt.desc, undefined);
                    t.equal(wpt.src, undefined);
                    t.equal(wpt.link, undefined);
                    t.equal(wpt.sym, undefined);
                    t.equal(wpt.type, undefined);
                    t.equal(wpt.fix, undefined);
                    t.equal(wpt.sat, undefined);
                    t.equal(wpt.hdop, undefined);
                    t.equal(wpt.vdop, undefined);
                    t.equal(wpt.pdop, undefined);
                    t.equal(wpt.ageofdgpsdata, undefined);
                    t.equal(wpt.dgpsid, undefined);
                }
            }
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
            t.equal(gpx.metadata.time?.toISOString(), '2013-01-01T12:00:00.000Z');
            t.equal(gpx.metadata.keywords, 'example keywords');
            if (t.not(gpx.metadata.bounds, undefined)) {
                t.equal(gpx.metadata.bounds.minlat, 1.2);
                t.equal(gpx.metadata.bounds.minlon, 3.4);
                t.equal(gpx.metadata.bounds.maxlat, 5.6);
                t.equal(gpx.metadata.bounds.maxlon, 7.8);
            }
        }
        if (t.not(gpx.wpt, undefined)) {
            if (t.equal(gpx.wpt.length, 2)) {
                if (t.not(gpx.wpt[0], undefined)) {
                    const wpt = gpx.wpt[0];
                    t.equal(wpt.lat, 12.3);
                    t.equal(wpt.lon, 45.6);
                    t.equal(wpt.ele, 75.1);
                    t.equal(wpt.magvar, 1.1);
                    t.equal(wpt.geoidheight, 2.0);
                    t.equal(wpt.name, 'waypoint name');
                    t.equal(wpt.cmt, 'waypoint comment');
                    t.equal(wpt.desc, 'waypoint description');
                    t.equal(wpt.src, 'waypoint source');
                    if (t.not(wpt.link, undefined)) {
                        t.equal(wpt.link.href, 'https://domain.com/gpx/wpt/1');
                        t.equal(wpt.link.text, 'waypoint 1');
                        t.equal(wpt.link.type, 'waypoint link type');
                    }
                    t.equal(wpt.sym, 'waypoint symbol');
                    t.equal(wpt.type, 'waypoint type');
                    t.equal(wpt.fix, '2d');
                    t.equal(wpt.sat, 5);
                    t.equal(wpt.hdop, 6);
                    t.equal(wpt.vdop, 7);
                    t.equal(wpt.pdop, 8);
                    t.equal(wpt.ageofdgpsdata, 9);
                    t.equal(wpt.dgpsid, 45);
                }
                if (t.not(gpx.wpt[1], undefined)) {
                    const wpt = gpx.wpt[1];
                    t.equal(wpt.lat, 13.4);
                    t.equal(wpt.lon, 46.7);
                    t.equal(wpt.ele, undefined);
                    t.equal(wpt.magvar, undefined);
                    t.equal(wpt.geoidheight, undefined);
                    t.equal(wpt.name, undefined);
                    t.equal(wpt.cmt, undefined);
                    t.equal(wpt.desc, undefined);
                    t.equal(wpt.src, undefined);
                    t.equal(wpt.link, undefined);
                    t.equal(wpt.sym, undefined);
                    t.equal(wpt.type, undefined);
                    t.equal(wpt.fix, undefined);
                    t.equal(wpt.sat, undefined);
                    t.equal(wpt.hdop, undefined);
                    t.equal(wpt.vdop, undefined);
                    t.equal(wpt.pdop, undefined);
                    t.equal(wpt.ageofdgpsdata, undefined);
                    t.equal(wpt.dgpsid, undefined);
                }
            }
        }
        if (t.not(gpx.rte, undefined)) {
            if (t.equal(gpx.rte.length, 2)) {
                if (t.not(gpx.rte[0], undefined)) {
                    const rte = gpx.rte[0];
                    t.equal(rte.name, 'route 1');
                    t.equal(rte.cmt, 'route 1 comment');
                    t.equal(rte.desc, 'route 1 description');
                    t.equal(rte.src, 'route 1 source');
                    if (t.not(rte.link, undefined)) {
                        t.equal(rte.link.href, 'https://domain.com/gpx/rte/1');
                        t.equal(rte.link.text, 'route 1');
                        t.equal(rte.link.type, 'route link type');
                    }
                    t.equal(rte.number, 7);
                    t.equal(rte.type, 'route type');
                    if (t.not(rte.rtept, undefined)) {
                        if (t.equal(rte.rtept.length, 3)) {
                            waypointEqual(t, rte.rtept[0], {
                                lat: 10,
                                lon: 20,
                                ele: 75.1,
                            });
                            waypointEqual(t, rte.rtept[1], {
                                lat: 11,
                                lon: 21,
                            });
                            waypointEqual(t, rte.rtept[2], {
                                lat: 12,
                                lon: 22,
                            });
                        }
                    }
                    // TODO
                }
                if (t.not(gpx.rte[1], undefined)) {
                    const rte = gpx.rte[1];
                    // TODO
                }
            }
        }
        if (t.not(gpx.trk, undefined)) {
            if (t.equal(gpx.trk.length, 2)) {
                if (t.not(gpx.trk[0], undefined)) {
                    const trk = gpx.trk[0];
                    // TODO
                }
                if (t.not(gpx.trk[1], undefined)) {
                    const trk = gpx.trk[1];
                    // TODO
                }
            }
        }
    }
    t.end();
});

export function waypointEqual(t: Test, found: Waypoint | undefined, wanted: Waypoint | undefined, ...[msg, extra]: MessageExtra): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return t.pass({
            msg: msg,
            ...extra,
        });
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return t.fail({
            msg: msg,
            ...extra,
            wanted: wanted,
            found: found,
        });
    } else if ((found !== undefined) && (wanted !== undefined)){
        t.equal(found.lat, wanted.lat);
        t.equal(found.lon, wanted.lon);
    }
}
