class Watcher {
    constructor(vm, exprOrFn, cb, option) {
        // console.log(vm, exprOrFn, cb, option);
        exprOrFn();
    }
}

export default Watcher;