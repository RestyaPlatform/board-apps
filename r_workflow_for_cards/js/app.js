(function() {
    var $dc = $(document);
    var board_id;
    var board_response;
    var url = window.location.href;
    var match = url.match(/#\/board\/(\d+)/);
    if (match) {
        board_id = match[1];
    }
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));
    $dc.ready(function() {
        var custom_fields_data = '';
        $.getJSON("apps/r_workflow_for_cards/json/app.json", function(data) {
            custom_fields_data = Backbone.form(data);
        });
        $('body').bind('DOMSubtreeModified', insertWorkflowCardApp);

        function insertWorkflowCardApp(e) {
            if (board_response) {
                if (board_response.lists) {
                    $.each(board_response.lists, function(list_key, list) {
                        if (list.custom_fields) {
                            var customFieldArr = JSON.parse(list.custom_fields);
                            if (customFieldArr.auto_archive_days) {
                                if (list.cards) {
                                    $.each(list.cards, function(card_key, card) {
                                        auto_archive_date = new Date();
                                        auto_archive_date.setDate(auto_archive_date.getDate() - parseInt(customFieldArr.auto_archive_days));
                                        card_modified_date = new Date(card.modified);
                                        if ((auto_archive_date.getTime() >= card_modified_date.getTime()) && (card.is_archived === 0)) {
                                            $.ajax({
                                                url: api_url + 'boards/' + board_id + '/lists/' + list.id + '/cards/' + card.id + '.json?token=' + getToken(),
                                                type: 'put',
                                                data: JSON.stringify({
                                                    'is_archived': 1
                                                }),
                                                contentType: 'application/json; charset=utf-8',
                                                dataType: 'json',
                                                success: function(response) {}
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }

            $.each($(e.target).find('.js-show-list-actions'), function(key, val) {
                if ($(this).parent().find('.js-workflow-cards-button').length === 0) {
                    var temp_list_id = $(this).parents('.js-board-list').attr('data-list_id');
                    var $form = $(custom_fields_data);
                    var custom_form = '<ul class="dropdown-menu dropdown-menu-left arrow col-xs-12" id="js-workflow-cards-form-' + temp_list_id + '"><li class="col-xs-12 time-block"><div class="col-xs-12 js-workflow-cards-form"><div class="well-sm"></div>' + $form.prop('outerHTML') + '<div class="well-sm"></div></div></li></ul>';
                    var elem = $('<li class="js-workflow-cards-button dropdown"><a class="dropdown-toggle js-show-additional-settings"  href="#" title="Additional Settings" data-toggle="dropdown"><i class="text-primary"></i>Additional Settings</a>' + custom_form + '</li>');
                    $(this).parent().find('.js-list-subscribe').parent().after(elem);
                    //$(elem).insertAfter($(this).parent().find('.js-list-actions-response').find('js-list-subscribe'));
                }
            });
        }

        $('body').append('<div class="modal fade" id="r_workflow_for_cards_modal" tabindex="-1" role="dialog" aria-labelledby="workflowForCardsModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-workflow-for-cards-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_workflow_for_cards.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Auto Archive Expired Cards') + '</h4><div><span class="text-muted">v' + session_storage_apps.r_workflow_for_cards.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_workflow_for_cards.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-workflow-for-cards-v0.1.1' + '" title="author">' + session_storage_apps.r_workflow_for_cards.author + '</a></div></div></div></div><div class="modal-body import-block"><span>' + i18next.t('Automatically archives expired cards.') + '</span><h4>' + i18next.t('How it works') + '</h4><ul><li>' + i18next.t('Age/day for expiration can be set through setting menu found on each list') + '.</li><li>' + i18next.t('Expired cards will then be automatically archived') + '.</li></ul></div><div class="modal-footer"><a id="js-workflow-for-cards-app-button" href="#" title="' + i18next.t('Close') + '" class="btn btn-primary">' + i18next.t('Close') + '</a></div></div></div></div>');
    });

    $dc.on('click', '#js-workflow-for-cards-app-button', function(event) {
        $('#r_workflow_for_cards_modal').modal('hide');
        $('.js-chosen-select').select2();
        return false;
    });

    addResponseCallback(function(xhr) {
        if (xhr.responseURL.match(/boards\/[0-9]+\Sjson/g)) {
            board_response = JSON.parse(xhr.responseText);
        }
    });

    $dc.on('click', '.js-show-additional-settings', function(e) {
        e.preventDefault();
        $(e.target).parents('div.dropdown').addClass('open');
        var current = $(e.target).parent().find('.js-workflow-cards-form');
        var temp_list_id = $(this).parents('.js-board-list').attr('data-list_id');
        if (custom_fields.boards) {
            $.each(custom_fields.boards, function(board_key, board) {
                if (board.lists) {
                    $.each(board.lists, function(list_key, list) {
                        if (list) {
                            if (temp_list_id == list_key) {
                                var inputArr = JSON.parse(list.custom_fields);
                                if (inputArr) {
                                    $.each(inputArr, function(key, val) {
                                        if ($(current).find($('input[name=' + key + ']')).length) {
                                            if ($(current).find($('input[name=' + key + ']')).attr('type') == 'checkbox') {
                                                $(current).find($('input[name=' + key + ']')).prop('checked', true);
                                            } else if ($(current).find($('input[name=' + key + ']')).attr('type') == 'radio') {
                                                $(current).find($('input[name=' + key + ']')).prop('checked', true);
                                            } else {
                                                $(current).find($('input[name=' + key + ']')).val(val);
                                            }
                                        } else if ($(current).find($('select[data-type=' + key + ']')).length) {
                                            $(current).find($('select[data-type=' + key + ']')).val(val);
                                        } else if ($(current).find($('select[name=' + key + ']')).length) {
                                            $(current).find($('select[name=' + key + ']')).val(val);
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });
        }
        return false;
    });

    $dc.on('click', '.js-custom-field-submit-btn', function(e) {
        e.preventDefault();
        if ($(e.target).parents('div.js-workflow-cards-form').length) {
            var list_id = '';
            var url = window.location.href;
            var match = url.match(/#\/board\/(\d+)/);
            if (match) {
                board_id = match[1];
            }
            list_id = $(e.target).parents('.js-board-list').attr('data-list_id');
            var form_data = $(this).parents('form').serializeArray();
            var formData = {};
            $.each(form_data, function(key, inputType) {
                formData[inputType.name] = inputType.value;
            });
            $.ajax({
                url: api_url + 'boards/' + board_id + '/lists/' + list_id + '.json?token=' + getToken(),
                type: 'put',
                data: JSON.stringify({
                    'board_id': board_id,
                    'list_id': list_id,
                    'custom_fields': JSON.stringify(formData)
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(response) {
                    $(e.target).parent('dropdown').removeClass('open');
                    $(e.target).parents('div.dropdown').removeClass('open');
                }
            });
        }
    });

    $dc.on('click', '#js-hide-card-id-button', function(event) {
        $('#r_workflow_for_cards_modal').modal('hide');
        $('.js-chosen-select').select2();
        return false;
    });

    function flashMesssage(type, message) {
        $.bootstrapGrowl(message, {
            type: type,
            offset: {
                from: 'top',
                amount: 20
            },
            align: 'right',
            width: type == 'danger' ? 250 : 400,
            delay: type == 'danger' ? 4000 : 0,
            allow_dismiss: true,
            stackup_spacing: 10
        });
    }

    function getToken() {
        if (window.sessionStorage.getItem('auth') !== undefined) {
            var Auth = JSON.parse(window.sessionStorage.getItem('auth'));
            api_token = Auth.access_token;
            return api_token;
        } else {
            return false;
        }
    }
})();
