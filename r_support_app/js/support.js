(function() {
	var js_url = $("#url").attr("js_url");
    var api_url = js_url+'/api/v1/';
    var $dc = $(document);
    var board_id = '';
    var list_id = '';
    var $dc = $(document);
	
	$dc.on('click', '#js-support-ticket-button', function() {
		if($(this).parent().hasClass('open')) {
			$(this).parent().removeClass('open');
		} else {
			$(this).parent().addClass('open');
		}
	});
	
    $.getJSON("//"+js_url+"/apps/r_support_app/app.json", function(data) {
        board_id = data.settings.r_support_app_board_id.value;
        list_id = data.settings.r_support_app_list_id.value;
    });

    $dc.on('click', '#js-supportSubmit', function(event) {
        var form = $('form#js-supportForm');
        event.preventDefault();
        if (form[0].checkValidity()) {
            $.ajax({
                url: api_url + 'oauth.json',
                type: 'GET',
                processData: false,
                cache: false,
                contentType: false,
                success: function(oauth_response) {
                    if (oauth_response.access_token !== undefined) {
                        $.ajax({
                            url: api_url + 'users/register.json?token=' + oauth_response.access_token,
                            type: 'post',
                            data: JSON.stringify({
                                'email': $('#email').val(),
                                'password': 'restya',
                                'username': $('#name').val(),
                                'is_active': 't',
                                'is_email_confirmed': 't',
                            }),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function(register_response) {
                                if (register_response.id !== undefined) {
                                    $.ajax({
                                        url: api_url + 'users/login.json?token=' + oauth_response.access_token,
                                        type: 'post',
                                        data: JSON.stringify({
                                            'password': 'restya',
                                            'email': $('#name').val(),
                                        }),
                                        contentType: 'application/json; charset=utf-8',
                                        dataType: 'json',
                                        success: function(login_response) {
                                            if (login_response.user.id !== undefined) {
                                                access_token = login_response.access_token;
                                                user = login_response.user;
                                                $.ajax({
                                                    url: api_url + 'boards/' + board_id + '/users.json?token=' + access_token,
                                                    type: 'post',
                                                    data: JSON.stringify({
                                                        'board_id': parseInt(board_id),
                                                        'board_user_role_id': 2,
                                                        'full_name': user.full_name,
                                                        'initials': user.initials,
                                                        'profile_picture_path': user.profile_picture_path,
                                                        'user_id': parseInt(user.id),
                                                        'username': user.username
                                                    }),
                                                    contentType: 'application/json; charset=utf-8',
                                                    dataType: 'json',
                                                    success: function(board_subscription_response) {
                                                        if (board_subscription_response.id !== undefined) {
                                                            $.ajax({
                                                                url: api_url + '/boards/' + board_id + '/lists/' + list_id + '/cards.json?token=' + access_token,
                                                                type: 'post',
                                                                data: JSON.stringify({
                                                                    'board_id': board_id,
                                                                    'list_id': list_id,
                                                                    'name': $('#subject').val(),
                                                                    'position': 0,
                                                                    'description': $('#description').val()
                                                                }),
                                                                contentType: 'application/json; charset=utf-8',
                                                                dataType: 'json',
                                                                success: function(card_create_response) {
                                                                    if (card_create_response.id !== undefined) {
                                                                        $.ajax({
                                                                            url: api_url + '/boards/' + board_id + '/lists/' + list_id + '/cards/' + card_create_response.id + '/card_subscribers.json?token=' + access_token,
                                                                            type: 'post',
                                                                            data: JSON.stringify({
                                                                                'board_id': board_id,
                                                                                'list_id': list_id,
                                                                                'card_id': card_create_response.id,
                                                                                'is_subscribed': 1,
                                                                                'is_offline': true,
                                                                                'user_id': parseInt(user.id)
                                                                            }),
                                                                            contentType: 'application/json; charset=utf-8',
                                                                            dataType: 'json',
                                                                            success: function(card_subscriptions_response) {
                                                                                if (card_subscriptions_response.id !== undefined) {
                                                                                    flashMesssage('Success', 'Your request has been accepted');
                                                                                } else {
                                                                                    flashMesssage('danger', 'Card subscription Failed');
                                                                                }
                                                                            }
                                                                        });
                                                                    } else {
                                                                        flashMesssage('danger', 'Card creation Failed');
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            flashMesssage('danger', 'Assign to Board\'s member Failed');
                                                        }
                                                    }
                                                });
                                            } else {
                                                flashMesssage('danger', 'Login failed');
                                            }
                                        }
                                    });
                                } else {
                                    flashMesssage('danger', 'Registration failed');
                                }
                            }
                        });
                    } else {
                        flashMesssage('danger', 'Process Aborted');
                    }
                }
            });
        } else {
			flashMesssage('danger', 'Please fill all details');
		}
    });

    function flashMesssage(type, message) {
		if(type === 'Success') {
			$('.show-messages').append('<div class="alert alert-success"><a href="#" class="close pull-right" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> '+message+'</div>');
		} else {
			$('.show-messages').append('<div class="alert alert-danger"><a href="#" class="close pull-right" data-dismiss="alert" aria-label="close">&times;</a><strong>Failed!</strong> '+message+'</div>');
		}
    }
})();
