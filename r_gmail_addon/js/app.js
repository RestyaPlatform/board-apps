(function() {
    var $dc = $(document);
    var apps;
    $dc.ready(function() {
        $('body').bind('appPopupAction', insertAppAction);

        function insertAppAction(e) {
            if ($('#r_gmail_addon_modal').find('.modal-footer').length > 0) {
                if ($('#r_gmail_addon_modal .modal-footer').find('#js-gmail_addon-contact').length === 0) {
                    $('#r_gmail_addon_modal').find('.modal-footer').append('<a id="js-gmail_addon-contact" href="http://restya.com/contact?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-gmail-addon-v0.1.1' + '" target="_blank" title="' + i18next.t('Contact Us') + '" class="btn btn-primary">' + i18next.t('Contact Us') + '</a>');
                }
            }
        }

    });
})();
