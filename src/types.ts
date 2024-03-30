import { RecordModel } from "pocketbase";

export interface Config {
  oobeComplete: boolean;
}

export enum Collections {
  Users = "users",
  Groups = "groups",
  Messages = "messages",
}

export interface User extends RecordModel {
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  name: string;
  avatar?: string;
  joinedGroups: string[];
}

export interface Group extends RecordModel {
  name: string;
  joinCode: string;
  owner: string;
  allowedPosters: string[];
  icon?: string;
}

export interface Message extends RecordModel {
  group: string;
  from: string;
  /** HTML */
  text: string;
}
