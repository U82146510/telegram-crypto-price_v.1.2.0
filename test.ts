const o = {
  name:'a',
  age:1
}

type Writable<T>={
 -readonly [P in keyof T]:T[P]
}

const rs:Readonly<typeof o>=o;
const sr:Writable<typeof o>=rs;
sr.age=2

