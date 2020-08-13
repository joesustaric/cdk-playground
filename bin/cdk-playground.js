#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { CdkPlaygroundStack } = require('../lib/cdk-playground-stack');

const app = new cdk.App();
new CdkPlaygroundStack(app, 'CdkPlaygroundStack');
