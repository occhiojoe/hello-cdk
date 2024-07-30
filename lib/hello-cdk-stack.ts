import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import path from 'path';


import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket to store the React app
    const bucket = new s3.Bucket(this, 'ReactAppBucket', {
      bucketName: 'whatever-1234-bucket',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OAI');
    bucket.grantRead(originAccessIdentity);

    // Create a CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'ReactAppDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket, {
          originAccessIdentity: originAccessIdentity,
        }),
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // Deploying the code from our computer to the s3 bucket
    new s3deploy.BucketDeployment(this, 'DeployReactApp', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '..', 'dist'))],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // A registered output for our cloudformation stack
    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'CloudFront URL',
    });

    new cdk.CfnOutput(this, 'Hey Everyone', {
      value: `Hey again`,
      description: 'Something fun',
    });

  }
}
