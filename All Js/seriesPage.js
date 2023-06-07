
import { mainData } from "./seriesPageNet";
let movies = mainData;
const location = '192.168.1.4';
const defUrl = `http://localhost/All%20Projects/FilmIaneMovies.com/`;

// top header and navigation code start
let mainPoster = document.getElementById('main-big-img');
let search = document.getElementById('search');
let search_icon = document.getElementById('search_icon');
const mainLogo = document.querySelector('[data-main-logo]')
const navOpenBtn = document.querySelector('[data-menu-open-btn]');
const navCloseBtn = document.querySelector('[data-menu-close-btn]');
const navbar = document.querySelector('[data-navbar]');
const navbar2 = document.querySelector('[data-main-nav]');
const header = document.querySelector('[data-main-header]');
const overlay = document.querySelector('[data-overlay]');
const movie_detial_sec = document.querySelector('[data-movie-detail-section]');
const video_box = document.querySelector('[data-video-box]');
const poster_box = document.querySelector('[data-poster-box]');
const video_player = document.querySelector('#video-id');
const videoPlayerSecondB = document.getElementsByClassName('btns2')[0];
const search_bx2 = document.querySelector('.search_bx2');
const search_input = document.getElementById('search');
const bigPosterImg = document.getElementById('poster-img');
const noInternetCard = document.querySelector('.no-Internect-cards');
const noInternetSlider = document.querySelector('.no-Internet-slider');
const noInternetSeriesEp = document.querySelector('.seriesNoInternet');
let left_scroll = document.querySelectorAll('[data-left-scroll]');
let right_scroll = document.querySelectorAll('[data-right-scroll]');
let scrolling_section = document.querySelector('[data-scrolling-section]');
const seriesEpisodesSection = document.querySelector('#series-episodes-section');
const movieCategoris = Array.from(document.getElementsByClassName('movie-categoris'));
const movieTitle = document.getElementById('movie-title');
const movieDesc = document.getElementById('movie-description');
const movieDownloadBtn = document.getElementById('dowload-btn');
const allScrollingSection = Array.from(document.querySelectorAll('[data-other-section]'));
let contentEpisodes = [];
let isSearchBarOpen = false;
let isNavOpen = false;
var specificMovie = '';
let gen1 = 'none';
let gen2 = 'none';
let gen3 = 'none';
let movieId = ''
const data = {
    id: 0
};


window.addEventListener('scroll', () => {
    if (window.scrollY == 0) {
        header.style.backgroundColor = `rgb(17, 16, 16)`
        header.style.height = '65px';
    }
    else {
        header.style.backgroundColor = `rgb(18, 18, 18)`
        header.style.height = '60px';
    }
})


setTimeout(function () {

    getDataFromUrl();
    addDataInBanner();

    noInternetCard.classList.add('active');
    noInternetSlider.classList.add('active');
    noInternetSeriesEp.classList.add('active')
    videoPlayerSecondB.classList.add('active');
    mainPoster.classList.add('active');


    moreLikeThis();
}, 3000);


// Get Data from url 
function getDataFromUrl() {

    const queryParams = new URLSearchParams(window.location.search);
    movieId = queryParams.get('id');

    specificMovie = movies.filter((element) => {
        return element.id == movieId;
    })

    specificMovie = specificMovie[0];
    document.title = specificMovie.title + " - Cinemateca";

    var formdata = new FormData();
    formdata.append("contentTableN", specificMovie.episodesTable);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch(defUrl + "All%20apis/getSeriesContent.php", requestOptions)
        .then(response => response.text())
        .then((result) => {

            let mainResult = JSON.parse(result);
            contentEpisodes.push(mainResult);

            contentEpisodes = contentEpisodes[0];


            video_player.src = contentEpisodes[contentEpisodes.length - 1].EPUrl;
            movieTitle.innerText = contentEpisodes[contentEpisodes.length - 1].EPTitle;
            movieDesc.innerText = contentEpisodes[contentEpisodes.length - 1].EPDescri;
            insertEpisodesInSlider();
        })
        .catch(error => console.log('error', error));
}

// add data in big banner
function addDataInBanner() {

    const { genre1, genre2, genre3, genre4, genre5, genre6, genre7, genre8, genre9, genre10, genre11, genre12, genre13, genre14, genre15 } = specificMovie;
    gen1 = genre1 != 'none' ? genre1 : genre2 != 'none' ? genre2 : genre3 != 'none' ? genre3 : genre4 != 'none' ? genre4 : genre5 != 'none' ? genre5 : genre6 != 'none' ? genre6 :
        genre7 != 'none' ? genre7 : genre8 != 'none' ? genre8 : genre9 != 'none' ? genre9 : genre10 != 'none' ? genre10 : genre11 != 'none' ? genre11 : genre12 != 'none' ? genre12 :
            genre13 != 'none' ? genre13 : genre14 != 'none' ? genre14 : genre15 != 'none' ? genre15 : 'superHit';

    gen2 = (genre1 != 'none' && gen1 != genre1) ? genre1 : (genre2 != 'none' && gen1 != genre2) ? genre2 : (genre3 != 'none' && gen1 != genre3) ? genre3 : (genre4 != 'none' && gen1 != genre4) ? genre4 : (genre5 != 'none' && gen1 != genre5) ? genre5 : (genre6 != 'none' && gen1 != genre6) ? genre6 :
        (genre7 != 'none' && gen1 != genre7) ? genre7 : (genre8 != 'none' && gen1 != genre8) ? genre8 : (genre9 != 'none' && gen1 != genre9) ? genre9 : (genre10 != 'none' && gen1 != genre10) ? genre10 : (genre11 != 'none' && gen1 != genre11) ? genre11 : (genre12 != 'none' && gen1 != genre12) ? genre12 :
            (genre13 != 'none' && gen1 != genre13) ? genre13 : (genre14 != 'none' && gen1 != genre14) ? genre14 : (genre15 != 'none' && gen1 != genre15) ? genre15 : 'blockBuster';

    gen3 = (genre1 != 'none' && gen1 != genre1 && gen2 != genre1) ? genre1 : (genre2 != 'none' && gen1 != genre2 && gen2 != genre2) ? genre2 : (genre3 != 'none' && gen1 != genre3 && gen2 != genre3) ? genre3 : (genre4 != 'none' && gen1 != genre4 && gen2 != genre4) ? genre4 : (genre5 != 'none' && gen1 != genre5 && gen2 != genre5) ? genre5 : (genre6 != 'none' && gen1 != genre6 && gen2 != genre6) ? genre6 :
        (genre7 != 'none' && gen1 != genre7 && gen2 != genre7) ? genre7 : (genre8 != 'none' && gen1 != genre8 && gen2 != genre8) ? genre8 : (genre9 != 'none' && gen1 != genre8 && gen2 != genre8) ? genre9 : (genre10 != 'none' && gen1 != genre10 && gen2 != genre10) ? genre10 : (genre11 != 'none' && gen1 != genre11 && gen2 != genre11) ? genre11 : (genre12 != 'none' && gen1 != genre12 && gen2 != genre12) ? genre12 :
            (genre13 != 'none' && gen1 != genre13 && gen2 != genre13) ? genre13 : (genre14 != 'none' && gen1 != genre14 && gen2 != genre14) ? genre14 : (genre15 != 'none' && gen1 != genre15 && gen2 != genre15) ? genre15 : 'hit';


    let content = document.createElement('div');
    content.classList.add('movie-content');
    content.innerHTML = ` 
    
    <span id="movie-id" style="display: none;">${specificMovie.id}</span>
<h6>Certificate: <span id="header_dur">${specificMovie.movieAgeRestriction}</span></h6>
<h3 id="header_gen"><i class="fas fa-star"></i>6.5
    <span>${gen1} / ${gen2} / ${gen3}</span>
</h3>
<h1 id="header_title">${specificMovie.title}</h1>
<p id="header_pra">${specificMovie.description}</p>
<div class="btns">
    <a data-watch-movie-btn href="#"><button><i class="fas fa-play"></i> WATCH</button></a>
    <a onclick="addMovieInList('#movie-id')" href="#"><button><i class="fas fa-plus"></i> ADD LIST</button></a>
</div>`;
    poster_box.appendChild(content);
    bigPosterImg.src = `${specificMovie.down_img}`

    watchBtnClick();


    movieCategoris[0].innerHTML = `${gen1} <span></span>`;
    movieCategoris[1].innerHTML = `${gen2} <span></span>`;
    movieCategoris[2].innerHTML = `${specificMovie.year} <span></span>`;
    movieCategoris[3].innerHTML = `${specificMovie.movieAgeRestriction}`;
    movieDownloadBtn.href = specificMovie.downloadWebsiteUrl;

}

// insert episodes
function insertEpisodesInSlider() {

    seriesEpisodesSection.innerHTML = '';

    seriesEpisodesSection.innerHTML = `
    
    <h1 id="section-heading">Episodes</h1>
        <main class="seasons">
            <div class="season-content">
               
        </div>
    </main>
`
    const dataSection = document.querySelector('.season-content');

    contentEpisodes.forEach((elem) => {
        const { EPid, EPTitle, EPDescri, EPImg, EPDura, EPDate, EPNo } = elem;

        const data = {
            id: EPid,
            series: specificMovie.episodesTable
        }

        const queryString = new URLSearchParams(data).toString();
        const url = defUrl + `episodes.html?${queryString}`


        const a = document.createElement('a');
        a.classList.add('ep-card');
        a.href = url;
        a.innerHTML = `

            <div class="ep-card-left">
                <div class="ep-card-poster">
                    <img src="${EPImg}"
                        alt="">
                    <i class="fas fa-play"></i>
                    <div class="ep-card-bottom-gradiant"></div>
                </div>
            </div>

            <div class="ep-card-right">
                <h1 class="ep-card-title">${EPTitle}</h1>
                <div class="ep-card-extra">
                    <ul>
                        <li>${EPNo}<span></span></li>
                        <li>${EPDate}<span></span></li>
                        <li>${EPDura}</li>
                    </ul>
                </div>

                <p class="ep-card-des">${EPDescri}</p>
                <span id="movie-id" style="display: none;">${EPid}</span>
            </div>`

        dataSection.appendChild(a);

    })
}

// more like this function code
function moreLikeThis() {

    let moreLikeThis = movies.filter((e) => {
        return (((e.genre1 == gen1 || e.genre1 == gen2 || e.genre1 == gen3) ||
            (e.genre2 == gen1 || e.genre2 == gen2 || e.genre2 == gen3) ||
            (e.genre3 == gen1 || e.genre3 == gen2 || e.genre3 == gen3) ||
            (e.genre4 == gen1 || e.genre4 == gen2 || e.genre4 == gen3) ||
            (e.genre5 == gen1 || e.genre5 == gen2 || e.genre5 == gen3) ||
            (e.genre6 == gen1 || e.genre6 == gen2 || e.genre6 == gen3) ||
            (e.genre7 == gen1 || e.genre7 == gen2 || e.genre7 == gen3) ||
            (e.genre8 == gen1 || e.genre8 == gen2 || e.genre8 == gen3) ||
            (e.genre9 == gen1 || e.genre9 == gen2 || e.genre9 == gen3) ||
            (e.genre10 == gen1 || e.genre10 == gen2 || e.genre10 == gen3) ||
            (e.genre11 == gen1 || e.genre11 == gen2 || e.genre11 == gen3) ||
            (e.genre12 == gen1 || e.genre12 == gen2 || e.genre12 == gen3) ||
            (e.genre13 == gen1 || e.genre13 == gen2 || e.genre13 == gen3) ||
            (e.genre14 == gen1 || e.genre14 == gen2 || e.genre14 == gen3) ||
            (e.genre15 == gen1 || e.genre15 == gen2 || e.genre15 == gen3)) &&
            (e.contentType === 'series' || e.contentType === 'tv shows') && (e.id != movieId));
    });


    if (moreLikeThis.length <= 0) {

        let p = document.createElement('p');
        p.classList.add('noDataMass');
        p.innerText = 'No Data Avilable';
        scrolling_section.appendChild(p);
        scrolling_section.classList.add('sectionNoData');
        return;
    }
    else {
        scrolling_section.classList.remove('sectionNoData');
    }

    moreLikeThis.forEach(element => {
        const { img, title, year, rate, id } = element;

        data.id = id;
        const queryString = new URLSearchParams(data).toString();
        const url = defUrl + `series.html?${queryString}`;

        let card = document.createElement('a');
        card.classList.add('card-link');
        card.href = url;
        card.innerHTML = `
        <div class="card2">
            <img src="${img}" alt="">
            <div class="card2-contain">
                <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                <h6 class="time-line"><span id="time">6 </span><span>hour</span></h6>
                <h5>
                    <i class="fas fa-play"></i>
                    <span class="main-title">${title}</span>
                </h5>
                <h5 class="year">${year}</h5>
            </div>
        </div>  
    `

        scrolling_section.appendChild(card);
    })
}


// top header and navigation code start
{
    search_icon.addEventListener('click', () => {

        search.classList.toggle('search_input');
        mainLogo.classList.add('active');
        navbar2.classList.add('navActive2');

        if (!isSearchBarOpen) {
            setTimeout(function () {
                navOpenBtn.classList.add('active');
            }, 1100);
            isSearchBarOpen = true;
        }
        else {
            setTimeout(function () {
                mainLogo.classList.remove('active');
                navbar2.classList.remove('navActive2');
                navOpenBtn.classList.remove('active');
                search_input.value = ''
                search_bx2.style.visibility = "hidden";
                search_bx2.style.opacity = 0;
            }, 1100);
            isSearchBarOpen = false;
        }
    })

    const navElemArr = [navOpenBtn, navCloseBtn, overlay];

    for (let i = 0; i < navElemArr.length; i++) {

        navElemArr[i].addEventListener('click', () => {

            allScrollingSection.forEach((elem) => {
                elem.classList.toggle('otherSectionActive')
            })

            if (isNavOpen) {
                navbar.classList.remove('navActive');
                isNavOpen = false;

                setTimeout(function () {
                    navbar2.classList.add('active');
                }, 300);
            }
            else {
                isNavOpen = true;
                navbar.classList.add('navActive')
                navbar2.classList.remove('active');
            }


            document.body.classList.toggle('active');
            overlay.classList.toggle('active');
        })
    }


    // searchBar code start
    window.addEventListener('load', () => {
        movies.forEach(element => {
            const { img, title, year, id, contentType } = element;

            data.id = id;
            const queryString = new URLSearchParams(data).toString();

            let url = defUrl;

            if (contentType == 'movie' || contentType == 'trialer') {
                url += `movies.html?${queryString}`;
            }
            else {
                url += `series.html?${queryString}`;
            }
            
            let card = document.createElement('a');
            card.href = url;
            card.innerHTML = ` <img src="${img}" alt="">
        <div class="content2">
            <h6>${title}</h6>
            <p>${year}</p>
        </div>`;
            search_bx2.appendChild(card);
        });
    });

    search_input.addEventListener('keyup', () => {

        let filter = search_input.value.toUpperCase();
        let a = search_bx2.getElementsByTagName('a');
        for (let i = 0; i < a.length; i++) {
            let b = a[i].getElementsByClassName('content2')[0];
            let c = b.getElementsByTagName('h6')[0];

            let TextValue = c.textContent || c.innerText;
            if (TextValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = '';
                search_bx2.style.visibility = "visible";
                search_bx2.style.opacity = 1;
            } else {
                a[i].style.display = 'none';
            }
            if (search_input.value == 0 || !isSearchBarOpen) {
                search_bx2.style.visibility = "hidden";
                search_bx2.style.opacity = 0;
            }
        }
    })
}


// watch btn code start
function watchBtnClick() {

    const watchBtn = Array.from(document.querySelectorAll('[data-watch-movie-btn]'));
    watchBtn.forEach((value) => {

        value.addEventListener('click', () => {
            movie_detial_sec.style.display = 'block';
            poster_box.style.display = 'none';
            video_box.style.display = 'flex';
            video_player.play();
        })
    })
}


// all scroller code start
{

    for (let i = 0; i < scrolling_section.length; i++) {

        left_scroll.addEventListener('click', () => {
            scrolling_section.scrollLeft -= 500;
        })
        right_scroll.addEventListener('click', () => {
            scrolling_section.scrollLeft += 500;
        })
    }
}
