import redis from 'redis';
import util from 'util';

export const createRedisClient = (settings) => {
    const client = redis.createClient(settings);

    return {
        get: util.promisify(client.get).bind(client),
        set: util.promisify(client.set).bind(client),
        del: util.promisify(client.del).bind(client),
    };
};