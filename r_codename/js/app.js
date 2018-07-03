(function() {

    addRequestCallback(function(xhr, arguments) {
        
        if (arguments && arguments[0]) {
            if (arguments && arguments[0]) {
                var arr = JSON.parse(arguments[0]);
                arr.background_picture_url = 'https://farm2.static.flickr.com/1525/26135249912_61ee0ae6e9_b.jpg';
            }
        }

    });

})();
