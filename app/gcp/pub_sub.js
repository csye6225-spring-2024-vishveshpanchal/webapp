require('dotenv').config();
const { PubSub } = require('@google-cloud/pubsub');
const utils = require('../utils');
const logger = require('../loggers/index.js');

const var_GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
const var_GCP_PUBSUB_TOPIC_ID = process.env.GCP_PUBSUB_TOPIC_ID;

async function gcp_pub_sub(
    projectId = 'dev-csye-6225-webapp-1',
    topicNameOrId = 'pubsub-one-demo',
    username,
    verificationLink,
    first_name, 
    last_name
  ) 
{
    // Instantiates a client
    const pubsub = new PubSub({projectId});
    const email = username;
    // console.log(email);
    // console.log(verificationLink);
    // console.log(first_name);
    // console.log(last_name);
    // const dataBuffer = Buffer.from("YAYAYAYA");
    const message = `
      Hi ${last_name}, ${first_name},
      We just need to verify your email address before you can access Webapp.

      Verify your email address: 
    `;
    const messageFooter = `
      Thanks!
      Webapp - CSYE6225 - Vishvesh Ashwinbhai Panchal
    `;
    
    const jsonObj = {
      "email": email,
      "message": message,
      "messageFooter": messageFooter,
      "verificationLink": verificationLink
    };

    const jsonStr = JSON.stringify(jsonObj);
    const dataBuffer = Buffer.from(jsonStr);

    const messageId = await pubsub
      .topic(topicNameOrId)
      .publishMessage({data: dataBuffer});

    // console.log(`Message ${messageId} published.`);
    
    logger.debug(`File: gcp/pub_sub.js | Log: Message ${messageId} published! - @pub_sub_sendVerificationEmail function`);
    logger.info(`File: gcp/pub_sub.js | Log: Message ${messageId} published! - @pub_sub_sendVerificationEmail function`);
}

async function GCP_PubSub ( projectId, topicNameOrId, username )  {

  const pubsub = new PubSub({projectId});
  const email = username;

  const jsonObj = {
    "email": email,
  };

  const jsonStr = JSON.stringify(jsonObj);
  const dataBuffer = Buffer.from(jsonStr);

  const messageId = await pubsub
    .topic(topicNameOrId)
    .publishMessage({data: dataBuffer});
  
  logger.debug(`File: gcp/pub_sub.js | Log: Message ${messageId} published! - @GCP_PubSub function`);
  logger.info(`File: gcp/pub_sub.js | Log: Message ${messageId} published! - @GCP_PubSub function`);
}

const pub_sub_sendVerificationEmail = async (
  username,
  verificationLink,
  first_name, 
  last_name
  ) => {
    gcp_pub_sub("dev-csye-6225-webapp-1", "pubsub-one-demo", username, verificationLink, first_name, last_name);
}

const pub_sub_sendEmail = async (username) => {
  await GCP_PubSub(var_GCP_PROJECT_ID, var_GCP_PUBSUB_TOPIC_ID, username);
}

module.exports = {
  pub_sub_sendVerificationEmail,
  pub_sub_sendEmail
}