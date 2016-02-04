(function() {
    var $dc = $(document);
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));
    $dc.ready(function() {
        $('#footer').bind('DOMSubtreeModified', insertCSSilizeImportButton);

        function insertCSSilizeImportButton(e) {
            if ($(e.target).hasClass('footer')) {
                $('body').append('<div class="modal fade" id="r_cssilize_modal" tabindex="-1" role="dialog" aria-labelledby="loginCSSilizeModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-cssilize-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_cssilize.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('CSSilize Widget') + '</h4><div><span class="text-muted">v' + session_storage_apps.r_cssilize.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_cssilize.author_url + '" title="author">' + session_storage_apps.r_cssilize.author + '</a></div></div></div></div><div class="modal-body import-block">' + i18next.t('Slice a website or mobile apps. Starting from $35') + '.</div><div class="modal-footer"><a id="" href="http://www.cssilize.com/" target="_blank" title="' + i18next.t('Visit CSSilize') + '" class="btn btn-primary">' + i18next.t('Visit CSSilize') + '</a></div></div></div></div>');
            }
        }
    });
})();
