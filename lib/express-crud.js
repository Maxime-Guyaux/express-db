var JSONSelect = require('JSONSelect');

function query(sel, store) {
    return JSONSelect.match(sel, store.get());
}

module.exports = {
    _store: null,
    init: function(store) {
        this._store = store;
        return this;
    },
    find: function(sel) {
        return query(sel, this._store);
    },
    findOne: function() {}
};