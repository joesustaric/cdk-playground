# CDK Playground

AWS have recently released CDK. I want to play with it.

> Use the AWS CDK to define your cloud resources in a familiar programming language. The AWS CDK supports TypeScript, JavaScript, Python, Java, and C#/.Net. 

More info [here](https://docs.aws.amazon.com/cdk/latest/guide/home.html).


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

### Lifecycle
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

## TODO