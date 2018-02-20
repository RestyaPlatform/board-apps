(function() {
    var $dc = $(document);
    $dc.ready(function() {
        $('body').bind('cardRendered', insertCreatedDateSingle);

        function insertCreatedDateSingle(e, card_id, current_card) {
            $(".js-board-list").each(function() {
                if ($(this).find('.js-sort-list-response >li.js-createdDate').length === 0) {
                    $(this).find('.js-sort-list-response').append('<li class=" js-createdDate"><a title="' + i18next.t('Created Date') + '" href="#" class="js-sort-by" data-sort-by="created_date">' + i18next.t('Created Date') + '</a></li>');
                }
            });
        }

        localforage.getItem('apps', function(err, value) {
            var local_storage_apps = JSON.parse(value);
            $('body').append('<div class="modal fade" id="r_hide_card_created_date_modal" tabindex="-1" role="dialog" aria-labelledby="loginCreatedDateModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-created-date-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + local_storage_apps.r_hide_card_created_date.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Hide Card Created Date') + '</h4><div><span class="text-muted">v' + local_storage_apps.r_hide_card_created_date.version + '</span> By <a target="_blank" href="' + local_storage_apps.r_hide_card_created_date.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-hidecardcreateddate' + '" title="author">' + local_storage_apps.r_hide_card_created_date.author + '</a></div></div></div></div><div class="modal-body import-block"><ul><li>' + i18next.t('Hides Card Created Date from cards listing as in Trello') + '.</li><li>' + i18next.t('Disable it in Admin Control Panel for default behavior') + '.</li><li>' + i18next.t('This is a simple sample App to show the possibilities of App platform') + '.</li></ul></div><div class="modal-footer"><a id="js-created-date-button" href="#" title="' + i18next.t('Close') + '" class="btn btn-primary">' + i18next.t('Close') + '</a></div></div></div></div>');
        });
        $dc.on('click', '#js-created-date-button', function(event) {
            $('#r_hide_card_created_date_modal').modal('hide');
            return false;
        });
    });
})();
