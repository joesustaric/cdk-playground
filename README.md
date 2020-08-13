# CDK Playground

AWS have recently released CDK. I want to play with it.

> Use the AWS CDK to define your cloud resources in a familiar programming language. The AWS CDK supports TypeScript, JavaScript, Python, Java, and C#/.Net. 

More info [here](https://docs.aws.amazon.com/cdk/latest/guide/home.html).

## Useful commands

 * `npm run test`         perform the jest unit tests
 * `cdk deploy`           deploy this stack to your default AWS account/region
 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template

### Install CDK

```bash
# requires Node.js ≥ 10.13.0
# !! versions 13.0.0 to 13.6.0 are not supported !!
$ npm i -g aws-cdk

# To create a new js project in a new blank dir run..
$ cdk init app --language javascript
```

### Managing AWS Construct Library Modules 

AWS Construct Library modules are named like `@aws-cdk/SERVICE-NAME`

```bash
# Install
npm install @aws-cdk/aws-s3 @aws-cdk/aws-lambda

# Update
npm update
```

### CDK Key Concepts

#### Constructs  
Basic building blocks. Represent a single Resource (eg S3) or higher-level component of multiple AWS CDK Resources.
CDK includes a _Construct_ library which includes 'levels' of Constructs. Deails [here](https://docs.aws.amazon.com/cdk/latest/guide/constructs.html).

- **Level 1 (L1)**, Direct mappings to AWS Resources available in CF. e.g. `s3.CfnBucket` Here you will need to explicity configure all resource properties.

- **Level 2 (L2)**, AWS Resources but higher level, e.g. `s3.Bucket` but with additional properties and methods. e.g. `bucket.addLifeCycleRule()`

- **Patterns**, even higher level AWS Resources! Things that often involve more AWS Resources. e.g `aws-apigateway.LambdaRestApi` represents API Gateway backed by a Lambda function.

#### App
Application written in CDK supported languages to define AWS infrastructure. One or more stacks. More info [here](https://docs.aws.amazon.com/cdk/latest/guide/apps.html).

e.g. Define a Stack..

```javascript
class MyFirstStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new s3.Bucket(this, 'MyFirstBucket');
  }
}
```

Add the Stack construct to the `App` construct. `App` is the root of the Construct tree.

```javascript
const app = new App();
new MyFirstStack(app, 'hello-cdk');
app.synth();
```

### App Lifecycle
Summarised from [here](https://docs.aws.amazon.com/cdk/latest/guide/apps.html).

1. Construction

Instantiate all the defined constructs + link them together. Most of the app code is executed.

2. Preparation

Constructs that have implimented the `prepare()` go through another round to set up their final state (tranparent / no user feedback) Not recommended to use the prepare hook. It could impact behaviour. 

3. Validation

Constructs that have implimented the `validate()` can self validate to ensure they're in a state to deploy. Recommended to perform validation as soon as possible. Better error feedback.

4. Synthesis

`app,synth()` traverses the construct tree and invokes this method on all constructs. The output from constructs that impliment `synthesize` method can emit deployment artifacts.. eg CFN templates, docker image assets etc.. Most cases you might not need to use this.

5. Deployment

The CDK CLI Takes deploy artifacts and deploys it to AWS. Uploads assets and begins CFN deployment to create resources.


```
                  +-------------------------------------------------------------------------------------+
                  |                                                                                     |
                  |                        CDK CLI                                                      |
                  |                                                                                     |
                  +---------------------------+---------------------------------------------+-----------+
                                              |                                             |
                                              |                                             |  sends output
                                              |                                             |  to CloudFormation
                                              |Calls your                                   v
                                              |   App                            +----CloudFormation----+
                                              |                                  |                      |
                                              v                                  |  +-----------------+ |
                  +---------------------------+------------------------------+   |  |                 | |
                  |                        CDK APP                           |   |  |     Deploy      | |
                  |                                                          |   |  |                 | |
+-----------+     | +---------+    +-------+     +--------+     +----------+ |   |  +-----------------+ |
|           |     | |         |    |       |     |        |     |          | |   +----------------------+
|  CDK App  +-----> |Construct+--->+Prepare+---->+Validate+---->+Synthesize| |              ^
|Source Code|     | |         |    |       |     |        |     |          | |              |
+-----------+     | +---------+    +-------+     +--------+     +----------+ |   +----------+------+
                  |                                                          +-->+                 |
                  +----------------------------------------------------------+   |  Template       |
                                                                                 ++ other artifacts|
                                                                                 |                 |
                                                                                 +-----------------+
```

## TODOs
- [ ] figure out good stack dir structure
- [ ] figure out how good is the testing lib? [read this](https://docs.aws.amazon.com/cdk/latest/guide/testing.html)
- [ ] example of L1 vs L2 components.
- [ ] ci
- [ ] stack drifts
- [ ] IAM roles


## TO DO later...
Things I like things I don't like..
