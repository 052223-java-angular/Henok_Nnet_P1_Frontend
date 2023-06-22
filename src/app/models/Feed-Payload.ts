import { CommentPayload } from "./Comment-Payload";

export interface FeedPayload{
    postId: string;
    title: String;
    category: String;
    description: String;
    location: String;
    postedTime: Date;
    neighborhoodName: String;
    contact: String;
    user_name: String;
    reviews: CommentPayload[];
}