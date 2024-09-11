import {DOMParser, Element} from '@xmldom/xmldom';
import {parseISO} from 'date-fns';
import {Bounds, Copyright, GPX, Link, Metadata, Person, Route, Track, TrackSegment, Waypoint} from './types.js';

export function parse(s: string): GPX | undefined {
    const parser = new DOMParser();
    const doc = parser.parseFromString(s, 'text/xml');
    if (!doc.documentElement) {
        return undefined;
    }
    const version = doc.documentElement.getAttribute('version');
    if (version === null) {
        throw 'version not specified';
    }
    if (version === '1.0') {
        const parser = new GPX_1_0_Parser();
        return parser.parseXML(doc.documentElement);
    } else if ((version === '1.1') || (version === '1.2')) {
        const parser = new GPX_1_1_Parser();
        return parser.parseXML(doc.documentElement);
    } else {
        throw `unsupported GPX version: ${version}`;
    }
}

abstract class GPX_Parser {
    public parse(s: string): GPX | undefined {
        const parser = new DOMParser();
        const doc = parser.parseFromString(s, 'text/xml');
        if (doc.documentElement === null) {
            return undefined;
        }
        return this.parseXML(doc.documentElement);
    }

    public abstract parseXML(documentElement: Element): GPX | undefined;
}

class GPX_1_0_Parser extends GPX_Parser {
    public parseXML(documentElement: Element): GPX | undefined {
        const helper = new ElementHelper(documentElement);
        const version = helper.getString('@version');
        if (version === undefined) {
            throw 'version not specified';
        }
        if (version !== '1.0') {
            throw 'version mismatch';
        }
        const creator = helper.getString('@creator');
        if (creator === undefined) {
            throw 'creator not specified';
        }
        const url = helper.getString('url')
        return {
            version: version,
            creator: creator,
            metadata: {
                name: helper.getString('name'),
                desc: helper.getString('desc'),
                time: helper.getDate('time'),
                keywords: helper.getString('keywords'),
                bounds: helper.get('bounds', parseBounds),
                author: {
                    name: helper.getString('author'),
                    email: helper.getString('email'),
                },
                link: (url === undefined) ? undefined : {
                    href: url,
                    text: helper.getString('urlname'),
                },
            },
            wpt: helper.getArray('wpt', parseWaypoint_1_0),
            rte: helper.getArray('rte', parseRoute_1_0),
            trk: helper.getArray('trk', parseTrack_1_0),
        };
    }
}

class GPX_1_1_Parser extends GPX_Parser {
    public parseXML(documentElement: Element): GPX | undefined {
        const helper = new ElementHelper(documentElement);
        const version = helper.getString('@version');
        if (version === undefined) {
            throw 'version not specified';
        }
        if (version !== '1.1') {
            throw 'version mismatch';
        }
        const creator = helper.getString('@creator');
        if (creator === undefined) {
            throw 'creator not specified';
        }
        return {
            version: version,
            creator: creator,
            metadata: helper.get('metadata', parseMetadata),
            wpt: helper.getArray('wpt', parseWaypoint),
            rte: helper.getArray('rte', parseRoute),
            trk: helper.getArray('trk', parseTrack),
        };
    }
}

function parseMetadata(el?: Element): Metadata | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    return {
        name: helper.getString('name'),
        desc: helper.getString('desc'),
        time: helper.getDate('time'),
        keywords: helper.getString('keywords'),
        bounds: helper.get('bounds', parseBounds),
        author: helper.get('author', parsePerson),
        link: helper.get('link', parseLink),
        copyright: helper.get('copyright', parseCopyright),
    };
}

function parsePerson(el?: Element): Person | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    return {
        name: helper.getString('name'),
        email: helper.get('email', parseEmail),
        link: helper.get('link', parseLink),
    };
}

function parseEmail(el?: Element): string | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    const id = helper.getString('@id');
    if (id === undefined) {
        throw `Email@id not specified`;
    }
    const domain = helper.getString('@domain');
    if (domain === null) {
        throw `Email@domain not specified`;
    }
    return `${id}@${domain}`;
}

function parseLink(el?: Element): Link | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    const href = helper.getString('@href');
    if (href === undefined) {
        throw `Link@href not specified`;
    }
    return {
        href: href,
        text: helper.getString('text'),
        type: helper.getString('type'),
    };
}

function parseCopyright(el?: Element): Copyright | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    const author = helper.getString('@author');
    if (author === undefined) {
        throw `Copyright@author not specified`;
    }
    return {
        author: author,
        year: helper.getNumber('year'),
        license: helper.getString('license'),
    }
}

function parseBounds(el?: Element): Bounds | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    const minlat = helper.getNumber('@minlat');
    if (minlat === undefined) {
        throw `Bounds@minlat not specified`;
    }
    const minlon = helper.getNumber('@minlon');
    if (minlon === undefined) {
        throw `Bounds@minlon not specified`;
    }
    const maxlat = helper.getNumber('@maxlat');
    if (maxlat === undefined) {
        throw `Bounds@maxlat not specified`;
    }
    const maxlon = helper.getNumber('@maxlon');
    if (maxlon === undefined) {
        throw `Bounds@maxlon not specified`;
    }
    return {
        minlat: minlat,
        minlon: minlon,
        maxlat: maxlat,
        maxlon: maxlon,
    }
}

function parseWaypoint(el?: Element, isVersion1_0?: boolean): Waypoint | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    const lat = helper.getNumber('@lat');
    if (lat === undefined) {
        throw `Waypoint@lat not specified`;
    }
    const lon = helper.getNumber('@lon');
    if (lon === undefined) {
        throw `Waypoint@lon not specified`;
    }
    const getLink = (): Link | undefined => {
        if (isVersion1_0) {
            const url = helper.getString('url');
            if (url !== undefined) {
                return {
                    href: url,
                    text: helper.getString('urlname'),
                };
            } else {
                return undefined;
            }
        } else {
            return helper.get('link', parseLink);
        }
    };
    return {
        lat: lat,
        lon: lon,
        ele: helper.getNumber('ele'),
        time: helper.getDate('time'),
        magvar: helper.getNumber('magvar'),
        geoidheight: helper.getNumber('geoidheight'),
        name: helper.getString('name'),
        cmt: helper.getString('cmt'),
        desc: helper.getString('desc'),
        src: helper.getString('src'),
        link: getLink(),
        sym: helper.getString('sym'),
        type: helper.getString('type'),
        fix: helper.getString('fix'),
        sat: helper.getNumber('sat'),
        hdop: helper.getNumber('hdop'),
        vdop: helper.getNumber('vdop'),
        pdop: helper.getNumber('pdop'),
        ageofdgpsdata: helper.getNumber('ageofdgpsdata'),
        dgpsid: helper.getNumber('dgpsid'),
    };
}

function parseWaypoint_1_0(el?: Element): Waypoint | undefined {
    return parseWaypoint(el, true);
}

function parseRoute(el?: Element, isVersion1_0?: boolean): Route | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    const getLink = (): Link | undefined => {
        if (isVersion1_0) {
            const url = helper.getString('url');
            if (url !== undefined) {
                return {
                    href: url,
                    text: helper.getString('urlname'),
                };
            } else {
                return undefined;
            }
        } else {
            return helper.get('link', parseLink);
        }
    };
    return {
        name: helper.getString('name'),
        cmt: helper.getString('cmt'),
        desc: helper.getString('desc'),
        src: helper.getString('src'),
        link: getLink(),
        number: helper.getNumber('number'),
        type: isVersion1_0 ? undefined : helper.getString('type'),
        rtept: isVersion1_0 ? helper.getArray('rtept', parseWaypoint_1_0) : helper.getArray('rtept', parseWaypoint),
    };
}

function parseRoute_1_0(el?: Element): Route | undefined {
    return parseRoute(el, true);
}

function parseTrack(el?: Element, isVersion1_0?: boolean): Track | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    const getLink = (): Link | undefined => {
        if (isVersion1_0) {
            const url = helper.getString('url');
            if (url !== undefined) {
                return {
                    href: url,
                    text: helper.getString('urlname'),
                };
            } else {
                return undefined;
            }
        } else {
            return helper.get('link', parseLink);
        }
    };
    return {
        name: helper.getString('name'),
        cmt: helper.getString('cmt'),
        desc: helper.getString('desc'),
        src: helper.getString('src'),
        link: getLink(),
        number: helper.getNumber('number'),
        type: isVersion1_0 ? undefined : helper.getString('type'),
        trkseg: isVersion1_0 ? helper.getArray('trkseg', parseTrackSegment_1_0) : helper.getArray('trkseg', parseTrackSegment_1_0),
    };
}

function parseTrack_1_0(el?: Element): Track | undefined {
    return parseTrack(el, true);
}

function parseTrackSegment(el?: Element, isVersion1_0?: boolean): TrackSegment | undefined {
    if (el === undefined) {
        return undefined;
    }
    const helper = new ElementHelper(el);
    if (isVersion1_0) {
        return {
            trkpt: helper.getArray('trkpt', parseWaypoint_1_0),
        }
    } else {
        return {
            trkpt: helper.getArray('trkpt', parseWaypoint),
        }
    }
}

function parseTrackSegment_1_0(el?: Element): TrackSegment | undefined {
    return parseTrackSegment(el, true);
}

class ElementHelper {
    private readonly el: Element;

    constructor(el: Element) {
        this.el = el;
    }

    public getString(name: string): string | undefined {
        return this.getText(name);
    }

    public getNumber(name: string): number | undefined {
        const text = this.getText(name);
        if (text === undefined) {
            return undefined;
        }
        return Number(text);
    }

    public getDate(name: string): Date | undefined {
        const text = this.getText(name);
        if (text === undefined) {
            return undefined;
        }
        return parseISO(text);
    }

    public get<T>(name: string, mapper: (el?: Element) => T | undefined): T | undefined {
        return mapper(this.getFirstElement(name));
    }

    public getArray<T>(name: string, mapper: (el?: Element) => T | undefined): T[] | undefined {
        const outputs: T[] = [];
        const elements = this.getElements(name);
        if (elements === undefined) {
            return undefined;
        }
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            const output = mapper(el);
            if (output !== undefined) {
                outputs.push(output);
            }
        }
        if (outputs.length === 0) {
            return undefined;
        }
        return outputs;
    }

    private getText(name: string): string | undefined {
        if (name.startsWith('@')) {
            const text = this.el.getAttribute(name.substring(1));
            return (text !== null) ? text : undefined;
        }
        const childElement = this.getFirstElement(name);
        if (childElement === undefined) {
            return undefined;
        }
        return getElementText(childElement);
    }

    public getFirstElement(name: string): Element | undefined {
        const nodeList = this.el.childNodes;
        for (let i = 0; i < nodeList.length; i++) {
            const node = nodeList.item(i);
            if (node instanceof Element) {
                if (node.getQualifiedName() === name) {
                    return node;
                }
            }
        }
        return undefined;
    }

    public getElements(name: string): Element[] | undefined {
        const elements: Element[] = [];
        const nodeList = this.el.childNodes;
        for (let i = 0; i < nodeList.length; i++) {
            const node = nodeList.item(i);
            if (node instanceof Element) {
                if (node.getQualifiedName() === name) {
                    elements.push(node);
                }
            }
        }
        if (elements.length === 0) {
            return undefined;
        }
        return elements;
    }
}

function getElementText(el?: Element): string | undefined {
    if (el === undefined) {
        return undefined;
    }
    let text = '';
    for (let i = 0; i < el.childNodes.length; i++) {
        const node = el.childNodes.item(i);
        if ((node !== null) && (node.nodeValue !== null)) {
            text += node.nodeValue;
        }
    }
    return (text !== '') ? text : undefined;
}
