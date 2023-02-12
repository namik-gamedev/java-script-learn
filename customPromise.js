// states
// PENDING
// RESOLVED
// REJECTED

const myPromiseStates = {
   PENDING: 'PENDING',
   RESOLVED: 'RESOLVED',
   REJECTED: 'REJECTED'
}

class MyPromise {
   constructor(cb) {
      this.myPromiseState = myPromiseStates.PENDING;
      this.res = this.res.bind(this)
      this.rej = this.rej.bind(this)
      this.thenCbs = []
      this.catchCb = null
      this.resolvedData = null
      cb(this.res, this.rej)
   }

   res(resData) {
      if (!this.myPromiseState === myPromiseStates.PENDING) return
      this.myPromiseState = myPromiseStates.RESOLVED
      while (this.thenCbs.length) {
         const thenCb = this.thenCbs.shift()
         this.resData = thenCb(this.resData || resData)
      }
   }

   rej(rejData) {
      if (this.myPromiseState === myPromiseStates.PENDING) {
         this.catchCb && this.catchCb(rejData)
      }
      this.myPromiseState = myPromiseStates.REJECTED
   }
   then(thenCb) {
      this.thenCbs.push(thenCb)
      return this
   }
   catch(catchCb) {
      this.catchCb = catchCb
      return this
   }
}

// код демонстрирующий работу промиса
const outputEl = document.querySelector('.output')
const getNumberBtn = document.querySelector('.get-number-btn')

getNumberBtn.onclick = () => {
   outputEl.innerText = 'Loading...'
   getNumber()
}

function getNumber() {
   return new MyPromise((resolve, reject) => {
      setTimeout(() => {
         const random = 10 // Math.floor(Math.random() * 500)
         if (random % 5) {
            reject(`Rejected by ${random}`)
         } else {
            resolve(random)
         }
      }, 500)
   }).then(num => num *= 10)
      .then(num => {
         num *= 5
         return `Resolved by ${num}`
      })
      .then(data => outputEl.innerText = data)
      .catch(data => outputEl.innerText = data)
}
