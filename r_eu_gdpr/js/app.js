(function() {
    var $dc = $(document);
    $dc.ready(function() {

        function showCookieInformation(e) {
            if (!_.isEmpty(authuser.user)) {
                var cookie = $.cookie('cookie_information');
                if (_.isUndefined(cookie) && _.isEmpty(cookie)) {
                    if ($('#cookie-law-info-bar').length === 0) {
                        _(function() {
                            if ($('#cookie_information').hasClass('hide')) {
                                $('#cookie_information').removeClass('hide');
                            }
                            if ($('#cookie-law-info-bar').length === 0) {
                                $('#footer-menu #cookie_information .js-cookie-information-row').prepend('<ul id="cookie-law-info-bar" class="nav col-xs-12 text-center" style="padding-bottom: 7px;"><li  class="hidden-xs org-btn"><strong>' + i18next.t('This website uses analytics cookies to improve user experience. By continuing to use this website you agree to our') + ' <a href="http://restya.com/privacy" target="_blank" title="' + i18next.t('cookie policy') + '" class="text-primary">' + i18next.t('cookie policy') + '</a>. <button id="js-cookie-close" class="btn btn-primary">OK</button></strong></li></ul>');
                            }
                            $(window).resize();
                        }).defer();
                    }
                }
            }
        }
        $dc.on('click', '#js-cookie-close', function(event) {
            $.cookie('cookie_information', true);
            $(event.target).parents('#cookie_information').remove();
            $(window).resize();
        });
        $dc.on('click', '#js-hide-card-id-button', function(event) {
            $('#r_eu_gdpr_modal').modal('hide');
            return false;
        });

        //APP function Definition
        AppsFunction.showCookieInformation = showCookieInformation;
    });
})();
