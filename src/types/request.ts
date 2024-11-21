import { Request } from 'express';

export interface IRequest extends Request {
    user: any;  // Aqui você pode substituir o tipo `any` pelo tipo do seu usuário, por exemplo, `User`
}

