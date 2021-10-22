import { createRedisClient } from "./redis.js";

export class RedisSession {
    constructor(settings) {
        Object.assign(this, {
            key: "session",
            getSessionKey: (context) => {
                const userId = context.senderId;
                return `${userId}:${userId}`;
            }
        }, settings);

        this.redis = createRedisClient({
            host: this.host,
            port: this.port,
            password: this.password
        });
    }

    middleware() {
        return async (context, next) => {
            const key = this.getSessionKey(context);
            let session = JSON.parse((await this.redis.get(key)) || '{}');

            Object.defineProperty(context, this.key, {
                get: () => session,
                set: (value) => {
                    session = value === null ? {} : value;
                },
            });

            await next();

            if (!Object.keys(session || {}).length) {
                await this.redis.del(key);
            } else {
                await this.redis.set(key, JSON.stringify(session));
            }
        };
    }
}