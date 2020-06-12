(function() {
    var $dc = $(document);

    $dc.ready(function() {
        $('body').bind('appPopupAction', insertAppAction);
    });

    function insertAppAction(e) {
        if ($('#r_codenames_modal').find('.modal-footer').length > 0 && $('#r_codenames_modal .modal-body').find('#js-code-template').length === 0) {
            $('#r_codenames_modal .modal-body').append('<div id="js-code-template"><p>Buy or Listen <a class="text-primary" title="' + i18next.t('Quobuz') + '" href="https://restya.com/board/codenames?v=v0.6.9&s=qobuz" target="_blank">' + i18next.t('Quobuz') + '</a> , <a class="text-primary" title="' + i18next.t('Apple Music') + '" href="https://restya.com/board/codenames?v=v0.6.9&s=apple-music" target="_blank">Apple Music</a> , <a class="text-primary" title="' + i18next.t('Google Play Music') + '" href="https://restya.com/board/codenames?v=v0.6.9&s=google-play-music" target="_blank">Google Play Music</a> , <a class="text-primary" title="' + i18next.t('JioSaavn') + '" href="https://restya.com/board/codenames?v=v0.6.9&s=jiosaavn" target="_blank">' + i18next.t('JioSaavn') + '</a> , <a class="text-primary" title="' + i18next.t('YouTube') + '" href="https://restya.com/board/codenames?v=v0.6.9&s=youtube" target="_blank">' + i18next.t('YouTube') + '</a></p></div>');
        }
    }

    addRequestCallback(function(xhr, arg) {
        if (arg && arg[0] && arg[0].indexOf('codename_template') > -1) {
            var arr = JSON.parse(arg[0]);
            arr.background_picture_url = '//farm8.static.flickr.com/7102/6928270062_0eca00e542_b.jpg';
            arr.music_name = 'Stereopony - Hitohira No Hanabira';
            arr.music_content = 'X:1\nT:Hitohira No Hanabira\nT:Bleach (Ending 17)\nT:Stereopony\nT:J A Y A\'\s arrangement for viola\n%%scale 0.83\n%%pagewidth 21.00cm\n%%leftmargin 1.00cm\n%%rightmargin 1.00cm\nL:1/8\nQ:1/4=140\nM:4/4\nI:linebreak $\nK:F#\nV:1 alto nm="Viola" snm="Viola\n"\nV:1\n"^Allegro" z4 d4 | GAGF D2 GA | GF D2 GAGF | C2 C C2 CGG- | GFA G2 A3 | GAGF D2 GA |$ GF D2 GAGG | %7\nG2 GG GGGG- | GF F4 z2 | DCDF GFGA | cAGF GFDC | G8 |$ A8 | D>DDD C D2 C | D2 C D2 DDD | %15\nz C2 C CCCC | A,A,CC DD F2 |$ DD/C/DD/C/ DDDC | DDC D2 DDD | z CCC CCCC | A,A,CC DD F2 |$ %21\nG2 z G GG F2 | D2 z2 D2 F2 | GGGG GGFG | AG F2 D2 F2 | GGGG G2 F2 | D2 z D D2 FF- |$ F4 z2 z F | %28\nF2 D2 F2 A2 | G8 | C8 | GAGF D2 GA | GF D2 GAGF | C2 C C2 CGG- |$ GFA G2 A3 | GAGF D2 GA | %36\nGF D2 GAAA | G2 GG GGGG | GF F4 z2 |$ GAGF D2 GA | GFDD A A2 A | GGGG GGGG | GF A4 z2 | %43\nGAGF D2 GA |$ GFDD AAAA | GGGG GGGG- | GF F4 z2 | C3 D z C z D | z C z D z F3 |$ dd z d z c z d- | %50\nd8 |] %51';
            arg[0] = JSON.stringify(arr);
        }
    });
})();
