const Queue = require("bull");
const path=require("path");
const {REDIS_URI,REDIS_PORT}=require("../config/redisCredentials");
const emailQueue = new Queue("emailQueue", {
    redis: {
      host: REDIS_URI,
      port: REDIS_PORT,
    },
  });


emailQueue.process(path.join(__dirname,'emailQueueProcessors.js'));


emailQueue.on('completed', async (job,result)=>{
    console.log('completed',job.id);

    await job.remove();
})
