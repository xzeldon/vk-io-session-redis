# vk-io-session-redis
vk-io-session-redis - simple implementation of the Redis sessions ⚙️

## Installation
> **[Node.js](https://nodejs.org/) 13.0.0 or newer is required**

### Yarn
Recommended
```
yarn add vk-io-session-redis
```

### NPM
```
npm i vk-io-session-redis
```

### Example usage:

```js
import { VK } from "vk-io";
import { RedisSession } from "vk-io-session-redis";

const bot = new VK({
    token: process.env.TOKEN
});

const redisSession = new RedisSession();
bot.updates.use(redisSession.middleware());

bot.updates.on("message", (context) => {
    if (context.isOutbox) return;

    const { session } = context;

    session.counter = session.counter || 0;
    session.counter++;

    context.send(`You turned to the bot (${session.counter}) times`);
});

bot.updates.start().catch(err => console.error(err));
```