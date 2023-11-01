import React, { useState } from 'react';
import s3 from './service/s3';

export default function App() {
  const [imageFile, setImageFile] = useState(null);

  console.log(process.env.ACCESS_KEY_ID)

  const handleImageChange = (e) => {
	if (e.target.files && e.target.files[0]) {
	  const blob = e.target.files[0];
	  const params = { Body: blob, 
					   Bucket: "luongsonchatapp", 
					   Key: blob.name};
	   // Sending the file to the Spaces
	   	s3.putObject(params)
		 .on('build', request => {
		   request.httpRequest.headers.Host = "https://luongsonchatapp.sgp1.digitaloceanspaces.com";
		   request.httpRequest.headers['Content-Length'] = blob.size;
		   request.httpRequest.headers['Content-Type'] = blob.type;
		   request.httpRequest.headers['x-amz-acl'] = 'public-read';
		})
		.send((err) => {
		  if (err) {console.log(err)}
		  else {
		  // If there is no error updating the editor with the imageUrl
		  const imageUrl = "https://luongsonchatapp.sgp1.digitaloceanspaces.com/" + blob.name
		  console.log(imageUrl, blob.name)
		 }
	  });
	}
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
    </div>
  );
};