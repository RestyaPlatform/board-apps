(function() {
    var $dc = $(document);
    var local_storage_apps = JSON.parse(localStorage.getItem("apps"));
    $dc.ready(function() {
        $('body').append('<div class="modal fade" id="r_website_qa_checklist_modal" tabindex="-1" role="dialog" aria-labelledby="loginWebsiteQAChecklistModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" id="js-website-qa-checklist-close">×</span><span class="sr-only">Close</span></button><div class="media list-group-item-heading"><div class="pull-left"><img class="img-circle" width="36" height="36" src="' + local_storage_apps.r_website_qa_checklist.icon + '" /></div><div class="media-body"><h4 class="modal-title" id="exampleModalLabel">' + i18next.t('Website QA Checklist') + '</h4><div><span class="text-muted">v' + local_storage_apps.r_website_qa_checklist.version + '</span> By <a target="_blank" href="' + local_storage_apps.r_website_qa_checklist.author_url + '?utm_source=restyaboard&utm_medium=apppopup&utm_campaign=rb-app-website-qa-checklist-v0.1.1' + '" title="author">' + local_storage_apps.r_website_qa_checklist.author + '</a></div></div></div></div><div class="modal-body import-block"><span>' + i18next.t('This app creates a new board and imports readymade QA checklist of best practices for any new website') + '.</span></div><div class="modal-footer"><a href="" id="js-websiteQAChecklist-btn" title="' + i18next.t('Import Template') + '" class="btn btn-primary">' + i18next.t('Import Template') + '</a></div></div></div></div>');
    });
    $dc.on('click', '#js-websiteQAChecklist-btn', function(event) {
        $('#r_website_qa_checklist_modal').modal('hide');
        event.preventDefault();
        $.getJSON("apps/r_website_qa_checklist/json/app.json", function(data) {
            var formData = new FormData();
            formData.append('board_import', new File([new Blob([JSON.stringify(data)])], 'app.json'));
            $.ajax({
                url: api_url + 'boards.json?token=' + getToken(),
                type: 'POST',
                data: formData,
                processData: false,
                cache: false,
                contentType: false,
                error: function(e, s) {
                    flashMesssage('danger', i18next.t('Website QA Checklists Board create failed'));
                },
                success: function(response) {
                    if (window.location.hash.substr(1) === '/boards') {
                        location.reload();
                    } else {
                        window.location = '#/boards';
                    }
                    flashMesssage('success', i18next.t('Website QA Checklists Board created'));
                }
            });
        });
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
        if ($.cookie('auth') !== undefined) {
            var Auth = JSON.parse($.cookie('auth'));
            api_token = Auth.access_token;
            return api_token;
        } else {
            return false;
        }
    }

})();
