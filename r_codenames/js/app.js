(function() {
    addRequestCallback(function(xhr, arguments) {
        if (arguments && arguments[0] && arguments[0].indexOf('template') > -1) {
            var arr = JSON.parse(arguments[0]);
            arr.background_picture_url = 'https://c1.staticflickr.com/8/7444/10360461836_e5a3f932d0_h.jpg';
            arguments[0] = JSON.stringify(arr);
        }
    });
})();