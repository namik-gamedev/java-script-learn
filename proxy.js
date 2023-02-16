/* // objects
const person = {
   name: 'vlad',
   age: 25,
   job: 'frontend'
}

const op = new Proxy(person, {
   get(target, prop) {
      // console.log('getting prop', prop)
      if (!(prop in target)) {
         return prop.split('_')
            .map(p => target[p])
            .join(' ')
      }
      return target[prop]
   },
   set(target, prop, value) {
      if (prop in target) prop[target] = value
      else throw new Error(`no ${prop} field in target`)
   },
   has(target, prop) {
      return ['name', 'age', 'job'].includes(prop)
   },
   deleteProperty(target, prop) {
      console.log(`deleting ${prop} from target...`)
      delete target[prop]
   }
})

// functions
const log = text => `log: ${text}`

const fp = new Proxy(log, {
   apply(target, thisArg, args) {
      console.log('calling function...')
      return target.apply(thisArg, args).toUpperCase()
   }
})

// classes
class Person {
   constructor(name, age) {
      this.name = name
      this.age = age
   }
}

const PersonProxy = new Proxy(Person, {
   construct(target, args) {
      console.log('created new object with args: ', ...args)

      return new Proxy(new target(...args), {
         get(t, prop) {
            console.log('Getting prop: ', prop)
            return t[prop]
         }
      })
   }
})

const p = new PersonProxy('max', 50) */

// proxy practice

// wrapper
const withDefaultValue = (target, defaultValue = 0) => {
   return new Proxy(target, {
      get(obj, prop) {
         return (prop in obj) ? obj[prop] : defaultValue
      }
   })
}

const position = withDefaultValue({
   x: 24,
   y: 42
}, 0)

// hidden properties
const withHiddenProps = (target, prefix = '_') => {
   return new Proxy(target, {
      has: (obj, prop) => obj[prop] && !prop.startsWith(prefix),
      ownKeys: obj => Reflect.ownKeys(obj).filter(p => !p.startsWith(prefix)),
      get: (obj, prop, receiver) => (prop in receiver ? obj[prop] : void 0)
   })
}

const data = withHiddenProps({
   name: 'max',
   age: 25,
   _uId: '1836917'
})

// optimization
// const userData = [
//    { id: 1, name: 'ksushya', age: 18 },
//    { id: 2, name: 'alexander', age: 22 },
//    { id: 3, name: 'olga', age: 25 },
// ]

// const idx = {}
// userData.forEach(i => idx[i.id] = i)

const IndexedArray = new Proxy(Array, {
   construct(target, [args]) {
      const index = {}
      args.forEach(item => index[item.id] = item)

      return new Proxy(new target(...args), {
         get(arr, prop) {
            switch (prop) {
               case 'push': return item => {
                  index[item.id] = item
                  arr[prop].call(arr, item)
               }
               case 'findById': return id => index[id]
               default: return arr[prop]
            }
         }
      });
   }
})

const userData = new IndexedArray([
   { id: 1, name: 'ksushya', age: 18 },
   { id: 2, name: 'alexander', age: 22 },
   { id: 3, name: 'olga', age: 25 },
])