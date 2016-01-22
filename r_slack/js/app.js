(function() {
    var slackAPIClient;
    var $dc = $(document);
    var slackey = require('slackey');
    var AjaxInterceptor = require("ajax-interceptor");
    var slack_channels = {};
    var slack_mapping_channels = {};
    var local_storage_channel = {};
    $dc.ready(function() {
        $('#footer').bind('DOMSubtreeModified', insertSlackButton);

        function insertSlackButton(e) {
            if ($(e.target).hasClass('footer')) {
                if ($('#js-slack-element').length === 0) {
                    if (localStorage.getItem("r_slack_access_token") === null) {
                        $("#footer ul").first().append('<li id="js-slack-element" class="hidden-xs org-btn"><a title="' + i18next.t('Login with Slack') + '" href="#" class="js-slack-login-button btn btn-default" id="js-slack-login"><span>' + i18next.t('Login with Slack') + '</span></a></li>');
                    }
                }
            }
        }
        $dc.on('click', '#js-slack-login', function(event) {
            $('body').append('<div class="modal fade in" id="loginSlackModal" tabindex="-1" role="dialog" aria-labelledby="loginSlackModalLabel" aria-hidden="false" style="display: block;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="loginSlackModalLabel">' + i18next.t('Post messages to Slack') + '</h4></div><div class="modal-body import-block"><ul><li>' + i18next.t('We will fetch your Slack channels and create a mapping with your assigned board names and store it in localStorage.') + '</li><li>' + i18next.t('If any new activities done in the board, then script will post the activities as a message to corresponding channels in Slack.') + '</li><li>' + i18next.t('If the board is not in a Slack channel, we will create a channel using board name and post the message to it.') + '</li></ul></div><div class="modal-footer"><a id="js-import-slack" href="#" title="' + i18next.t('Login With Slack') + '" class="btn btn-primary">' + i18next.t('Login With Slack') + '</a></div></div></div></div>');
            return false;
        });
        $dc.on('click', '#js-import-slack', function(event) {
            $('#loginSlackModal').hide();
            event.preventDefault();
            window.open('https://slack.com/oauth/authorize?client_id=' + r_slack_client_id + '&scope=channels:read,chat:write:user,channels:write', 'DescriptiveWindowName', 'resizable,scrollbars,status');
            return false;
        });
    });

    window.addEventListener('message', function(event) {
        if (event.data.app === 'r_slack') {
            var code = event.data.code;
            $.get('oauth_callback/r_slack/' + code, function(access_token) {
                slackToken = access_token;
                if (access_token.indexOf('failed') === -1) {
                    $('#js-slack-element').addClass('hide');
                    $('body').append('<div class="modal fade in" id="js-slack-importing-loader" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" style="display: block;"><div class="modal-dialog"><div class="modal-content well-lg text-center"><div class="col-xs-12"><div class="col-xs-10">' + i18next.t('Importing') + '...&nbsp;&nbsp;</div><span class="cssloader"></span></div><div>(' + i18next.t('Do not close or refresh this window') + ')</div></div></div></div>');
                    localStorage.setItem("r_slack_access_token", slackToken);
                    slackAPIClient = slackey.getAPIClient(slackToken);
                    slackAPIClient.send('channels.list', function(err, response) {
                        if (response.channels.length > 0) {
                            $.each(response.channels, function(key, channel) {
                                slack_channels[channel.name] = channel.id;
                            });
                            localStorage.setItem("r_slack_channels", JSON.stringify(slack_channels));
                            $('#js-slack-importing-loader').hide();
                        }
                    });
                } else {
                    flashMesssage('danger', i18next.t('Authentication failed'));
                }
            });
        }
    });

    AjaxInterceptor.addResponseCallback(function(xhr) {
        if (localStorage.getItem("r_slack_access_token") !== null && xhr.responseURL.match(/users\/[0-9]\/activities\Sjson\?type=all/g)) {
            var _response = JSON.parse(xhr.responseText);
            if (_response.data) {
                slackAPIClient = slackey.getAPIClient(localStorage.getItem("r_slack_access_token"));
                $.each(_response.data, function(key, value) {
                    local_storage_channel = JSON.parse(localStorage.getItem("r_slack_channels"));
                    value.board_name = value.board_name.replace(/[^a-zA-Z0-9 -]/g, '_').toLowerCase().replace(" ", "-");
                    if (value.type != 'add_comment' && value.type != 'edit_comment') {
                        var cardLink = value.card_name;
                        value.comment = value.comment.replace('##ORGANIZATION_LINK##', _.escape(value.organization_name));
                        value.comment = value.comment.replace('##USER_NAME##', _.escape(value.full_name));
                        value.comment = value.comment.replace('##CARD_LINK##', cardLink);
                        value.comment = value.comment.replace('##LABEL_NAME##', value.label_name);
                        value.comment = value.comment.replace('##CARD_NAME##', value.card_name);
                        value.comment = value.comment.replace('##DESCRIPTION##', value.card_description);
                        value.comment = value.comment.replace('##LIST_NAME##', value.list_name);
                        value.comment = value.comment.replace('##BOARD_NAME##', value.board_name);
                        if (!_.isUndefined(value.checklist_name)) {
                            value.comment = value.comment.replace('##CHECKLIST_NAME##', value.checklist_name);
                        }
                        if (!_.isUndefined(value.checklist_item_name)) {
                            value.comment = value.comment.replace('##CHECKLIST_ITEM_NAME##', value.checklist_item_name);
                        }
                        if (!_.isUndefined(value.checklist_item_parent_name)) {
                            value.comment = value.comment.replace('##CHECKLIST_ITEM_PARENT_NAME##', value.checklist_item_parent_name);
                        }
                    } else if (value.type === 'add_comment') {
                        value.comment = _.escape(value.full_name) + ' commented in card ' + value.card_name + ' ' + value.comment;
                    }
                    if (local_storage_channel[value.board_name]) {
                        slackAPIClient.send('chat.postMessage', {
                            text: value.comment,
                            channel: local_storage_channel[value.board_name],
                            as_user: true
                        }, function(err, response) {
                            slack_mapping_channels[value.board_name] = local_storage_channel[value.board_name];
                            localStorage.setItem("r_slack_mapping_channels", JSON.stringify(slack_mapping_channels));
                        });
                    } else {
                        slackAPIClient.send('channels.create', {
                            name: value.board_name
                        }, function(err, response) {
                            if (!err) {
                                local_storage_channel[value.board_name] = response.channel.id;
                                localStorage.setItem("r_slack_channels", JSON.stringify(local_storage_channel));
                                slack_mapping_channels[value.board_name] = local_storage_channel[value.board_name];
                                localStorage.setItem("r_slack_mapping_channels", JSON.stringify(slack_mapping_channels));
                                slackAPIClient.send('chat.postMessage', {
                                    text: value.comment,
                                    channel: local_storage_channel[value.board_name],
                                    as_user: true
                                });
                            } else {
                                if (err.message == 'name_taken') {
                                    slackAPIClient.send('chat.postMessage', {
                                        text: value.comment,
                                        channel: local_storage_channel[value.board_name],
                                        as_user: true
                                    }, function(err, response) {
                                        slack_mapping_channels[value.board_name] = local_storage_channel[value.board_name];
                                        localStorage.setItem("r_slack_mapping_channels", JSON.stringify(slack_mapping_channels));
                                    });
                                }
                            }
                        });
                    }
                });
            }
        }
    });
    AjaxInterceptor.wire();
})();
