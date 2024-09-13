/**
 * GPX document.
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
 * Metadata.
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
 * A person or organization.
 */
export interface Person {
    /** Name of person or organization. */
    name?: string;
    /** Email address. */
    email?: string;
    /** Link to website or other external information about this person. */
    link?: Link;
}

/**
 * A link to an external resource (Web page, digital photo, video clip, etc) with additional information.
 */
export interface Link {
    /** URL of hyperlink. */
    href: string;
    /** Text of hyperlink. */
    text?: string;
    /** MIME type of content. */
    type?: string;
}

/**
 * Information about the copyright holder and any license governing use of this file.
 */
export interface Copyright {
    /** Copyright holder. */
    author: string;
    /** Year of copyright. */
    year?: number;
    /** Link to external file containing license text. */
    license?: string;
}

/**
 * Two lat/lon pairs defining the extent of an element.
 */
export interface Bounds {
    /** The minimum latitude. */
    minlat: number;
    /** The minimum longitude */
    minlon: number;
    /** The maximum latitude. */
    maxlat: number;
    /** The maximum longitude. */
    maxlon: number;
}

/**
 * Represents a waypoint, point of interest, or named feature on a map.
 */
export interface Waypoint {
    /** The latitude of the point. This is always in decimal degrees, and always in WGS84 datum. */
    lat: number;
    /** The longitude of the point. This is always in decimal degrees, and always in WGS84 datum. */
    lon: number;
    /** Elevation (in meters) of the point. */
    ele?: number;
    /** Creation/modification timestamp for element. Date and time in are in Universal Coordinated Time (UTC), not local time! Conforms to ISO 8601 specification for date/time representation. Fractional seconds are allowed for millisecond timing in track logs. */
    time?: Date;
    /** Magnetic variation (in degrees) at the point. */
    magvar?: number;
    /** Height (in meters) of geoid (mean sea level) above WGS84 earth ellipsoid. As defined in NMEA GGA message. */
    geoidheight?: number;
    /** The GPS name of the waypoint. */
    name?: string;
    /** GPS waypoint comment. */
    cmt?: string;
    /** A text description of the element. */
    desc?: string;
    /** Source of data. */
    src?: string;
    /** Link to additional information about the waypoint. */
    link?: Link[];
    /** Text of GPS symbol name. */
    sym?: string;
    /** Type (classification) of the waypoint. */
    type?: string;
    /** Type of GPX fix. */
    fix?: string;
    /** Number of satellites used to calculate the GPX fix. */
    sat?: number;
    /** Horizontal dilution of precision. */
    hdop?: number;
    /** Vertical dilution of precision. */
    vdop?: number;
    /** Position dilution of precision. */
    pdop?: number;
    /** Number of seconds since last DGPS update. */
    ageofdgpsdata?: number;
    /** ID of DGPS station used in differential correction. */
    dgpsid?: number;
    /**  Extensions. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
}

/**
 * Route. An ordered list of waypoints representing a series of turn points leading to a destination.
 */
export interface Route {
    /** GPS name of route. */
    name?: string;
    /** GPS comment for route. */
    cmt?: string;
    /** Text description of route for user. */
    desc?: string;
    /** Source of data. */
    src?: string;
    /** Links to external information about the route. */
    link?: Link[];
    /** GPS route number. */
    number?: number;
    /** Type (classification) of route. */
    type?: string;
    /**  Extensions. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
    /** A list of route points. */
    rtept?: Waypoint[];
}

/**
 * Track - an ordered list of points describing a path.
 */
export interface Track {
    /** GPS name of track. */
    name?: string;
    /** GPS comment for track. */
    cmt?: string;
    /** User description of track. */
    desc?: string;
    /** Source of data. */
    src?: string;
    /** Links to external information about track. */
    link?: Link[];
    /** GPS track number. */
    number?: number;
    /** Type (classification) of track. */
    type?: string;
    /** Extensions. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
    /** A track segment holds a list of track points which are logically connected in order. To represent a single GPS track where GPS reception was lost, or the GPS receiver was turned off, start a new track segment for each continuous span of track data. */
    trkseg?: TrackSegment[];
}

/**
 * A track segment holds a list of track points which are logically connected in order. To represent a single GPS track where GPS reception was lost, or the GPS receiver was turned off, start a new track segment for each continuous span of track data.
 */
export interface TrackSegment {
    /** A track point holds the coordinates, elevation, timestamp, and metadata for a single point in a track. */
    trkpt?: Waypoint[];
    /** Extensions. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: any;
}
