(function() {
    var $dc = $(document);
    var session_storage_apps = JSON.parse(sessionStorage.getItem("apps"));
    $dc.ready(function() {
        $('body').append('<div class="modal fade" id="r_amazon_echo_modal" tabindex="-1" role="dialog" aria-labelledby="loginAmazonEchoModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-amazon-echo-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + session_storage_apps.r_amazon_echo.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Amazon Echo App') + '</h4><div><span class="text-muted">v' + session_storage_apps.r_amazon_echo.version + '</span> By <a target="_blank" href="' + session_storage_apps.r_amazon_echo.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-partner-v0.1.1' + '" title="author">' + session_storage_apps.r_amazon_echo.author + '</a></div></div></div></div><div class="modal-body import-block"><span>' + i18next.t('Access your Restyaboard notifications through Amazon Echo. Note that this is a paid integration. Contact us to get a quote') + '.</span></div><div class="modal-footer"><a id="" href="http://restya.com/contact" target="_blank" title="' + i18next.t('Contact Us') + '" class="btn btn-primary">' + i18next.t('Contact Us') + '</a></div></div></div></div>');
    });
	 $dc.on('click', '#js-hide-card-id-button', function(event) {
		$('#r_amazon_echo_modal').modal('hide');
		return false;
	});
})();
