// +page.js
export async function load({ params }) {
	console.log('params.uid:', params.uid);
	return {
		uid: params.uid
	};
}
