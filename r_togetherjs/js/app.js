(function() {
    var $dc = $(document);
    $dc.ready(function() {
        $('#footer').bind('DOMSubtreeModified', loadTogetherJS);
        var is_togetherjs_opened = false;

        function loadTogetherJS() {
            if (typeof $('#start-togetherjs').html() == 'undefined' && window.sessionStorage.getItem('auth') !== undefined && window.sessionStorage.getItem('auth') !== null) {
                var Auth = JSON.parse(window.sessionStorage.getItem('auth'));
                var TogetherJSConfig_includeHashInUrl = true;
                var TogetherJSConfig_dontShowClicks = false;
                var TogetherJSConfig_cloneClicks = true;
                var TogetherJSConfig_siteName = SITE_NAME;
                is_togetherjs_opened = true;
                TogetherJSConfig_getUserName = function() {
                    return Auth.user.full_name;
                };
                if (Auth.user.profile_picture_path !== null) {
                    TogetherJSConfig_getUserAvatar = function() {
                        var hash = calcMD5(SecuritySalt + 'User' + Auth.user.id + 'png' + 'normal_thumb' + SITE_NAME);
                        return window.location.origin + window.location.pathname + 'img/normal_thumb/User/' + Auth.user.id + '.' + hash + '.png';
                    };
                }
                $('body').append('<button onclick="TogetherJS(this); return false;" id="start-togetherjs" class="hide">' + i18next.t('Start TogetherJS') + '</button>');
                $('#start-togetherjs').trigger('click');
            } else if (window.sessionStorage.getItem('auth') === undefined && is_togetherjs_opened === true) {
                $('#start-togetherjs').trigger('click');
            }
        }
    });
})();
