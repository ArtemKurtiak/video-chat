import { Chat } from '../../entities';
import { MessageOT } from './message';
export declare class ChatWithLastMessage extends Chat {
    lastMessage: MessageOT;
}
export declare class ChatMessages extends Chat {
    messages: MessageOT[];
}
