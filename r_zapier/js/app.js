(function() {
    var $dc = $(document);
	var zapierToken = '';
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));
    $dc.ready(function() {
        $('#footer').bind('DOMSubtreeModified', insertZapierButton);

        function insertZapierButton(e) {
            if ($(e.target).hasClass('footer')) {
				if (sessionStorage.getItem("r_zapier_access_token") === null) {
					$('body').append('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="loginZapierModalLabel" id="r_zapier_modal" aria-hidden="false" ><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading">  <div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_zapier.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Zapier') + '</h4><div><span class="text-muted">v' + session_storage_apps.r_zapier.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_zapier.author_url + '" title="author">' + session_storage_apps.r_zapier.author + '</a></div></div></div></div><div class="modal-body import-block">' + i18next.t('We are going to connect you with Zapier.') + '</div><div class="modal-footer"><a id="js-zapier" href="#" title="' + i18next.t('Connect With Zapier') + '" class="btn btn-primary">' + i18next.t('Connect With Zapier') + '</a></div></div></div></div>');
				} else {
					$('a[data-target="#r_zapier_modal"]').removeAttr('data-target data-toggle').attr("id","footer-li-zapier");
				}
            }
        }
        $dc.on('click', '#js-zapier', function(event) {
            $('#r_zapier_modal').modal('hide');
            event.preventDefault();
            window.open('http://192.168.1.211/restyaboard/oauth/authorize?response_type=code&client_id=' + r_zapier_client_id + '&state=test123&redirect_uri=http://192.168.1.211/restyaboard/client/apps/r_zapier/login.html', 'DescriptiveWindowName', 'resizable,scrollbars,status');
            return false;
        });
		$dc.on('click', '#footer-li-zapier', function(event) {
            event.preventDefault();
			window.open('http://192.168.1.211/restyaboard/client/apps/r_zapier/access_token.html', 'DescriptiveWindowName', 'resizable,scrollbars,status');
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
					$('a[data-target="#r_zapier_modal"]').removeAttr('data-target data-toggle').attr("id","footer-li-zapier");
					$( "#footer-li-zapier" ).trigger( "click" );
                } else {
                    flashMesssage('danger', i18next.t('Authentication failed'));
                }
            });
        }
    });
})();
