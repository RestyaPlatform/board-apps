(function() {
    var $dc = $(document);
    var board_response;
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));
    $dc.ready(function() {
        var custom_fields_data = '';
        $.getJSON("apps/r_estimated_time/json/app.json", function(data) {
            custom_fields_data = Backbone.form(data);
        });

        $('body').bind('DOMSubtreeModified', insertEstimatedTimeButton);

        function insertEstimatedTimeButton(e) {
            if (board_response) {
                if (board_response.lists) {
                    $.each(board_response.lists, function(list_key, list) {
                        if (list.cards) {
                            $.each(list.cards, function(card_key, card) {
                                if (card.custom_fields) {
                                    var inputArr = JSON.parse(card.custom_fields);
                                    if ((inputArr.hour) && (inputArr.hour)) {
                                        if ($('div#js-card-' + card.id + ' li.card-id').parent().find('.js-estimated-time-icon').length === 0) {
                                            $('div#js-card-' + card.id + ' li.card-id').after('<li class="js-estimated-time-icon"><label class="label label-default h6"><i class="icon-clock"></i>' + inputArr.hour + 'h ' + inputArr.min + 'm</label></li>');
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            }
            if ($(e.target).hasClass('dockmodal')) {
                if ($(e.target).find('.card-id').length === 1) {
                    if ($(e.target).find('.js-estimated-time-button').length === 0) {
                        var temp_card_id = $(e.target).find('.card-id > strong').html().split('#');
                        temp_card_id = temp_card_id[1];

                        var $form = $(custom_fields_data);
                        var custom_form = '<ul class="dropdown-menu dropdown-menu-left arrow col-xs-12" id="js-estimated-time-form-' + temp_card_id + '"><li class="col-xs-12 time-block"><div class="col-xs-12 js-estimated-time-form"><div class="well-sm"></div>' + $form.prop('outerHTML') + '<div class="well-sm"></div></div></li></ul>';
                        var elem = $('<li class="js-estimated-time-button dropdown"><a class="btn btn-default dropdown-toggle"  href="#js-estimated-time-form' + temp_card_id + '" title="Estimated Time" data-toggle="dropdown"><i class="icon-calendar"></i>Estimated Time</a>' + custom_form + '</li>');
                        $('.js-card-actions > li:last-child()', $(e.target)).after(elem);

                        if (custom_fields.boards) {
                            $.each(custom_fields.boards, function(board_key, board) {
                                if (board.lists) {
                                    $.each(board.lists, function(list_key, list) {
                                        if (list.cards) {
                                            $.each(list.cards, function(card_key, card) {
                                                if (card) {
                                                    if (temp_card_id == card_key) {
                                                        var inputArr = JSON.parse(card);
                                                        if (inputArr) {
                                                            $.each(inputArr, function(key, val) {
                                                                if ($('input[name=' + key + ']', $(e.target)).length) {
                                                                    if ($('input[name=' + key + ']', $(e.target)).attr('type') == 'checkbox') {
                                                                        $('input[name=' + key + ']', $(e.target)).prop('checked', true);
                                                                    } else if ($('input[name=' + key + ']', $(e.target)).attr('type') == 'radio') {
                                                                        $('input[name=' + key + ']', $(e.target)).prop('checked', true);
                                                                    } else {
                                                                        $('input[name=' + key + ']', $(e.target)).val(val);
                                                                    }
                                                                } else if ($('select[data-type=' + key + ']', $(e.target)).length) {
                                                                    $('select[data-type=' + key + ']', $(e.target)).val(val);
                                                                } else if ($('select[name=' + key + ']', $(e.target)).length) {
                                                                    $('select[name=' + key + ']', $(e.target)).val(val);
                                                                }
                                                            });
                                                            if ($('div#js-card-' + card.id + ' li.card-id').parent().find('.js-estimated-time-icon').length === 0) {
                                                                $('div#js-card-' + card.id + ' li.card-id').after('<li class="js-estimated-time-icon"><label class="label label-default h6"><i class="icon-clock"></i>' + inputArr.hour + 'h ' + inputArr.min + 'm</label></li>');
                                                            } else {
                                                                $('div#js-card-' + card.id + ' li.card-id').parent().find('.js-estimated-time-icon').html('<label class="label label-default h6"><i class="icon-clock"></i>' + inputArr.hour + 'h ' + inputArr.min + 'm</label>');
                                                            }
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            }
        }

        $('body').append('<div class="modal fade" id="r_estimated_time_modal" tabindex="-1" role="dialog" aria-labelledby="estimatedTimeModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-estimated-time-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_estimated_time.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Estimated Time Custom Field') + '</h4><div><span class="text-muted">v' + session_storage_apps.r_estimated_time.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_estimated_time.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-estimated-time-v0.1.1' + '" title="author">' + session_storage_apps.r_estimated_time.author + '</a></div></div></div></div><div class="modal-body import-block"><span>' + i18next.t('Adds estimated time custom input. This will be displayed in the card listing to arrange them easily.') + '.</span></div><div class="modal-footer"><a id="" href="http://restya.com/contact" target="_blank" title="' + i18next.t('Contact Us') + '" class="btn btn-primary">' + i18next.t('Contact Us') + '</a></div></div></div></div>');
    });


    addResponseCallback(function(xhr) {
        if (xhr.responseURL.match(/boards\/[0-9]+\Sjson/g)) {
            board_response = JSON.parse(xhr.responseText);
        }
    });


    $dc.on('click', '.js-custom-field-submit-btn', function(e) {
        e.preventDefault();
        var current = $(e.target);
        if ($(e.target).parents('div.js-estimated-time-form').length) {
            var board_id, card_id, list_id = '';
            var url = window.location.href;
            var match = url.match(/#\/board\/(\d+)/);
            if (match) {
                board_id = match[1];
            }
            card_id = $(this).parents('.dockmodal.no-footer').find('.card-id > strong').html().split('#');
            card_id = card_id[1];
            var form_data = $(this).parents('form').serializeArray();
            var formData = {};
            $.each(form_data, function(key, inputType) {
                formData[inputType.name] = inputType.value;
            });

            $.each($(this).parents('form').find('select'), function(key, val) {
                formData[$(val).attr('data-type')] = $(val).val();
            });

            $(".js-board-list").each(function() {
                list_id = $(this).attr('data-list_id');
                $(this).find('.js-board-list-card').each(function() {
                    if (card_id == $(this).attr('data-card_id')) {
                        $.ajax({
                            url: api_url + 'boards/' + board_id + '/lists/' + list_id + '/cards/' + card_id + '.json?token=' + getToken(),
                            type: 'put',
                            data: JSON.stringify({
                                'card_id': card_id,
                                'board_id': board_id,
                                'list_id': list_id,
                                'custom_fields': JSON.stringify(formData)
                            }),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function(response) {
                                if ($('div#js-card-' + card_id + ' li.card-id').parent().find('.js-estimated-time-icon').length === 0) {
                                    $('div#js-card-' + card_id + ' li.card-id').after('<li class="js-estimated-time-icon"><label class="label label-default h6"><i class="icon-clock"></i>' + formData.hour + 'h ' + formData.min + 'm</label></li>');
                                } else {
                                    $('div#js-card-' + card_id + ' li.card-id').parent().find('.js-estimated-time-icon').html('<label class="label label-default h6"><i class="icon-clock"></i>' + formData.hour + 'h ' + formData.min + 'm</label>');
                                }
                                $(current).parents('#js-estimated-time-form-' + card_id).parent().removeClass('open');
                            }
                        });
                    }
                });
            });
        }
    });

    $dc.on('click', '#js-hide-card-id-button', function(event) {
        $('#r_estimated_time_modal').modal('hide');
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
