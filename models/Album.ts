export interface Image {
    url: string;
    height: number;
    width: number;
}
  
export interface Album {
    album_type: string;
    total_tracks: string;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
}

export class Track {
    album: Album;
    id: string;
    name: string;
    release_date: string;
    type: string;
    uri: string;

    constructor(album: Album, id: string, name: string, release_date: string, type: string, uri: string) {
        
        this.album = album;
        this.id = id;
        this.name = name;
        this.release_date = release_date;
        this.type = type;
        this.uri = uri;
    }
  
}

export class Artist {
    artists: string[];
}