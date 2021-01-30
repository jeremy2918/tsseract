import { Types, Document } from 'mongoose';

export interface iAuthenticatedUser {
  _id: any;
  email: string;
  name: string;
  googleId: string | null;
}

export interface iComment extends Document {
  user: Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface iPost extends Document {
  user: Types.ObjectId;
  title: string;
  body: string;
  cover: string;
  comments: [];
  likes: Types.ObjectId[];
  interactions: Number;
  tags: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface iTag extends Document {
  name: string;
  popularity: number;
  _doc: Document;
}

export interface iUser extends Document {
  name: string;
  avatar: string;
  googleId: string | null;
  password: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}
