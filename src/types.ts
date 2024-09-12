/**
 * GPX object.
 */
export interface GPX {
    /** GPX version. */
    version: string;
    /** Name or URL of the software that created this GPX document. */
    creator: string;
    /** Metadata. */
    metadata?: Metadata;
    /** Waypoints. */
    wpt?: Waypoint[];
    /** Routes. */
    rte?: Route[];
    /** Tracks. */
    trk?: Track[];
    /** Extensions. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
}

/**
 * Metadata object.
 */
export interface Metadata {
    /** Name. */
    name?: string;
    /** Description. */
    desc?: string;
    /** The person or organization who created the file. */
    author?: Person;
    /** Copyright and license information governing the use of the file. */
    copyright?: Copyright;
    /** URLs associated with the location described in the file. */
    link?: Link[];
    /** The creation date of the file. */
    time?: Date;
    /** Keywords associated with the file. */
    keywords?: string;
    /** Minimum and maximum coordinates which describe the extent of the coordinates in the file. */
    bounds?: Bounds;
    /** Extensions. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
}

/**
 * Person object.
 */
export interface Person {
    name?: string;
    email?: string;
    link?: Link;
}

/**
 * Link object.
 */
export interface Link {
    href: string;
    text?: string;
    type?: string;
}

/**
 * Copyright object.
 */
export interface Copyright {
    author: string;
    year?: number;
    license?: string;
}

/**
 * Bounds object.
 */
export interface Bounds {
    minlat: number;
    minlon: number;
    maxlat: number;
    maxlon: number;
}

/**
 * Waypoint object.
 */
export interface Waypoint {
    lat: number;
    lon: number;
    ele?: number;
    time?: Date;
    magvar?: number;
    geoidheight?: number;
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link[];
    sym?: string;
    type?: string;
    fix?: string;
    sat?: number;
    hdop?: number;
    vdop?: number;
    pdop?: number;
    ageofdgpsdata?: number;
    dgpsid?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
}

/**
 * Route object.
 */
export interface Route {
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link[];
    number?: number;
    type?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
    rtept?: Waypoint[];
}

/**
 * Track object.
 */
export interface Track {
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link[];
    number?: number;
    type?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
    trkseg?: TrackSegment[];
}

/**
 * Track segment object.
 */
export interface TrackSegment {
    trkpt?: Waypoint[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
}
