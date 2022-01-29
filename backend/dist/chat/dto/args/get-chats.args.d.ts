import { User } from '../../../auth/entities';
import { TokenArgs } from '../../../common/dto/args';
export declare class GetChatsArgs extends TokenArgs {
    user: User;
}
