(function() {
    var $dc = $(document);
    $dc.on('click', '#js-created-date-button', function(event) {
        $('#r_hide_card_additional_informations_modal').modal('hide');
        return false;
    });
    $dc.ready(function() {
        $('body').bind('cardRendered', insertHideCardAdditionalInformations);

        function insertHideCardAdditionalInformations(e, card_id, current_card) {
            if (hide_card_created_date === 'true') {
                $('#js-board-lists').find('.card-created-date').css("display", "none");
                $('#js-board-lists').find('.js-createdDate').css("display", "none");
            } else {
                $('#js-board-lists').find('.card-created-date').css("display", "block");
                $('#js-board-lists').find('.js-createdDate').css("display", "block");
            }
            if (hide_card_created_user === 'true') {
                $('#js-board-lists').find('.card-created-user').css("display", "none");
            } else {
                $('#js-board-lists').find('.card-created-user').css("display", "block");
            }
            if (hide_card_id === 'true') {
                $('#js-board-lists').find('.card-id').attr('style','display: none !important');
            } else {
                $('#js-board-lists').find('.card-id').css("display", "block");
            }
            if (hide_list_moved_date === 'true') {
                $('#js-board-lists').find('.list-moved-date').css("display", "none");
                $('#js-board-lists').find('.js-listMovedDate').css("display", "none");
            } else {
                $('#js-board-lists').find('.list-moved-date').css("display", "block");
                $('#js-board-lists').find('.js-listMovedDate').css("display", "block");
            }
        }

        localforage.getItem('apps', function(err, value) {
            var local_storage_apps = JSON.parse(value);
            $('body').append('<div class="modal fade" id="r_hide_card_additional_informations_modal" tabindex="-1" role="dialog" aria-labelledby="loginCreatedDateModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-created-date-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + local_storage_apps.r_hide_card_additional_informations.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Hide Card Additional Informations') + '</h4><div><span class="text-muted">v' + local_storage_apps.r_hide_card_additional_informations.version + '</span> By <a target="_blank" href="' + local_storage_apps.r_hide_card_additional_informations.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-hidecardcreateddate' + '" title="author">' + local_storage_apps.r_hide_card_additional_informations.author + '</a></div></div></div></div><div class="modal-body import-block"><ul><li>' + i18next.t('Hide Card Additional Informations from cards listing') + '.</li><li>' + i18next.t('Disable it in Admin Control Panel for default behavior') + '.</li></ul></div><div class="modal-footer"><a id="js-created-date-button" href="#" title="' + i18next.t('Close') + '" class="btn btn-primary">' + i18next.t('Close') + '</a></div></div></div></div>');
        });
    });

    function getToken() {
        if ($.cookie('auth') !== undefined) {
            var Auth = JSON.parse($.cookie('auth'));
            api_token = Auth.access_token;
            return api_token;
        } else {
            return false;
        }
    }
})();
