import { IUser } from './IUser';
import { IMedia, IExternalMedia } from './IMedia';

export interface IPost {
    id: string;
    text: string;
    parent: string;
    childCount: number;
    children: IPost[];
    level: number;
    author: IUser;
    source: IUser;
    likes: number;
    dislikes: number;
    liked: boolean;
    disliked: boolean;
    media: IMedia[];
    isMyPost: boolean;
    externalMedia: IExternalMedia[];
    locked: boolean;
    deleted: boolean;
    deletedAt: boolean;
    deletedBy: IUser;
    created: Date;
    updated: Date;
}