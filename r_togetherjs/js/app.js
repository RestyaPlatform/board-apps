(function() {
    var $dc = $(document);
    $dc.ready(function() {
        $('body').bind('appPopupAction', insertAppAction);
        var is_togetherjs_opened = false;

        function loadTogetherJS(e) {
            if (typeof $('#start-togetherjs').html() == 'undefined' && $.cookie('auth') !== undefined && $.cookie('auth') !== null) {
                var Auth = JSON.parse($.cookie('auth'));
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
            } else if ($.cookie('auth') === undefined && is_togetherjs_opened === true) {
                $('#start-togetherjs').trigger('click');
            }
        }

        function insertAppAction(e) {
            if (typeof $('#start-togetherjs').html() == 'undefined' && $.cookie('auth') !== undefined && $.cookie('auth') !== null) {
                is_togetherjs_opened = true;
            }
            if ($('#r_togetherjs_modal').find('.modal-footer').length !== 0) {
                if ($('#r_togetherjs_modal .modal-footer').find('#js-together-js-button').length === 0) {
                    $('#r_togetherjs_modal').find('.modal-footer').append('<a id="js-together-js-button" href="#" title="' + ((is_togetherjs_opened) ? i18next.t('End Session') : i18next.t('Start Session')) + '" class="btn btn-primary">' + ((is_togetherjs_opened) ? i18next.t('End Session') : i18next.t('Start Session')) + '</a>');
                }
            }
        }

        $dc.on('click', '#js-together-js-button,#togetherjs-end-session', function(event) {
            if ($('#r_togetherjs_modal').hasClass('in')) {
                $('#r_togetherjs_modal').modal('hide');
                $('#start-togetherjs').trigger('click');
            }
            is_togetherjs_opened = !is_togetherjs_opened;
            $('#js-together-js-button').attr("title", (is_togetherjs_opened) ? i18next.t('End Session') : i18next.t('Start Session'));
            $('#js-together-js-button').text((is_togetherjs_opened) ? i18next.t('End Session') : i18next.t('Start Session'));
            return false;
        });

        //APP function Definition
        AppsFunction.loadTogetherJS = loadTogetherJS;
    });
})();
