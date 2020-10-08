// let array = [1,2,3,4,5,6]

// //let test = array.splice(2,1)
// let test2 = array.pop()

// console.log(array[5], array[2])
// console.log(array.length)

var obj = { foo: "bar", baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// array como objeto
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']

// array como objeto com ordenação de chave aleatória
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']

// getFoo é a propriedade a qual não é enumerável
var my_obj = Object.create({}, { getFoo: { value: function() { return this.foo; } } });
my_obj.foo = "bar";
console.log(Object.values(my_obj)); // ['bar']

// argumento não-objeto será coagido num objeto
console.log(Object.values("foo")); // ['f', 'o', 'o']