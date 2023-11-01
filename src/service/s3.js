// Step 1: Import the S3Client object and all necessary SDK commands.
import { ListBucketsCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';


// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
    endpoint: "https://sgp1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: "sgp1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
      accessKeyId: "DO00D8CQ4MA2EQKTMNYQ", // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: "GTsDEYSqYXWDbIEIYxsRWgoYWNIl4t/dR9EZBYjmz2I" // Secret access key defined through an environment variable.
    }
});


// Step 3: Define the parameters for the object you want to upload.
const params = {
  Bucket: "luongsonchatapp", // The path to the directory you want to upload the object to, starting with your Space name.
  Key: "test", // Object key, referenced whenever you want to access this file later.
  Body: "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCAAyADIDASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAAAAIDBAUGAQcI/8QAKBAAAgEDAgUDBQAAAAAAAAAAAAECAwQREiEFEzFBURWBoRQiQmFi/8QAGQEAAwEBAQAAAAAAAAAAAAAAAwQFAgYA/8QAHhEAAgEEAwEAAAAAAAAAAAAAAAECAwQRMRITFCH/2gAMAwEAAhEDEQA/APq3VsNVJrDGeesdSLcXKSe5ASMOSSIfE7pRi9zGcRvnmWGXHFbrOrcx17UbkxmCI9zVGa9w3nLIVSplhPPcbcW+wysIlNtnNX7A7y5eAPZRj6eteobdyLcX2U9yiV28dRMq7fclqRadfKF3dZzyU1ai5vYsd5sfpWil+OTXdxFnF1GUMbGUn0HFw9+M+xqaXD00tvgfXDfKAyuwsbRmQ+g/n4A2Hpq8MAfrN+QzWoNYy5idW4dREkyyoLL6F5Z0E0ihtJbo0llNKKEq7a0UreKeyfSopLoSFRXgRTmsD8ZZJcmyvFITyV4QDuQB5ZvCPKZdjqADqUckibaPdF9Zt6WACVbZSty2oP7fYmQ6gBKnsrQ0PAAAQh//2Q==", // The object's contents. This variable is an object, not a string.
  ACL: "public", // Defines ACL permissions, such as private or public.
  
  Metadata: { // Defines metadata tags.
    "x-amz-meta-my-key": "your-value"
  }
};


// Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
export const uploadObject = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully uploaded object: " +
        params.Bucket +
        "/" +
        params.Key
    );
    console.log(data);
  } catch (err) {
    console.log("Error", err);
  }
};


export const getListBuckets = async () => {
  try {
    const data = await s3Client.send(new ListObjectsCommand({ Bucket: "luongsonchatapp" }));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};