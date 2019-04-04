class Bind {
  constructor() {
    Bind._init(this);
  }

  static _super(self) {
    return Object.getPrototypeOf(self);
  }

  static _getValue(self, prop, target) {
    const val = target ? target[prop] : self[prop];
    return typeof val === 'function' ? val.bind(self) : val;
  }

  static _init(self) {
    const { _super } = Bind;
    let current = _super(self);
    while (_super(current)) {
      Reflect.ownKeys(current)
        .forEach(item => {
          if (self[item]) {
            return self[item] = Bind._getValue(self, item);
          }
          self[item] = Bind._getValue(current, item, current);
        })
      current = _super(current);
    }
  }

  static autoBind(self) {
    return Bind._init(self);
  }
}

module.exports = Bind;
