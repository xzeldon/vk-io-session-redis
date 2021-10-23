import { Middleware } from "middleware-io";
import { Context } from "vk-io";

export declare class RedisSession {
    constructor(options: IRedisClientOptions);
    middleware(): Middleware<IContext>;
}

export interface IContext extends Context {
    [key: string]: any;
}

export interface IRedisClientOptions {
    host?: string,
    port?: number,
    password?: string;
}