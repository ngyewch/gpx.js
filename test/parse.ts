import t, {Test} from 'tap';
import {MessageExtra} from '@tapjs/core';
import fs from 'fs';
import {parse} from '../src/parser.js';
import {
    type Bounds,
    type Copyright,
    type GPX,
    type Link,
    type Metadata,
    type Person,
    type Route,
    type Waypoint
} from '../src/types.js';

t.test('parse 1.0', t => {
    const gpx = parse(fs.readFileSync('testdata/gpx1.0_with_all_fields.gpx').toString());
    //console.log(JSON.stringify(gpx, undefined, 2));
    customEqual(t, gpx, {
        version: '1.0',
        creator: 'example creator',
        metadata: {
            name: 'example name',
            desc: 'example description',
            author: {
                name: 'example author',
                email: 'example@domain.com',
            },
            link: {
                href: 'https://domain.com/gpx/example',
                text: 'doc link text',
            },
            time: new Date('2013-01-01T12:00:00.000Z'),
            keywords: 'example keywords',
            bounds: {
                minlat: 1.2,
                minlon: 3.4,
                maxlat: 5.6,
                maxlon: 7.8,
            },
        },
        wpt: [
            {
                lat: 12.3,
                lon: 45.6,
                ele: 75.1,
                time: new Date('2013-01-02T02:03:00Z'),
                magvar: 1.1,
                geoidheight: 2.0,
                name: 'waypoint name',
                cmt: 'waypoint comment',
                desc: 'waypoint description',
                src: 'waypoint source',
                link: {
                    href: 'https://domain.com/gpx/wpt/1',
                    text: 'waypoint 1',
                },
                sym: 'waypoint symbol',
                type: 'waypoint type',
                fix: '2d',
                sat: 5,
                hdop: 6,
                vdop: 7,
                pdop: 8,
                ageofdgpsdata: 9,
                dgpsid: 45,
            },
            {
                lat: 13.4,
                lon: 46.7,
            },
        ],
        rte: [
            {
                name: 'route 1',
                cmt: 'route 1 comment',
                desc: 'route 1 description',
                src: 'route 1 source',
                link: {
                    href: 'https://domain.com/gpx/rte/1',
                    text: 'route 1',
                },
                number: 7,
                rtept: [
                    {
                        lat: 10,
                        lon: 20,
                        ele: 75.1,
                        time: new Date('2013-01-02T02:03:03Z'),
                        magvar: 1.2,
                        geoidheight: 2.1,
                        name: 'route point 1',
                        cmt: 'route point 1 comment',
                        desc: 'route point 1 description',
                        src: 'route point 1 source',
                        link: {
                            href: 'https://domain.com/gpx/rte/1/rtept/1',
                            text: 'route point 1',
                        },
                        sym: 'route point symbol',
                        type: 'route point type',
                        fix: '3d',
                        sat: 6,
                        hdop: 7,
                        vdop: 8,
                        pdop: 9,
                        ageofdgpsdata: 10,
                        dgpsid: 99,
                    },
                    {
                        lat: 11,
                        lon: 21,
                    },
                    {
                        lat: 12,
                        lon: 22,
                    }
                ],
            },
            {
                name: 'route 2',
                desc: 'route 2 description',
                rtept: [
                    {
                        lat: 13,
                        lon: 23,
                    },
                    {
                        lat: 14,
                        lon: 24,
                    }
                ],
            },
        ],
        // TODO
    }, gpxEqual);
    t.end();
});

t.test('parse 1.1', t => {
    const gpx = parse(fs.readFileSync('testdata/gpx1.1_with_all_fields.gpx').toString());
    //console.log(JSON.stringify(gpx, undefined, 2));
    customEqual(t, gpx, {
        version: '1.1',
        creator: 'example creator',
        metadata: {
            name: 'example name',
            desc: 'example description',
            author: {
                name: 'example author',
                email: 'example@domain.com',
                link: {
                    href: 'https://domain.com/authors/example',
                    text: 'author link text',
                    type: 'author link type',
                },
            },
            copyright: {
                author: 'gpx author',
                year: 2013,
                license: 'example license',
            },
            link: {
                href: 'https://domain.com/gpx/example',
                text: 'doc link text',
                type: 'doc link type',
            },
            time: new Date('2013-01-01T12:00:00.000Z'),
            keywords: 'example keywords',
            bounds: {
                minlat: 1.2,
                minlon: 3.4,
                maxlat: 5.6,
                maxlon: 7.8,
            },
        },
        wpt: [
            {
                lat: 12.3,
                lon: 45.6,
                ele: 75.1,
                time: new Date('2013-01-02T02:03:00Z'),
                magvar: 1.1,
                geoidheight: 2.0,
                name: 'waypoint name',
                cmt: 'waypoint comment',
                desc: 'waypoint description',
                src: 'waypoint source',
                link: {
                    href: 'https://domain.com/gpx/wpt/1',
                    text: 'waypoint 1',
                    type: 'waypoint link type',
                },
                sym: 'waypoint symbol',
                type: 'waypoint type',
                fix: '2d',
                sat: 5,
                hdop: 6,
                vdop: 7,
                pdop: 8,
                ageofdgpsdata: 9,
                dgpsid: 45,
            },
            {
                lat: 13.4,
                lon: 46.7,
            },
        ],
        rte: [
            {
                name: 'route 1',
                cmt: 'route 1 comment',
                desc: 'route 1 description',
                src: 'route 1 source',
                link: {
                    href: 'https://domain.com/gpx/rte/1',
                    text: 'route 1',
                    type: 'route link type',
                },
                number: 7,
                type: 'route type',
                rtept: [
                    {
                        lat: 10,
                        lon: 20,
                        ele: 75.1,
                        time: new Date('2013-01-02T02:03:03Z'),
                        magvar: 1.2,
                        geoidheight: 2.1,
                        name: 'route point 1',
                        cmt: 'route point 1 comment',
                        desc: 'route point 1 description',
                        src: 'route point 1 source',
                        link: {
                            href: 'https://domain.com/gpx/rte/1/rtept/1',
                            text: 'route point 1',
                            type: 'route point link type',
                        },
                        sym: 'route point symbol',
                        type: 'route point type',
                        fix: '3d',
                        sat: 6,
                        hdop: 7,
                        vdop: 8,
                        pdop: 9,
                        ageofdgpsdata: 10,
                        dgpsid: 99,
                    },
                    {
                        lat: 11,
                        lon: 21,
                    },
                    {
                        lat: 12,
                        lon: 22,
                    }
                ],
            },
            {
                name: 'route 2',
                desc: 'route 2 description',
                rtept: [
                    {
                        lat: 13,
                        lon: 23,
                    },
                    {
                        lat: 14,
                        lon: 24,
                    }
                ],
            },
        ],
        // TODO
    }, gpxEqual);
    t.end();
});

function gpxEqual(found: GPX | undefined, wanted: GPX | undefined): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        return (found.version === wanted.version)
            && (found.creator === wanted.creator)
            && metadataEqual(found.metadata, wanted.metadata)
            && arrayEqual(found.wpt, wanted.wpt, waypointEqual)
            && arrayEqual(found.rte, wanted.rte, routeEqual)
            // TODO
            ;
    }
    return false;
}

function metadataEqual(found: Metadata | undefined, wanted: Metadata | undefined): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        return (found.name === wanted.name)
            && (found.desc === wanted.desc)
            && personEqual(found.author, wanted.author)
            && copyrightEqual(found.copyright, wanted.copyright)
            && linkEqual(found.link, wanted.link)
            && dateEqual(found.time, wanted.time)
            && (found.keywords === wanted.keywords)
            && boundsEqual(found.bounds, wanted.bounds)
            ;
    }
    return false;
}

function personEqual(found: Person | undefined, wanted: Person | undefined): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        return (found.name === wanted.name)
            && (found.email === wanted.email)
            && linkEqual(found.link, wanted.link)
            ;
    }
    return false;

}

function linkEqual(found: Link | undefined, wanted: Link | undefined): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        return (found.href === wanted.href)
            && (found.text === wanted.text)
            && (found.type === wanted.type)
            ;
    }
    return false;
}

function copyrightEqual(found: Copyright | undefined, wanted: Copyright | undefined): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        return (found.author === wanted.author)
            && (found.year === wanted.year)
            && (found.license === wanted.license)
            ;
    }
    return false;
}

function dateEqual(found: Date | undefined, wanted: Date | undefined): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        return (found.toISOString() === wanted.toISOString());
    }
    return false;
}

function boundsEqual(found: Bounds | undefined, wanted: Bounds | undefined): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        return (found.minlat === wanted.minlat)
            && (found.minlon === wanted.minlon)
            && (found.maxlat === wanted.maxlat)
            && (found.maxlon === wanted.maxlon)
            ;
    }
    return false;
}

function waypointEqual(found: Waypoint | undefined, wanted: Waypoint | undefined): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        return (found.lat === wanted.lat)
            && (found.lon === wanted.lon)
            && (found.ele === wanted.ele)
            && (found.geoidheight === wanted.geoidheight)
            && (found.name === wanted.name)
            && (found.cmt === wanted.cmt)
            && (found.desc === wanted.desc)
            && (found.src === wanted.src)
            && linkEqual(found.link, wanted.link)
            && (found.sym === wanted.sym)
            && (found.type === wanted.type)
            && (found.fix === wanted.fix)
            && (found.sat === wanted.sat)
            && (found.hdop === wanted.hdop)
            && (found.vdop === wanted.vdop)
            && (found.pdop === wanted.pdop)
            && (found.ageofdgpsdata === wanted.ageofdgpsdata)
            && (found.dgpsid === wanted.dgpsid)
            ;
    }
    return false;
}

function routeEqual(found: Route | undefined, wanted: Route | undefined): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        return (found.name === wanted.name)
            && (found.cmt === wanted.cmt)
            && (found.desc === wanted.desc)
            && (found.src === wanted.src)
            && linkEqual(found.link, wanted.link)
            && (found.number === wanted.number)
            && (found.type === wanted.type)
            && arrayEqual(found.rtept, wanted.rtept, waypointEqual)
            ;
    }
    return false;
}

function customEqual<T>(t: Test, found: T | undefined, wanted: T | undefined, equalFn: (found: T | undefined, wanted: T | undefined) => boolean, ...[msg, extra]: MessageExtra): boolean {
    const isEqual = equalFn(found, wanted);
    if (isEqual) {
        return t.pass({
            msg: msg,
            ...extra,
        });
    } else {
        return t.fail({
            msg: msg,
            ...extra,
            wanted: wanted,
            found: found,
        });
    }
}

function arrayEqual<T>(found: T[] | undefined, wanted: T[] | undefined, equalFn: (found: T | undefined, wanted: T | undefined) => boolean): boolean {
    if ((found === undefined) && (wanted === undefined)) {
        return true;
    } else if (((found !== undefined) && (wanted === undefined)) || ((found === undefined) && (wanted !== undefined))) {
        return false;
    } else if ((found !== undefined) && (wanted !== undefined)) {
        if (found.length !== wanted.length) {
            return false;
        }
        for (let i = 0; i < found.length; i++) {
            if (!equalFn(found[i], wanted[i])) {
                return false;
            }
        }
        return true;
    }
    return false;
}





