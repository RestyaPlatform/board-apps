(function() {
    var $dc = $(document);
    var zapierToken = '';
    var local_storage_apps = JSON.parse(localStorage.getItem("apps"));
    $dc.ready(function() {
        $('body').append('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="loginZapierModalLabel" id="r_zapier_modal" aria-hidden="false" ><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + local_storage_apps.r_zapier.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Zapier Connect') + '</h4><div><span class="text-muted">v' + local_storage_apps.r_zapier.version + '</span> By <a target="_blank" href="' + local_storage_apps.r_zapier.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-zapier' + '" title="author">' + local_storage_apps.r_zapier.author + '</a></div></div></div></div><div class="modal-body import-block" id="zapier-modal-description"><ul><li>' + i18next.t('Zapier is IFTTT like workflow automation service.') + '</li><li>' + i18next.t('This app generates "access token" that you should use it in Zapier to connect with your Restyaboard account.') + '</li><li>' + i18next.t('Please refer to <a href="http://restya.com/board/integrations" target="_blank" class="text-primary">Integration document</a> for how to use your "access token" in Zapier.') + '</li></ul></div><div class="modal-footer"><a id="js-zapier" href="#" title="' + i18next.t('Connect With Zapier') + '" class="btn btn-primary">' + i18next.t('Connect With Zapier') + '</a></div></div></div></div>');
        if (localStorage.getItem("r_zapier_access_token") !== null) {
            $('#zapier-modal-description').text(i18next.t('Your Zapier Access token is ') + localStorage.getItem("r_zapier_access_token"));
            $('#js-zapier').text(i18next.t('Close')).attr('data-dismiss', 'modal').attr('title', i18next.t('Close')).removeAttr('id');
        }
        $dc.on('click', '#js-zapier', function(event) {
            event.preventDefault();
            PopupCenter(window.location.protocol + '//' + window.location.host + window.location.pathname + 'oauth/authorize?response_type=code&client_id=' + r_zapier_client_id + '&scope=read write&state=' + new Date().getTime() + '&redirect_uri=' + window.location.protocol + '//' + window.location.host + window.location.pathname + 'apps/r_zapier/login.html', 'DescriptiveWindowName', 'resizable,scrollbars,status', '', '900', '500');
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
        if (event.data.app === 'r_zapier') {
            var code = event.data.code;
            $.get('oauth_callback/r_zapier/' + code, function(access_token) {
                zapierToken = access_token;
                if (access_token.indexOf('failed') === -1) {
                    localStorage.setItem("r_zapier_access_token", zapierToken);
                    $('#zapier-modal-description').text(i18next.t('Your Zapier Access token is ') + localStorage.getItem("r_zapier_access_token"));
                    $('#js-zapier').text(i18next.t('Close')).attr('data-dismiss', 'modal').attr('title', i18next.t('Close')).removeAttr('id');
                } else {
                    flashMesssage('danger', i18next.t('Authentication failed'));
                }
            });
        }
    });
})();
