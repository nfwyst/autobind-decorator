class Bind {
  constructor() {
    Reflect
      .ownKeys(this.constructor.prototype)
      .forEach(item => {
        this[item] = this[item].bind(this);
      })
  }
}

class Base extends Bind {
  constructor(name) {
    super();
    this.doubleName = name.repeat(2);
  }
}

class Test extends Base {
  constructor(name) {
    super(name);
    this.name = name;
  }

  say() {
    console.log(this.name, this.doubleName);
  }
}

const { say } = new Test('thecatblack');

say()
