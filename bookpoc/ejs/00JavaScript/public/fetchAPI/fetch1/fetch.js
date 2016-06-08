window.addEvent('domready', function() {
    loadBooks();
});

    /*  In this simple example, we first fetch the resource which returns a promise.
        Then we call response.json() which also returns a promise.
     */
    function loadBooks() {
        var display = document.getElementById('display');
        display.innerHTML = '<ul>';
        fetch('https://be4a3fd23f7fba1db71ef587490d3a2f-mysql.codepicnic.com/api/books/').then( function(response) {
            return response.json();
        }).then(function(data) {
            data.forEach(function(row){
              display.innerHTML += '<li>' + row.title + ' - ' + row.author + '</li>';
            });
            display.innerHTML += '</ul>';
        });
    }
