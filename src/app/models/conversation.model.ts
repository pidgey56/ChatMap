import { ChatMessage } from "./chat-message.model";
import { User } from "./user.model";

export class Conversation {

    constructor(idConv : string, users : string[]){
        this.idConv = idConv;
        this.users = users;
    }
    
    users: string[];
    idConv: string;

}