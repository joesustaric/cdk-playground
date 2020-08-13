const cdk = require('@aws-cdk/core');
const ec2 = require('@aws-cdk/aws-ec2');

class CdkPlaygroundStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'CDKVpc', { maxAzs: 2 });
    
  }
}

module.exports = { CdkPlaygroundStack }
