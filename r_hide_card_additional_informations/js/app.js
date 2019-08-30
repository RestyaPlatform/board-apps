(function() {
    var $dc = $(document);
    $dc.ready(function() {
        $('body').bind('cardRendered', insertHideCardAdditionalInformations);

        function insertHideCardAdditionalInformations(e, card_id, current_card) {
            if (hide_card_created_date === 'true') {
                $('#js-board-lists').find('.card-created-date').css("display", "none");
                $('#js-board-lists').find('.js-createdDate').css("display", "none");
            } else {
                $('#js-board-lists').find('.card-created-date').css("display", "");
                $('#js-board-lists').find('.js-createdDate').css("display", "block");
            }
            if (hide_card_created_user === 'true') {
                $('#js-board-lists').find('.card-created-user').css("display", "none");
            } else {
                $('#js-board-lists').find('.card-created-user').css("display", "");
            }
            if (hide_card_id === 'true') {
                $('#js-board-lists').find('.card-id').attr('style', 'display: none !important');
            } else {
                $('#js-board-lists').find('.card-id').css("display", "");
            }
            if (hide_list_moved_date === 'true') {
                $('#js-board-lists').find('.list-moved-date').css("display", "none");
                $('#js-board-lists').find('.js-listMovedDate').css("display", "none");
            } else {
                $('#js-board-lists').find('.list-moved-date').css("display", "");
                $('#js-board-lists').find('.js-listMovedDate').css("display", "block");
            }
        }
    });
})();
