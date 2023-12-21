const sendEmailToUsers=require("../mail/sendAccountCreationEmail");

const emailQueueProcessors=  async (job,done)=>{
  console.log('emailQueueProcessors',job.data);
  const {name,email}=job.data;
//   job.data.forEach( async (user)=>{
//      await sendEmailToUsers({name:user.name,email:user.email});
//   })
  await sendEmailToUsers({name,email});
  try {
    setTimeout(() => {
      done();
    }, 5000);
  } catch (error) {
    console.log(error);
    throw error;
  }
  
}

module.exports=emailQueueProcessors;