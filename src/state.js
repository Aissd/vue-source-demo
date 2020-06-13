export function initState(vm) {
    const opts = vm.$options;
    if(opts.props) {
        initProps(vm);
    }
    if(opts.metods) {
        initMethods(vm);
    }
    if(opts.data) {
        initData(vm);
    }
}

function initProps(vm) {}
function initMethods(vm) {}
function initData(vm) {
    console.log(vm.$options.data);
}