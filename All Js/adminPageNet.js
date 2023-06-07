
// main url
const location = 'localhost';
const url = `http://localhost/All%20Projects/FilmIaneMovies.com/All%20Apis/`;



let moviesData = [];
let sliderData = [];

fetch(url + 'getMainContent.php')
    .then((response) => {
        return response.json();
    })
    .then((responseData) => {

        if (responseData.status == 1) {
            moviesData.push.apply(moviesData, responseData.data);
        }
    });


// featch slider data from server
fetch(url + 'getSliderData.php')
.then((response) =>{
    return response.json();
})
.then((responseData) =>{

    if(responseData.status == 1){
        sliderData.push.apply(sliderData, responseData.data);
    }
})

export { moviesData, sliderData };
