import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3'
import { CfnVPC, Vpc, VpnConnectionBase } from 'aws-cdk-lib/aws-ec2';
import { VpcSubnetGroupType } from 'aws-cdk-lib/cx-api';
import * as ec2 from 'aws-cdk-lib/aws-ec2'

export class CdkTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    
    const queue = new sqs.Queue(this, 'CdkTestQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const s3bucket = new s3.Bucket(this, "ron-test-bucket", {
      bucketName: "ron-test-bucket-4321",
      accessControl: s3.BucketAccessControl.PRIVATE,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL

    }) 

    const myvpc = new ec2.CfnVPC(this, "myvpc", {
      cidrBlock: "10.10.0.0/16",
      enableDnsHostnames: true,
      enableDnsSupport: true,
      // instanceTenancy: "",
      // ipv4IpamPoolId: "string",
      // ipv4NetmaskLength: Number,
      tags: [ {
        key: 'Name',
        value: 'MyVpc',
      }],
    })

    const mysubnets =  new ec2.CfnSubnet(this, "subnet1", {
      availabilityZone: "eu-west-1a",
      cidrBlock: "10.10.1.0/24",
      enableDns64: false,
      ipv6Native: false,
      mapPublicIpOnLaunch: false,
      tags: [],
      vpcId: "vpc-0e9b08d1e797a3d58", // Required
    })

    const mysubnets2 = new CfnVPC(this, "subnet2", {
      cidrBlock: "10.10.2.0/24",
      enableDnsHostnames: true,
      enableDnsSupport: true,
      tags: []
    })

    // const queue1 = new sqs.Queue(this, 'CdkTestQueue1', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });    
  }
}




// export class CdkTestStack1 extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     // The code that defines your stack goes here

    
//     // const queue = new sqs.Queue(this, 'CdkTestQueue', {
//     //   visibilityTimeout: cdk.Duration.seconds(300)
//     // });

//     // const queue1 = new sqs.Queue(this, 'CdkTestQueue1', {
//     //   visibilityTimeout: cdk.Duration.seconds(300)
//     // });    
//   }
// }
