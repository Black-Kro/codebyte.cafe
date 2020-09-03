import { IMedia } from './IMedia';

export interface IProfile {
    nickname: string;
    bio: string;
    avatar: IMedia;
    header: IMedia;
}

export interface IUser {
    id: string;
    username: string;
    profile: IProfile;
    accountType: string;
    roles: string[];
    isVerified: boolean;
    created: Date;
    updated: Date;
    followed: boolean;
}