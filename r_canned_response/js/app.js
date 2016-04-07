(function() {
    var $dc = $(document);
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));

    $dc.ready(function() {

        var options = '';
        $.getJSON("apps/r_canned_response/json/app.json", function(data) {
            for (index in data.response) {
                options += '<option value="' + data.response[index].description + '">' + data.response[index].name + '!#! ' + data.response[index].description + '</option>';
            }
        });

        $('body').bind('DOMSubtreeModified', insertCannedButton);

        function insertCannedButton(e) {
            if ($(e.target).hasClass('dockmodal no-footer')) {
                if ($('.js-canned-responses', $(e.target)).length === 0) {
                    var elem = $('<div class="js-canned-responses col-xs-11 pull-right"><select id="js-canned-select-id" class="js-canned-response-select" name="js-canned-select-id">' + options + '</select></div>');
                    $('.js-add-comment > .media-list > .media > div:last-child()', $(e.target)).after(elem);
                    $('.js-canned-response-select', $(e.target)).select2({
                        formatResult: function(repo) {
                            var split = repo.text.split('!#!');
                            markup = '<div class="clearfix"><span class="show">' + split[0] + '</span><span class="show small">' + split[1] + '</span></div>';
                            return markup;
                        },
                        formatSelection: function(repo) {
                            var split = repo.text.split('!#!');
                            return split[0];
                        },
                    });
                }
            }
        }

        $('body').append('<div class="modal fade" id="r_canned_response_modal" tabindex="-1" role="dialog" aria-labelledby="cannedResponseModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-cammed-resonse-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_canned_response.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Canned Response') + '</h4><div><span class="text-muted">v' + session_storage_apps.r_canned_response.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_canned_response.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-canned-response-v0.1.1' + '" title="author">' + session_storage_apps.r_canned_response.author + '</a></div></div></div></div><div class="modal-body import-block"><span>' + i18next.t('Adds a canned response dropdown next to comment box in card view. Using this you can quickly insert canned response.') + '.</span></div><div class="modal-footer"><a id="js-canned-response-button" href="#" title="' + i18next.t('Close') + '" class="btn btn-primary">' + i18next.t('Close') + '</a></div></div></div></div>');
    });

    $dc.on('change', '.js-canned-response-select', function(e) {
        $(this).parents('form').find('.js-new-comment').removeClass('hide');
        $(this).parents('form').find('.js-comment').html($(e.target).select2("val"));
    });

    $dc.on('click', '#js-canned-response-button', function(event) {
        $('#r_canned_response_modal').modal('hide');
        $('.js-chosen-select').select2();
        return false;
    });
})();