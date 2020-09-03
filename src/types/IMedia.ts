export interface IMediaMetadata {
    width: number;
    height: number;
    base64: string;
}

export interface IMedia {
    id: string;
    title: string;
    url: string;
    mimeType: string;
    mediaType: string;
    metadata: IMediaMetadata;
    created: Date;
    updated: Date;
}

export interface IExternalMediaImage {
    width: number;
    height: number;
    url: string;
    mp4: string;
}

export interface IExternalMediaImages {
    original: IExternalMediaImage;
    small: IExternalMediaImage;
    medium: IExternalMediaImage;
    large: IExternalMediaImage;
}

export interface IExternalMedia {
    id: string;
    slug: string;
    title: string;
    images: IExternalMediaImages;
}