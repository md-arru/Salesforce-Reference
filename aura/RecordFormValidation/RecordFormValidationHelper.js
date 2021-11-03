({
    remove: function (cmp, row) {
        var rows = cmp.get('v.data');
        // console.log(rows);
        var rowIndex = rows.indexOf(row);
        // console.log(rowIndex);

        rows.splice(rowIndex, 1);
        cmp.set('v.data', rows);
    }
})