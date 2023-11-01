import React from 'react';
import { getListBuckets, uploadObject } from './service/s3';

export default function App() {

	console.log(process.env.ACCESS_KEY_ID)

	return (
		<div>
			<input type="file" onChange={getListBuckets} />
		</div>
	);
};