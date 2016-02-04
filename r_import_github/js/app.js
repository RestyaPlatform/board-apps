(function() {
    var $dc = $(document);
    var github;
    var gitToken = '';
    var totalCount = 0;
    var successCount = 0;
    var github_boards = [];
    var board_users = {};
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));
    $dc.ready(function() {
        $('#footer').bind('DOMSubtreeModified', insertGithubImportButton);

        function insertGithubImportButton(e) {
            if ($(e.target).hasClass('js-show-add-boards-list') || $(e.target).hasClass('footer')) {
                if ($('.js-show-board-import-form').is(':visible') && $('.js-import-github-element').length === 0) {
                    var elem = $('<li class="js-import-github-element col-xs-12 navbar-btn divider js-back"></li><li class="js-import-github-element col-xs-12 btn-block js-back"><a data-toggle="modal" data-target="#r_import_github_modal" class="col-xs-12 h6 navbar-btn" title="' + i18next.t('Import from GitHub') + '" href="" id="js-github-login"><span class="show clearfix text-primary navbar-btn h5"><span class="pull-left">' + i18next.t('Import from GitHub') + '</span>&nbsp;&nbsp;<span class="label label-warning pull-right">' + i18next.t('App') + '</span></span><span class="show">' + i18next.t('Import your GitHub repositories as boards and issues as card for the board.') + '</span></a></li>');
                    $('.js-show-add-boards-list > li:nth-child(4)').after(elem);
                } else if (!$('.js-show-board-import-form').is(':visible')) {
                    $('.js-import-github-element').remove();
                }
                $('body').append('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="loginGithubModalLabel" id="r_import_github_modal" aria-hidden="false" ><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading">  <div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_import_github.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Import from GitHub') + '</h4><div><span class="text-muted">v' + session_storage_apps.r_import_github.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_import_github.author_url + '" title="author">' + session_storage_apps.r_import_github.author + '</a></div></div></div></div><div class="modal-body import-block"><ul><li>' + i18next.t('We will insert your GitHub repositories as a board.') + '</li><li>' + i18next.t('We will create users with default password restya and email as empty for each repository users from GitHub.') + '</li><li>' + i18next.t('Assign the created users as board members.') + '</li><li>' + i18next.t('We will create default lists for each board which are New, Assigned, In Progress, Feedback, Closed.') + '</li><li>' + i18next.t('We will insert every issue as a card in the list based on following criteria.') + '</li><ul><li>' + i18next.t('If issue state is not equal to open, issue will be added as a card in "Closed" list.') + '</li><li>' + i18next.t('If issue comment count is not equal zero, issue will be as a card added in "Feedback" list.') + '</li><li>' + i18next.t('If issue has milestone date, issue will be added as a card in "In Progress" list.') + '</li><li>' + i18next.t('If issue assigned to user, issue will be added as a card in "Assigned" list.') + '</li><li>' + i18next.t('If issue is not match any criteria, issue will be added as a card in "New" list.') + '</li></ul><li>' + i18next.t('Assign labels to each cards, milestone date to card due date and assigned users to card members.') + '</li><li>' + i18next.t('Also we will insert issue comments to respective card comments.') + '</li></ul></div><div class="modal-footer"><a id="js-import-github" href="#" title="' + i18next.t('Login With GitHub') + '" class="btn btn-primary">' + i18next.t('Login With GitHub') + '</a></div></div></div></div><div class="modal fade" id="js-github-importing-loader" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content well-lg text-center"><div class="col-xs-12"><div class="col-xs-10">' + i18next.t('Importing') + '...&nbsp;&nbsp;</div><span class="cssloader"></span></div><div>(' + i18next.t('Do not close or refresh this window') + ')</div></div></div></div>');
            }
        }
        $dc.on('click', '#js-import-github', function(event) {
            $('#r_import_github_modal').modal('hide');
            event.preventDefault();
            window.open('https://github.com/login/oauth/authorize?client_id=' + r_import_github_client_id + '&scope=user,repo', 'DescriptiveWindowName', 'resizable,scrollbars,status');
            return false;
        });
        $dc.on('click', '#js-github-refresh', function(event) {
            if (window.location.hash.substr(1) === '/boards') {
                location.reload();
            } else {
                window.location = '#/boards';
            }
        });
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
    window.addEventListener('message', function(event) {
        if (event.data.app === 'r_import_github') {
            var code = event.data.code;
            $.get('oauth_callback/r_import_github/' + code, function(access_token) {
                gitToken = access_token;
                if (access_token.indexOf('failed') === -1) {
                    $('#js-github-importing-loader').modal('show');
                    githubInit(gitToken);
                } else {
                    flashMesssage('danger', i18next.t('Authentication failed'));
                }
            });
        }
    });

    function getToken() {
        if (window.sessionStorage.getItem('auth') !== undefined) {
            var Auth = JSON.parse(window.sessionStorage.getItem('auth'));
            api_token = Auth.access_token;
            return api_token;
        } else {
            return false;
        }
    }

    function do_post_board(boards) {
        if (boards.length > 0) {
            $.each(boards, function(i, value) {
                $.ajax({
                    url: api_url + 'boards.json?token=' + getToken(),
                    type: 'post',
                    data: JSON.stringify({
                        'name': value.name,
                        'board_visibility': value.board_visibility
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function(data) {
                        successCount += 1;
                        if (data.id !== undefined) {
                            github_boards.push(boards[i].name);
                            boards[i].board_id = data.id;
                            if (boards[i].new_issues.length > 0 || boards[i].assigned_issues.length > 0 || boards[i].in_progress_issues.length > 0 || boards[i].feedback_issues.length > 0 || boards[i].closed_issues.length > 0) {
                                do_post_list(boards[i]);
                            }
                            do_post_board_users(boards[i]);
                        } else {
                            flashMesssage('danger', i18next.t('"%s" board create failed', {
                                postProcess: 'sprintf',
                                sprintf: [boards[i].name]
                            }));
                        }
                    }
                });
            });
        }
    }

    function do_post_list(board) {
        var lists = [{
            name: 'New'
        }, {
            name: 'Assigned'
        }, {
            name: 'In Progress'
        }, {
            name: 'Feedback'
        }, {
            name: 'Closed'
        }];
        $.each(lists, function(i, value) {
            $.ajax({
                url: api_url + 'boards/' + board.board_id + '/lists.json?token=' + getToken(),
                type: 'post',
                data: JSON.stringify({
                    'board_id': board.board_id,
                    'is_archived': false,
                    'name': lists[i].name,
                    'position': (i + 1),
                    'uuid': '3434234234324'
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(data) {
                    if (data.id !== undefined) {
                        successCount += 1;
                        if (lists[i].name == 'New') {
                            board.new_list_id = data.id;
                            if (data.id !== undefined && board.new_issues.length > 0) {
                                do_post_issue(board, 'new_issues', board.new_list_id);
                            }
                        } else if (lists[i].name == 'Assigned') {
                            board.assigned_list_id = data.id;
                            if (data.id !== undefined && board.assigned_issues.length > 0) {
                                do_post_issue(board, 'assigned_issues', board.assigned_list_id);
                            }
                        } else if (lists[i].name == 'In Progress') {
                            board.in_progress_list_id = data.id;
                            if (data.id !== undefined && board.in_progress_issues.length > 0) {
                                do_post_issue(board, 'in_progress_issues', board.in_progress_list_id);
                            }
                        } else if (lists[i].name == 'Feedback') {
                            board.feedback_list_id = data.id;
                            if (data.id !== undefined && board.feedback_issues.length > 0) {
                                do_post_issue(board, 'feedback_issues', board.feedback_list_id);
                            }
                        } else {
                            board.closed_list_id = data.id;
                            if (data.id !== undefined && board.closed_issues.length > 0) {
                                do_post_issue(board, 'closed_issues', board.closed_list_id);
                            }
                        }
                    }
                }
            });
        });
    }

    function do_post_issue(board, type, list_id) {
        $.each(board[type], function(i, value) {
            var user_ids = value.assignee;
            if (value.assignee) {
                $.each(board_users[board.name], function(j, user_id) {
                    if (user_id.hasOwnProperty(value.assignee.login)) {
                        user_ids = user_id[value.assignee.login];
                    }
                });
            }
            $.ajax({
                url: api_url + '/boards/' + board.board_id + '/lists/' + list_id + '/cards.json?token=' + getToken(),
                type: 'post',
                data: JSON.stringify({
                    'board_id': board.board_id,
                    'list_id': list_id,
                    'name': value.title,
                    'position': i,
                    'description': value.body,
                    'due_date': value.due_on,
                    'card_labels': value.labels.map(function(elem) {
                        return elem.name;
                    }).join(","),
                    'user_ids': user_ids
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(data) {
                    successCount += 1;
                    if (value.comments !== 0) {
                        $.ajax({
                            url: value.comments_url,
                            type: 'get',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function(comment_data) {
                                $.each(comment_data, function(key, comment_value) {
                                    $.each(board_users[board.name], function(j, user_id) {
                                        if (user_id.hasOwnProperty(comment_value.user.login)) {
                                            do_post_comments(board, data, comment_value, list_id, user_id[comment_value.user.login]);
                                        }
                                    });
                                });
                            }
                        });
                    }
                    return true;
                }
            });
        });
    }

    function do_post_board_users(board) {
        $.each(board_users[board.name], function(j, user_ids) {
            $.each(user_ids, function(i, user_id) {
                $.ajax({
                    url: api_url + '/boards/' + board.board_id + '/users.json?token=' + getToken(),
                    type: 'post',
                    data: JSON.stringify({
                        'board_id': board.board_id,
                        'user_id': user_id
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function(data) {}
                });
            });
        });
    }

    function do_post_comments(board, data, comment_value, list_id, user_id) {
        $.ajax({
            url: api_url + '/boards/' + board.board_id + '/lists/' + list_id + '/cards/' + data.id + '/comments.json?token=' + getToken(),
            type: 'post',
            data: JSON.stringify({
                'board_id': board.board_id,
                'card_id': data.id,
                'list_id': list_id,
                'comment': comment_value.body,
                'user_id': user_id,
                'type': 'add_comment'
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data) {
                successCount += 1;
            }
        });
    }

    function do_post_users(user, board_name) {
        $.ajax({
            url: api_url + '/users/register.json?token=' + getToken(),
            type: 'post',
            data: JSON.stringify({
                'email': '',
                'password': 'restya',
                'username': user,
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data) {
                var user_id = {};
                user_id[user] = data.id;
                if (board_users.hasOwnProperty(board_name)) {
                    board_users[board_name].push(user_id);
                } else {
                    board_users[board_name] = [];
                    board_users[board_name].push(user_id);
                }
                successCount += 1;
            }
        });
    }

    function do_check_users(user, board_name) {
        $.ajax({
            url: api_url + 'users/search.json?q=' + user + '&filter=all&token=' + getToken(),
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data) {
                if (data.length > 0) {
                    $.each(data, function(i, value) {
                        if (user !== value.username) {
                            do_post_users(user, board_name);
                        } else {
                            var user_id = {};
                            var user_name = value.username;
                            user_id[user_name] = value.id;
                            if (board_users.hasOwnProperty(board_name)) {
                                board_users[board_name].push(user_id);
                            } else {
                                board_users[board_name] = [];
                                board_users[board_name].push(user_id);
                            }
                            successCount += 1;
                        }
                    });
                } else {
                    do_post_users(user, board_name);
                }
            }
        });
    }

    function do_get_users(assignees_url, board_name) {
        $.ajax({
            url: assignees_url.replace("{/user}", ''),
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data) {
                totalCount += data.length;
                $.each(data, function(i, value) {
                    do_check_users(value.login, board_name);
                });
            }
        });
    }

    function githubInit($gitToken) {
        $username = '';
        if (getToken()) {
            github = new Github({
                token: $gitToken,
                auth: 'oauth'
            });
            var user = github.getUser();
            var boards = [];
            if (user.userRepos.length > 0) {
                user.authUser(function(err, repos) {
                    $username = repos.login;
                    user.userRepos($username, function(err, repos) {
                        if (err === null && repos.length > 0) {
                            totalCount += repos.length;
                            $.each(repos, function(i, value) {
                                if (repos[i].assignees_url) {
                                    do_get_users(repos[i].assignees_url, repos[i].name);
                                }
                                window['$params_' + i] = {
                                    'name': repos[i].name,
                                    'board_visibility': 0,
                                    new_issues: {},
                                    assigned_issues: {},
                                    in_progress_issues: {},
                                    feedback_issues: {},
                                    closed_issues: {},
                                    board_id: 0
                                };
                                var issues = github.getIssues($username, repos[i].name, 'all');
                                var new_list_issues = [];
                                var assigned_list_issues = [];
                                var in_progress_list_issues = [];
                                var feedback_list_issues = [];
                                var closed_list_issues = [];
                                issues.list({
                                    user: $username,
                                    repo: repos[i].name,
                                    state: 'all'
                                }, function(err, issues) {
                                    if (issues.length > 0) {
                                        totalCount += 5;
                                        totalCount += issues.length;
                                        for (j = 0; j < issues.length; j++) {
                                            temp_issues = {};
                                            temp_issues = {
                                                id: issues[j].id,
                                                title: issues[j].title,
                                                state: issues[j].state,
                                                updated_at: issues[j].updated_at,
                                                created_at: issues[j].created_at,
                                                closed_at: issues[j].closed_at,
                                                body: issues[j].body,
                                                labels: issues[j].labels,
                                                due_on: (issues[j].milestone !== null && issues[j].milestone.due_on !== null) ? issues[j].milestone.due_on : null,
                                                comments: issues[j].comments,
                                                assignee: issues[j].assignee,
                                                comments_url: issues[j].comments_url
                                            };
                                            if (issues[j].state != 'open') {
                                                closed_list_issues.push(temp_issues);
                                            } else if (issues[j].comments !== 0) {
                                                feedback_list_issues.push(temp_issues);
                                            } else if (issues[j].milestone !== null && issues[j].milestone.due_on !== null) {
                                                in_progress_list_issues.push(temp_issues);
                                            } else if (issues[j].assignee !== null) {
                                                assigned_list_issues.push(temp_issues);
                                            } else {
                                                new_list_issues.push(temp_issues);
                                            }
                                            totalCount += issues[j].comments;
                                        }
                                        window['$params_' + i].new_issues = new_list_issues;
                                        window['$params_' + i].assigned_issues = assigned_list_issues;
                                        window['$params_' + i].in_progress_issues = in_progress_list_issues;
                                        window['$params_' + i].feedback_issues = feedback_list_issues;
                                        window['$params_' + i].closed_issues = closed_list_issues;
                                    }
                                    boards.push(window['$params_' + i]);

                                    if (repos.length == boards.length) {
                                        do_post_board(boards);
                                    }
                                });
                            });
                            setInterval(function() {
                                if (totalCount === successCount && totalCount !== 0) {
                                    $('#js-github-importing-loader').modal('hide');
                                    var message = '<div class="well-sm">' + i18next.t('Below GitHub repositories are imported as boards') + ':';
                                    message += '<ul class="navbar-btn">';
                                    for (var i = 0; i < github_boards.length; ++i) {
                                        message += '<li>' + github_boards[i] + '</li>';
                                    }
                                    message += '</ul>';
                                    message += '<div class="text-right"><a id="js-github-refresh" href="#" title="' + i18next.t('Refresh') + '"><i class="icon icon-refresh text-muted"></i>  ' + i18next.t('Refresh') + '</a></div></div>';
                                    flashMesssage('success', message);
                                    totalCount = 0;
                                    successCount = 0;
                                    github_boards = [];
                                    board_users = {};
                                }
                            }, 100);
                        } else {
                            if (err !== null) {
                                flashMesssage('danger', i18next.t('Login failed'));
                            } else {
                                flashMesssage('danger', i18next.t('No repositories found'));
                            }
                        }
                    });
                });
            }
        }
    }
})();
