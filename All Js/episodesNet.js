
// main url
const url = `http://localhost/All%20Projects/FilmIaneMovies.com/All%20Apis/`;

let mainData = [];
let contentEpisodes = [];


// featch main data from server
fetch(url + 'getMainContent.php')
    .then((response) => {
        return response.json();
    }).then((responseData) => {

        if (responseData.status == 1) {
            mainData.push.apply(mainData, responseData.data);
        }
    });



// get specific series episodes 
const queryParams = new URLSearchParams(window.location.search);

var formdata = new FormData();
formdata.append("contentTableN", queryParams.get('series'));

var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
};

fetch(url + "getSeriesContent.php", requestOptions)
    .then((response) =>{return response.text()})
    .then((result) => {

        let mainResult = JSON.parse(result);
        contentEpisodes.push(mainResult);
        contentEpisodes = contentEpisodes[0];
    })
    .catch(error => console.log('error', error));


export { mainData, contentEpisodes };
