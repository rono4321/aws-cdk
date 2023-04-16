import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3'
import { CfnVPC, Vpc, VpnConnectionBase } from 'aws-cdk-lib/aws-ec2';
import { VpcSubnetGroupType } from 'aws-cdk-lib/cx-api';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as cognito from 'aws-cdk-lib/aws-cognito'

export class CdkTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    
    const queue = new sqs.Queue(this, 'CdkTestQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const s3bucket = new s3.Bucket(this, "ron-test-bucket", {
      bucketName: "ron-test-bucket-43211",
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
      vpcId: myvpc.attrVpcId, // Required
    })

    //  const mysubnets2 = new ec2.CfnSubnet(this, "subnet2",{
    //   vpcId: myvpc.attrVpcId,
    //   assignIpv6AddressOnCreation: false,
    //   availabilityZone: "eu-west-1b",
    //   cidrBlock: "10.10.3.0/24",
    //   enableDns64: false,
    //   ipv6Native: false,
    //   mapPublicIpOnLaunch: false,


    //  })

    const userPool = new cognito.UserPool(this, 'userpool', {
      userPoolName: 'my-user-pool',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        country: new cognito.StringAttribute({mutable: true}),
        city: new cognito.StringAttribute({mutable: true}),
        isAdmin: new cognito.StringAttribute({mutable: true}),
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const userPool2 = new cognito.UserPool(this, 'userpool2', {
      userPoolName: 'my-user-pool2',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        country: new cognito.StringAttribute({mutable: true}),
        city: new cognito.StringAttribute({mutable: true}),
        isAdmin: new cognito.StringAttribute({mutable: true}),
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
    
    //  const mysubnets3 = new CfnSubnet
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
