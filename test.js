//引入tapable
const { SyncHook, AsyncParallelHook } = require('tapable');

//创建类
class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newSpeed']),
      break: new SyncHook(),
      calculateRoutes: new AsyncParallelHook(['source', 'target', 'routesList']),
    };
  }
}

const myCar = new Car();

myCar.hooks.break.tap('hello', () => {
  console.log('hello world');
});
myCar.hooks.break.tap('hellxxswqso1', () => {
  console.log('hello world2');
});

myCar.hooks.break.call();
