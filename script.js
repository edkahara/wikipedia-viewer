$(document).ready(function() {
  //autocomplete search
  $("#searchThis").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        data: {
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function(data) {
          response(data[1]);
        }
      });
    }
  });

  //on keyup of the Enter key, trigger the submit button
  $('#searchThis').on('keyup', function(event) {
    if (event.keyCode === 13) {
      $('#submitButton').click();
    }
  });

  //show searh results
  function printResults(data) {
    $('#searchResults').append('<li data-id = "' + data[2] + '"><a href = "' + data[2] + '" target = "_blank"><strong>' + data[0] + '</strong></a><br/><span style = "color: green">' + data[2] + '</span><br/><strong>' + data[1] + '</strong></li>');
  }

  //on click, display search results
  $('#clickToSearch').on('click', function() {
    $(this).hide();
    $('#randomSearch').hide();
    $('#searchInstructions').hide();
    $('#searchRandomly').hide();
    $('#searchHere').removeClass('hidden');
    $('#newRandomSearch').removeClass('hidden');
  });

  //on click, display random result
  $('#randomSearch').on('click', function() {
    $(this).hide();
    $('#clickToSearch').hide();
    $('#searchInstructions').hide();
    $('#searchRandomly').hide();
    $('#searchHere').removeClass('hidden');
    $('#newRandomSearch').removeClass('hidden');
  });

  //on click, get a random article
  $('#randomSearch').on('click', getRandomArticle);
  $('#newRandomSearch').on('click', getRandomArticle);

  //get a random article
  function getRandomArticle() {
    var url = "https://en.wikipedia.org/wiki/Special:Random";
    window.open(url);
  }

  //on click, get the search results
  $('#submitButton').on('click', getSearchResults);

  //get the top 10 search results
  function getSearchResults() {
    var webURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
    var whatToSearch = $('#searchThis').val();
    var limits = "&limit=10&format=json";
    url = webURL + whatToSearch + limits;

    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'jsonp',
      success: sortResults,
      error: showError
    });

    //sort the raw search results data
    function sortResults(data) {
      var newArr = [];
      var arrItem = [];
      for (var i = 0; i < data[1].length; i++) {
        arrItem = [data[1][i], data[2][i], data[3][i]];
        newArr.push(arrItem);
      }
      $('#searchResults').empty();
      $.each(newArr, function(index, item) {
        printResults(newArr[index]);

      });
    }

    //show an error message if the search results cannot be displayed
    function showError() {
      alert("Cannot display search results");
    }
  }
});
