var controller = {
};

controller.prototype.extends = function (obj) {
    var source = controller;
    var target = obj;
    for (var k in target) {
        if (lib.isObject(target[k]) && lib.isObject(source[k])) {
            lib.extends(source[k], target[k]);
        } else {
            source[k] = target[k];
        }
    }
    return source;
};
