# CDK React App Deployment

This project uses AWS CDK to deploy a React application to an S3 bucket and distribute it via CloudFront.

## Project Structure

```
.
|-- bin/
|   `-- hello-cdk.ts
|-- lib/
|   `-- hello-cdk-stack.ts
|-- dist/
|   `-- (React build files)
|-- src/
|   `-- (React code files)
|-- package.json
|-- README.md
|-- tsconfig.json
`-- and many more...
```


## Prerequisites

- Node.js (v14.x or later)
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed (`npm install -g aws-cdk`)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Build your React application and ensure the output is in the `dist/` directory.

## Deployment

1. Synthesize the CloudFormation template:
cdk synth

2. Deploy the stack:

```bash
cdk deploy
```
3. After deployment, the CloudFront URL will be displayed in the output.

## Stack Details

The `HelloCdkStack` creates the following AWS resources:

- An S3 bucket to store the React application files
- A CloudFront distribution to serve the application
- An Origin Access Identity for secure access to the S3 bucket (missed this during call)
- A BucketDeployment to upload the React build files to S3

## Configuration

- The S3 bucket name can be configured in the `bucketName` property of the `s3.Bucket` constructor.
- CloudFront settings can be adjusted in the `cloudfront.Distribution` constructor.
- The path to your React build files can be changed in the `s3deploy.BucketDeployment` constructor.

## Outputs

The stack provides two CloudFormation outputs:

1. `CloudFrontURL`: The URL of the CloudFront distribution where your app is accessible.
2. `Hey Everyone`: A custom output (can be modified or removed as needed).

## Cleanup

To avoid incurring future charges, remember to destroy the resources when they're no longer needed:

```bash
cdk destroy
```

Feel free to use and contribute, thanks and good luck!

