export interface GPX {
    version: string;
    creator: string;
    metadata?: Metadata;
    wpt?: Waypoint[];
    rte?: Route[];
    trk?: Track[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
}

export interface Metadata {
    name?: string;
    desc?: string;
    author?: Person;
    copyright?: Copyright;
    link?: Link;
    time?: Date;
    keywords?: string;
    bounds?: Bounds;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
}

export interface Person {
    name?: string;
    email?: string;
    link?: Link;
}

export interface Link {
    href: string;
    text?: string;
    type?: string;
}

export interface Copyright {
    author: string;
    year?: number;
    license?: string;
}

export interface Bounds {
    minlat: number;
    minlon: number;
    maxlat: number;
    maxlon: number;
}

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
    link?: Link;
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

export interface Route {
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link;
    number?: number;
    type?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
    rtept?: Waypoint[];
}

export interface Track {
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link;
    number?: number;
    type?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
    trkseg?: TrackSegment[];
}

export interface TrackSegment {
    trkpt?: Waypoint[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
}
