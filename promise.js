console.log('request data...')

const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('preparing data...')

		const data = {
			server: 'someServer',
			port: 1500,
			status: 'working'
		}
		resolve(data)
	}, 1000)
})

promise.then(data => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			data.modified = true
			resolve(data)
		}, 1000)
	})
}).then(data => {
	console.log('data received: ', data)
})

// const sleep = ms => {
// 	return new Promise(resolve => setTimeout(() => resolve(), ms))
// }

// sleep(2000).then(() => console.log('okay 2s'))
// sleep(3000).then(() => console.log('okay 3s'))

// Promise.race([sleep(2000), sleep(1000), sleep(3000)]).then(() => {
// 	console.log('all promises')
// })