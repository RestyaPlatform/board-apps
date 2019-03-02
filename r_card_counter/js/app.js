(function() {
    var $dc = $(document);

    $dc.ready(function() {
        $('body').bind('cardCounterRendered', renderCardNumbers);

        function renderCardNumbers(e, list_id, lists) {
            if (!_.isUndefined(lists) && !_.isEmpty(lists)) {
                var element = $('#list-card-number-' + list_id);
                if (!_.isUndefined(lists.collection) && !_.isUndefined(lists.collection.board.cards)) {
                    var filteredElements = lists.collection.board.cards.filter(function(card) {
                        return card.get('is_archived') !== 1 && card.get('list_id') === parseInt(lists.attributes.id) && card.get('is_filtered') === false;
                    });
                    var counter_html = '(' + filteredElements.length + ')';
                    element.html(counter_html);
                }
            }
        }
    });
})();
