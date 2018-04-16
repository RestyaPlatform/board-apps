(function() {
    var $dc = $(document);
    $dc.ready(function() {
        localforage.getItem('apps', function(err, value) {
            var local_storage_apps = JSON.parse(value);
            $('body').append('<div class="modal fade" id="r_eu_gdpr_modal" tabindex="-1" role="dialog" aria-labelledby="loginEU_GDPRModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-hide-card-id-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + local_storage_apps.r_eu_gdpr.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('EU GDPR') + '</h4><div><span class="text-muted">v' + local_storage_apps.r_eu_gdpr.version + '</span> By <a target="_blank" href="' + local_storage_apps.r_eu_gdpr.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-hidecardid' + '" title="author">' + local_storage_apps.r_eu_gdpr.author + '</a></div></div></div></div><div class="modal-body import-block"><ul><li>' + i18next.t('General Data Protection Regulation') + '.</li><li>' + i18next.t('Data protection and privacy for all individuals') + '.</li></ul></div><div class="modal-footer"><a id="js-hide-card-id-button" href="#" title="' + i18next.t('Close') + '" class="btn btn-primary">' + i18next.t('Close') + '</a></div></div></div></div>');
        });
        $('body').bind('DOMSubtreeModified', showCookieInformation);

        function showCookieInformation(e) {
            if (!_.isEmpty(authuser.user)) {
                var cookie = $.cookie('cookie_information');
                if (_.isUndefined(cookie) && _.isEmpty(cookie)) {
                    if ($('#cookie_information').hasClass('hide')) {
                        $('#cookie_information').removeClass('hide');
                    }
                    if ($('#cookie-law-info-bar').length === 0) {
                        $('footer #cookie_information .row').prepend('<ul id="cookie-law-info-bar" class="nav col-xs-12 text-center" style="padding-bottom: 7px;"><li  class="hidden-xs org-btn"><strong>' + i18next.t('This website uses analytics cookies to improve user experience. By continuing to use this website you agree to our') + '<a href="http://restya.com/privacy" target="_blank" title="' + i18next.t('cookie policy') + '" class="text-primary">' + i18next.t('cookie policy') + '</a>. <button id="js-cookie-close" class="btn btn-primary">OK</button></strong></li></ul>');
                    }
                }
            }
        }
        $dc.on('click', '#js-cookie-close', function(event) {
            $.cookie('cookie_information', true);
            $(event.target).parents('#cookie_information').remove();
        });
        $dc.on('click', '#js-hide-card-id-button', function(event) {
            $('#r_eu_gdpr_modal').modal('hide');
            return false;
        });
    });
})();
