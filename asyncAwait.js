const delay = ms => {
   return new Promise(r => setTimeout(() => r(), ms))
}

const url = 'https://jsonplaceholder.typicode.com/todos'

// function fecthTodos() {
//    console.log('fetch todo started...')
//    return delay(2000)
//       .then(() => fetch(url))
//       .then(response => response.json())
// }

// fecthTodos()
//    .then(data => {
//       console.log('data: ', data)
//    }).catch(e => {
//       console.log('error: ', e)
//    })

async function fetchAsyncTodos() {
   console.log('fetch todo started...')
   try {
      const response = await fetch(url)
      const data = await response.json()
      console.log('data: ', data)
   } catch (e) {
      console.error('fetchError: ', e)
   } finally {
      console.log('we tried!')
   }
}

fetchAsyncTodos()