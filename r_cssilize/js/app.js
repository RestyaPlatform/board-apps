(function() {
    var $dc = $(document);
    $dc.ready(function() {
        localforage.getItem('apps', function(err, value) {
            var local_storage_apps = JSON.parse(value);
            $('body').append('<div class="modal fade" id="r_cssilize_modal" tabindex="-1" role="dialog" aria-labelledby="loginCSSilizeModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-cssilize-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + local_storage_apps.r_cssilize.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Theming/CSSilize') + '</h4><div><span class="text-muted">v' + local_storage_apps.r_cssilize.version + '</span> By <a target="_blank" href="' + local_storage_apps.r_cssilize.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-partner-v0.1.1' + '" title="author">' + local_storage_apps.r_cssilize.author + '</a></div></div></div></div><div class="modal-body import-block"><ul><li>' + i18next.t('CSSilize is our theming partner') + '.</li><li>' + i18next.t('For Restyaboard theming, website designing or mobile apps. Starting from $35') + '.</li></ul></div><div class="modal-footer"><a id="" href="http://www.cssilize.com/?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-partner-v0.1.1" target="_blank" title="' + i18next.t('Visit CSSilize') + '" class="btn btn-primary">' + i18next.t('Visit CSSilize') + '</a></div></div></div></div>');
        });
    });
})();
