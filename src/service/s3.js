import AWS from 'aws-sdk';

/**
 * Digital Ocean Spaces Connection
 */

const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: "DO00D8CQ4MA2EQKTMNYQ",
      secretAccessKey: "GTsDEYSqYXWDbIEIYxsRWgoYWNIl4t/dR9EZBYjmz2I"
    });
export default s3;