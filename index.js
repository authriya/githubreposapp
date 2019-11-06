'use strict';

const searchUrl="https://api.github.com/users"

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#search-username').val();
      getRepos(searchTerm);
    });
  };

 function getRepos(query) {
    const url =`${searchUrl}/${query}/repos`;
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
        }
            throw new Error(response.statusText);
      })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
      } );
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.repos-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('.repos-list').append(
            `<li><h2>${responseJson[i].name}</h2></li>
            <li><ul><li>Link: ${responseJson[i].html_url}</li></ul></li>`
    )};
    $('.search-results').removeClass('hidden');
    }

  $(watchForm())