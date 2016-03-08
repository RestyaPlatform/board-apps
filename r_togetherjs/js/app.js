(function() {
    var $dc = $(document);
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));
    $dc.ready(function() {
        $('#footer').bind('DOMSubtreeModified', loadTogetherJS);
        var is_togetherjs_opened = false;

        function loadTogetherJS(e) {
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
            if ($(e.target).hasClass('footer')) {
                $('body').append('<div class="modal fade" id="r_togetherjs_modal" tabindex="-1" role="dialog" aria-labelledby="loginTogetherJSModalModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_togetherjs.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('TogetherJS') + '</h4><div><span class="text-muted">v' + session_storage_apps.r_togetherjs.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_togetherjs.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-partner-v0.1.1' + '" title="author">' + session_storage_apps.r_togetherjs.author + '</a></div></div></div></div><div class="modal-body import-block">' + i18next.t('Enable collaboration using Mozilla\'\s TogetherJS') + '</div><div class="modal-footer"><a id="js-together-js-button" href="#" title="' + ((is_togetherjs_opened) ? i18next.t('End Session') : i18next.t('Start Session')) + '" class="btn btn-primary">' + ((is_togetherjs_opened) ? i18next.t('End Session') : i18next.t('Start Session')) + '</a></div></div></div></div>');
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
    });
})();
