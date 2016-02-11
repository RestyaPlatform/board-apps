(function() {
    var $dc = $(document);
    var zapierToken = '';
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));
    $dc.ready(function() {
        $('body').append('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="loginZapierModalLabel" id="r_zapier_modal" aria-hidden="false" ><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_zapier.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Zapier') + '</h4><div><span class="text-muted">v' + session_storage_apps.r_zapier.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_zapier.author_url + '" title="author">' + session_storage_apps.r_zapier.author + '</a></div></div></div></div><div class="modal-body import-block" id="zapier-modal-description"><ul><li>' + i18next.t('We will create a access token which you should use in zapier to connect restya account.') + '</li></ul></div><div class="modal-footer"><a id="js-zapier" href="#" title="' + i18next.t('Connect With Zapier') + '" class="btn btn-primary">' + i18next.t('Connect With Zapier') + '</a></div></div></div></div>');
        if (sessionStorage.getItem("r_zapier_access_token") !== null) {
            $('#zapier-modal-description').text(i18next.t('Your Zapier Access token is ') + sessionStorage.getItem("r_zapier_access_token"));
            $('#js-zapier').text(i18next.t('Close')).attr('data-dismiss', 'modal').attr('title', i18next.t('Close')).removeAttr('id');
        }
        $dc.on('click', '#js-zapier', function(event) {
            event.preventDefault();
            window.open(window.location.protocol + '//' + window.location.host + window.location.pathname + 'oauth/authorize?response_type=code&client_id=' + r_zapier_client_id + '&state=' + new Date().getTime() + '&redirect_uri=' + window.location.protocol + '//' + window.location.host + window.location.pathname + 'apps/r_zapier/login.html', 'DescriptiveWindowName', 'resizable,scrollbars,status');
            return false;
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
        if (event.data.app === 'r_zapier') {
            var code = event.data.code;
            $.get('oauth_callback/r_zapier/' + code, function(access_token) {
                zapierToken = access_token;
                if (access_token.indexOf('failed') === -1) {
                    sessionStorage.setItem("r_zapier_access_token", zapierToken);
                    $('#zapier-modal-description').text(i18next.t('Your Zapier Access token is ') + sessionStorage.getItem("r_zapier_access_token"));
                    $('#js-zapier').text(i18next.t('Close')).attr('data-dismiss', 'modal').attr('title', i18next.t('Close')).removeAttr('id');
                } else {
                    flashMesssage('danger', i18next.t('Authentication failed'));
                }
            });
        }
    });
})();
