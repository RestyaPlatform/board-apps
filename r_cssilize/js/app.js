(function() {
    var $dc = $(document);
    $dc.ready(function() {
        $('#footer').bind('DOMSubtreeModified', insertCSSilizeImportButton);

        function insertCSSilizeImportButton(e) {
            if ($(e.target).hasClass('footer')) {
                if ($('#js-cssilize-element').length === 0) {
                    $("#footer ul").first().append('<li id="js-cssilize-element" class="hidden-xs org-btn"><a id="js-cssilize-login" title="CSSilize" href="#" class="btn btn-default" data-toggle="modal" data-target="#loginCSSilizeModal"><span>CSSilize</span></a></li>');
                }
            }
        }
        $dc.on('click', '#js-cssilize-login', function(event) {
            $('body').append('<div class="modal fade in" id="loginCSSilizeModal" tabindex="-1" role="dialog" aria-labelledby="loginCSSilizeModalLabel" aria-hidden="false" style="display: block;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-cssilize-close">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="loginCSSilizeModalLabel">' + i18next.t('CSSilize') + '</h4></div><div class="modal-body import-block">Slice a website or mobile apps. Starting from $35.</div><div class="modal-footer"><a id="" href="http://www.cssilize.com/" target="_blank" title="' + i18next.t('Visit CSSilize') + '" class="btn btn-primary">' + i18next.t('Visit CSSilize') + '</a></div></div></div></div>');
            return false;
        });
        $dc.on('click', '#js-cssilize-close', function(event) {
            $('#loginCSSilizeModal').hide();
        });
    });
})();
