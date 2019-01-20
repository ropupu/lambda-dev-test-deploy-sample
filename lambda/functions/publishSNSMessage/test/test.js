const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const proxyquire =  require('proxyquire');

chai.use(chaiAsPromised);
const expect = chai.expect;;

const normalAwsSdkStub = {
  SNS: class {
    publish() {
      return {
        promise: async function(params) {
          return true;
        }
      }
    }
  }
} 

const errorAwsSdkStub = {
  SNS: class {
    publish() {
      return {
        promise: async function(params) {
          throw new Error('aws sdk error');
        }
      }
    }
  }
}

// set process.env
require('dotenv').config({ path: './test.env' })

// set event, context
const event = {};
const context = {};

describe('publishSNSMessage', function() {
  this.timeout(5000); // proxyquireによるスタブ化に初回時間がかかるのでタイムアウトを長くする
  it('should return success! when sns publishing succeeds', async () => {
    const lambda = proxyquire('../index', { 'aws-sdk': normalAwsSdkStub });
    const ret = await lambda.handler(event, context);
    expect(ret).to.equal('success!');
  });

  it('should throw error when sns publishing fails', async () => {
    const lambda = proxyquire('../index', { 'aws-sdk': errorAwsSdkStub });
    await expect(lambda.handler(event, context)).to.be.eventually.rejected;
  });
});