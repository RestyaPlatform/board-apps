(function() {
    var $dc = $(document);
    var local_storage_apps = JSON.parse(localStorage.getItem("apps"));
    $dc.ready(function() {
        $('body').append('<div class="modal fade" id="r_hide_card_id_modal" tabindex="-1" role="dialog" aria-labelledby="loginHideCardIdModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-hide-card-id-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + local_storage_apps.r_hide_card_id.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Hide Card ID') + '</h4><div><span class="text-muted">v' + local_storage_apps.r_hide_card_id.version + '</span> By <a target="_blank" href="' + local_storage_apps.r_hide_card_id.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-hidecardid' + '" title="author">' + local_storage_apps.r_hide_card_id.author + '</a></div></div></div></div><div class="modal-body import-block"><ul><li>' + i18next.t('Hides Card ID from cards listing as in Trello') + '.</li><li>' + i18next.t('Disable it in Admin Control Panel for default behavior') + '.</li><li>' + i18next.t('This is a simple sample App to show the possibilities of App platform') + '.</li></ul></div><div class="modal-footer"><a id="js-hide-card-id-button" href="#" title="' + i18next.t('Close') + '" class="btn btn-primary">' + i18next.t('Close') + '</a></div></div></div></div>');
        $dc.on('click', '#js-hide-card-id-button', function(event) {
            $('#r_hide_card_id_modal').modal('hide');
            return false;
        });
    });
})();
