import {DOMParser, Element} from '@xmldom/xmldom';
import {parseISO} from 'date-fns';
import {Bounds, Copyright, GPX, Link, Metadata, Person} from './types.js';

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
    const creator = doc.documentElement.getAttribute('creator');
    if (creator === null) {
        throw 'creator not specified';
    }
    const gpx: GPX = {
        version: version,
        creator: creator,
    };
    gpx.metadata = {};

    if (version === '1.0') {
        gpx.metadata = parseMetadata(version, doc.documentElement);
    } else if ((version === '1.1') || (version === '1.2')) {
        gpx.metadata = parseMetadata(version, getElement(doc.documentElement, 'metadata'));
    }

    return gpx;
}

function parseMetadata(version: string, el?: Element): Metadata | undefined {
    if (el === undefined) {
        return undefined;
    }
    const metadata: Metadata = {};
    metadata.name = getStringFromChildElement(el, 'name');
    metadata.desc = getStringFromChildElement(el, 'desc');
    metadata.time = parseTime(getStringFromChildElement(el, 'time'));
    metadata.keywords = getStringFromChildElement(el, 'keywords');
    metadata.bounds = parseBounds(getElement(el, 'bounds'));
    if (version === '1.0') {
        metadata.author = {
            name: getStringFromChildElement(el, 'author'),
            email: getStringFromChildElement(el, 'email'),
        };
        const url = getStringFromChildElement(el, 'url');
        if (url !== undefined) {
            metadata.link = {
                href: url,
                text: getStringFromChildElement(el, 'urlname'),
            };
        }
    } else if ((version === '1.1') || (version === '1.2')) {
        metadata.author = parsePerson(getElement(el, 'author'));
        metadata.link = parseLink(getElement(el, 'link'));
        metadata.copyright = parseCopyright(getElement(el, 'copyright'));
    }
    return metadata;
}

function parseLink(el?: Element): Link | undefined {
    if (el === undefined) {
        return undefined;
    }
    const href = el.getAttribute('href');
    if (href === null) {
        return undefined;
    }
    return {
        href: href,
        text: getStringFromChildElement(el, 'text'),
        type: getStringFromChildElement(el, 'type'),
    };
}

function parsePerson(el?: Element): Person | undefined {
    if (el === undefined) {
        return undefined;
    }
    return {
        name: getStringFromChildElement(el, 'name'),
        email: parseEmail(getElement(el, 'email')),
        link: parseLink(getElement(el, 'link')),
    };
}

function parseEmail(el?: Element): string | undefined {
    if (el === undefined) {
        return undefined;
    }
    const id = el.getAttribute('id');
    const domain = el.getAttribute('domain');
    return `${id}@${domain}`;
}

function parseBounds(el?: Element): Bounds | undefined {
    if (el === undefined) {
        return undefined;
    }
    const minlat = parseNumber(el.getAttribute('minlat'));
    const minlon = parseNumber(el.getAttribute('minlon'));
    const maxlat = parseNumber(el.getAttribute('maxlat'));
    const maxlon = parseNumber(el.getAttribute('maxlon'));
    if ((minlat === undefined) || (minlon === undefined) || (maxlat === undefined) || (maxlon === undefined)) {
        return undefined;
    }
    return {
        minlat: minlat,
        minlon: minlon,
        maxlat: maxlat,
        maxlon: maxlon,
    }
}

function parseCopyright(el?: Element): Copyright | undefined {
    if (el === undefined) {
        return undefined;
    }
    const author = el.getAttribute('author');
    if (author === null) {
        return undefined;
    }
    return {
        author: author,
        year: parseNumber(getStringFromChildElement(el, 'year')),
        license: getStringFromChildElement(el, 'license'),
    }
}

function parseNumber(s: string | null | undefined): number | undefined {
    if ((s === undefined) || (s === null)) {
        return undefined;
    }
    return Number(s);
}

function parseTime(timeString?: string): Date | undefined {
    if (timeString === undefined) {
        return undefined;
    }
    return parseISO(timeString);
}

function getElement(el: Element, qualifiedName: string): Element | undefined {
    const nodeList = el.getElementsByTagName(qualifiedName);
    if (nodeList.length === 0) {
        return undefined;
    }
    return nodeList.item(0) as Element;
}

function getStringFromChildElement(el: Element, qualifiedName: string): string | undefined {
    const el1 = getElement(el, qualifiedName);
    if (el1 === undefined) {
        return undefined;
    }
    return getElementText(el1);
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
