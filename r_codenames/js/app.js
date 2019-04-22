(function() {
    var $dc = $(document);

    $dc.ready(function() {
        $('body').bind('appPopupAction', insertAppAction);
    });

    function insertAppAction(e) {
        if ($('#r_codenames_modal').find('.modal-footer').length > 0 && $('#r_codenames_modal .modal-body').find('#js-code-template').length === 0) {
            $('#r_codenames_modal .modal-body').append('<div id="js-code-template"><p>Buy or Listen <a class="text-primary" title="' + i18next.t('Quobuz') + '" href="https://restya.com/board/codenames?v=v0.6.7&s=qobuz" target="_blank">' + i18next.t('Quobuz') + '</a> , <a class="text-primary" title="' + i18next.t('Apple Music') + '" href="https://restya.com/board/codenames?v=v0.6.7&s=apple-music" target="_blank">Apple Music</a> , <a class="text-primary" title="' + i18next.t('Google Play Music') + '" href="https://restya.com/board/codenames?v=v0.6.7&s=google-play-music" target="_blank">Google Play Music</a> , <a class="text-primary" title="' + i18next.t('JioSaavn') + '" href="https://restya.com/board/codenames?v=v0.6.7&s=jiosaavn" target="_blank">' + i18next.t('JioSaavn') + '</a> , <a class="text-primary" title="' + i18next.t('Youtube') + '" href="https://restya.com/board/codenames?v=v0.6.7&s=youtube" target="_blank">' + i18next.t('Youtube') + '</a></p></div>');
        }
    }

    addRequestCallback(function(xhr, arg) {
        if (arg && arg[0] && arg[0].indexOf('codename_template') > -1) {
            var arr = JSON.parse(arg[0]);
            arr.background_picture_url = '//farm5.static.flickr.com/4441/37080417010_b34ddcf90d_b.jpg';
            arr.music_name = 'Boney M - Rasputin';
            arr.music_content = 'X: 1\nT: Boney M - Rasputin\nZ: Restya\nM: 4/4\nQ: 122\nK: C maj\nB,3/4 z// B,/ z/ B,/ z/ A,3/4 z// A,/ z/ A,/ z/ A,/ z/ A,/ z/ |\nG,/ z/ G,/ z/ G,/ z/ ^F,/ z/ F,/ z/ F,/ z/ F,/ z/ F,/ z/ |\nB,3/4 z// B,/ z/ B,/ z/ A,/ z/ A,/ z/ \nA,/ z/ A,/ z/ A,/ z/ |\nG,/ z/ G,/ z/ G,/ z/ ^F,/ z/ F,/ z/ F,/ z/ F,/ z/ F,/ z/ |\n[B,/b/-] b/ B, b3/4 z// B,// z3/4 [B,//b//-] b// ^c/ [B,/-d/] [B,/-e/]\n[B,//^f//-] f// z/ [^F,/-b/] [F,//a//] z// |\n[B,/b/] z/ [B,//-a//] B,3/4- [B,//b//] z3/4 [^F,3/4-^f3/4] F,//- F,3/4\nz// [F,/-e/] F,/- [F,/-f/] F,/ A, |\n[B,//b//-] b3/4 B, b B,// z3/4 [B,/b/] ^c/ [B,/-d/] [B,/-e/]\n[B,//^f//-] f// z/ [B,//b//-] b// a// z// |\n[B,//-b//] B,// z/ [B,//-a//] B,3/4- [B,//-b//] B,/ z// [^F,-^f] F,3/4\nz// [F,//-e//] F,3/4- F, A, |\n[B,//b//-] b3/4- [B,//-b//] B,3/4- [B,//^f//-] f3/4 B,// z3/4\n[B,//f//-] f3/4- [B,-f] B,/ z/ [B,//f//-] f3/4 |\n[B,//g//-] g3/4 [B,-a] [B,//g//-] g3/4 [B,//^f//-] f3/4 [B,//f//-]\nf3/4 B, [^C,^c] [D,d] |\n[E,/e/-] e/ E,- [E,//e//-] e3/4 E,// z3/4 [E,/e/-] e/ E,- [E,//^c//-]\nc3/4 [E,/d/-] d/ |\n[^F,//e//-] e// z/ [F,3/4e3/4-] e// [F,d] [A,3/4^c3/4-] c// [B,/b/-]\nb/- [B,-b] B,// z3/4 B,// z3/4 |\n[B,//b//-] b3/4- [B,//-b//] B,3/4- [B,//^f//-] f3/4 B,// z3/4\n[B,//f//-] f3/4- [B,-f] B,// z3/4 [B,//f//-] f3/4 |\n[B,//g//-] g3/4 [B,-a] [B,//g//-] g3/4 [B,//^f//-] f3/4 [B,//f//-]\nf3/4 B, [^C,3/4^c3/4-] c// [D,3/4d3/4-] d// |\n[E,/e/-] e/ E,- [E,/e/-] e/ E,/ z/ [E,//e//-] e3/4 E,- [E,//^c//-] c3/4 [E,d] |\n[^F,/e/] z/ [F,3/4e3/4-] e// [F,d] [A,3/4^c3/4-] c// [B,/b/-] b/ B,-\n+ff+ [B,//b//-] b3/4 +fff+ B,// z3/4 |\nB,// z3/4 B,- B,// z3/4 B,// z3/4 B,// z3/4 B,3/2 z/ B,// z3/4 |\nB,// z3/4 B,- B,// z3/4 B,// z3/4 B,// z3/4 B, ^C, D, |';
            arg[0] = JSON.stringify(arr);
        }
    });
})();
