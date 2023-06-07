
// main url
const location = '192.168.1.4';
const url = `http://localhost/All%20Projects/FilmIaneMovies.com/All%20Apis/`;

let mainData = [];


// featch main data from server
fetch(url + 'getMainContent.php')
    .then((response) => {
        return response.json();
    }).then((responseData) => {

        if (responseData.status == 1) {
            mainData.push.apply(mainData, responseData.data);
        }
    });

export { mainData };
