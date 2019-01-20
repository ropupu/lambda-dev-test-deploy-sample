const AWS = require('aws-sdk');
const sns = new AWS.SNS({apiVersion: '2010-03-31'});

exports.handler = async function(event, context) {
  const snsTopicArn = process.env['SNS_TOPIC_ARN'];
  const subject = "hello";
  const message = "hello from Lambda!";

  const params = {
    TopicArn: snsTopicArn,
    Subject: subject,
    Message: message
  };

  try {
    await sns.publish(params).promise();
  } catch (err) {
    console.log(err);
    throw err;
  }

  return "success!";
};