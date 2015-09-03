
//compile with:
//../../node_modules/browserify/bin/cmd.js main.js -o bundle.js

var level = require('level-js');
var si = require('search-index')({
  indexPath:'reutersindex',
  db: level
});
var dataset = require('./node_modules/reuters-21578-json/data/justTen/justTen.json');


si.add(dataset, {'batchName': 'reuters'}, function(err) {
  if (!err) console.log('indexed!');
});


document.getElementById('query').addEventListener('keyup', function() {
  var query = {
    "query": {
      "*": this.value.split(' ')
    }
  };
  si.search(query, function(err, results) {
    var resultHTML = '<b>total hits: </b>' + results.totalHits+ '<p>';
    for (var i = 0; i < results.hits.length; i++)
      resultHTML += '<div>' + JSON.stringify(results.hits[i]) + '</div><hr>';
    document.getElementById('results').innerHTML = resultHTML;
  });
});

