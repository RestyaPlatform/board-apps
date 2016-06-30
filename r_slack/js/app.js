(function() {
    var slackAPIClient;
    var $dc = $(document);
    var slackey = require('slackey');
    var slack_channels = {};
    var slack_mapping_channels = {};
    var local_storage_channel = {};
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));
    $dc.ready(function() {
        $('body').append('<div class="modal fade" id="r_slack_modal" tabindex="-1" role="dialog" aria-labelledby="loginSlackModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading">  <div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_slack.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Post my comments to Slack') + '</h4>	<div><span class="text-muted">v' + session_storage_apps.r_slack.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_slack.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-slack' + '" title="author">' + session_storage_apps.r_slack.author + '</a></div></div></div></div><div class="modal-body import-block" id="slack-modal-description"><h4>' + i18next.t('How it works') + '</h4><ul><li>' + i18next.t('Fetches your Slack channels and creates a mapping with your assigned board names, and stores them in localStorage.') + '</li><li>' + i18next.t('Whenever you post comments in Restyaboard, script posts that to corresponding channels in Slack.') + '</li><li>' + i18next.t('If the board is not in a Slack channel, script creates a new Slack channel using board name and post the comment to it.') + '</li></ul></div><div class="modal-footer"><a id="js-import-slack" href="#" title="' + i18next.t('Login With Slack') + '" class="btn btn-primary">' + i18next.t('Login With Slack') + '</a></div></div></div></div><div class="modal fade" id="js-slack-importing-loader" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content well-lg text-center"><div class="col-xs-12"><div class="col-xs-10">' + i18next.t('Importing') + '...&nbsp;&nbsp;</div><span class="cssloader"></span></div><div>(' + i18next.t('Do not close or refresh this window') + ')</div></div></div></div>');
        if (localStorage.getItem("r_slack_access_token") !== null) {
            $('#slack-modal-description').text(i18next.t('Your have already connected with Slack'));
            $('#js-import-slack').text(i18next.t('Close')).attr('data-dismiss', 'modal').attr('title', i18next.t('Close')).removeAttr('id');
        }
        $dc.on('click', '#js-import-slack', function(event) {
            $('#r_slack_modal').modal('hide');
            event.preventDefault();
            PopupCenter('https://slack.com/oauth/authorize?client_id=' + r_slack_client_id + '&scope=channels:read,chat:write:user,channels:write', 'DescriptiveWindowName', 'resizable,scrollbars,status', '', '900', '500');
            return false;
        });
    });

    function PopupCenter(url, title, w, h) {
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        if (window.focus) {
            newWindow.focus();
        }
    }

    window.addEventListener('message', function(event) {
        if (event.data.app === 'r_slack') {
            var code = event.data.code;
            $.get('oauth_callback/r_slack/' + code, function(access_token) {
                slackToken = access_token;
                if (access_token.indexOf('failed') === -1) {
                    $('#js-slack-importing-loader').modal('show');
                    localStorage.setItem("r_slack_access_token", slackToken);
                    $('#slack-modal-description').text(i18next.t('Your have already connected with Slack'));
                    $('#js-import-slack').text(i18next.t('Close')).attr('data-dismiss', 'modal').attr('title', i18next.t('Close')).removeAttr('id');
                    slackAPIClient = slackey.getAPIClient(slackToken);
                    slackAPIClient.send('channels.list', function(err, response) {
                        if (response.channels.length > 0) {
                            $.each(response.channels, function(key, channel) {
                                slack_channels[channel.name] = channel.id;
                            });
                            localStorage.setItem("r_slack_channels", JSON.stringify(slack_channels));
                            $('#js-slack-importing-loader').modal('hide');
                        }
                    });
                } else {
                    flashMesssage('danger', i18next.t('Authentication failed'));
                }
            });
        }
    });

    addResponseCallback(function(xhr) {
        if (localStorage.getItem("r_slack_access_token") !== null && xhr.responseURL.match(/users\/[0-9]+\/activities\Sjson\?type=all/g)) {
            var _response = JSON.parse(xhr.responseText);
            if (_response.data) {
                slackAPIClient = slackey.getAPIClient(localStorage.getItem("r_slack_access_token"));
                $.each(_response.data, function(key, value) {
                    if (value.type === 'add_comment') {
                        local_storage_channel = JSON.parse(localStorage.getItem("r_slack_channels"));
                        value.board_name = value.board_name.replace(/[^a-zA-Z0-9 -]/g, '_').toLowerCase().replace(" ", "-");
                        value.comment = _.escape(value.full_name) + ' commented in card ' + value.card_name + ' ' + value.comment;
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
                    }
                });
            }
        }
    });
})();
