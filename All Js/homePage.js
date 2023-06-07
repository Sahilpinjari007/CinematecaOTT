import { mainData, sliderData } from "./homePageNet";
let movies = mainData
let allBannerArr = sliderData;
const location = '192.168.1.4';
const deUrl = `http://localhost/All%20Projects/FilmIaneMovies.com/`;

const mainBodyScroller = document.getElementById('body-scroller');
const big_section = Array.from(document.querySelectorAll('[data-big-section]'));
const mainLogo = document.querySelector('[data-main-logo]')
const header = document.querySelector('[data-main-header]');
const overlay = document.querySelector('[data-overlay]');
const search = document.querySelector('[data-search-input]');
const search_icon = document.querySelector('[data-search-icon]');
const navOpenBtn = document.querySelector('[data-menu-open-btn]');
const navCloseBtn = document.querySelector('[data-menu-close-btn]');
const navbar2 = document.querySelector('[data-main-nav]');
const navbar = document.querySelector('[data-navbar]')
const navItems = Array.from(document.querySelectorAll('[data-navigation-click]'))
const headerContent = document.querySelector('.content');
const headerSecondBtns = document.querySelector('#small-screen');
const noInternetSlider = document.querySelector('.no-Internet-slider');
const watchBtn = Array.from(document.querySelectorAll('.watch-btns'));
const headerMovieId = document.getElementById('movie-id');
const header_dur = document.getElementById('header_dur')
const header_gen = document.getElementById('header_gen')
const header_title = document.getElementById('header_title')
const header_pra = document.getElementById('header_pra')
const slider_btn = document.getElementsByClassName('slider');
const categorys = Array.from(document.querySelectorAll('[data-cato-btns]'));
const bottom_section = document.getElementById('bottom-movie-section');
const massage_container = document.getElementById('bottom-movie-section');
const bollywood_section = document.getElementById('bollywood-movies');
const hollywood_section = document.getElementById('hollywood-movies');
const south_section = document.getElementById('south-movies');
const trendingBtns2 = Array.from(document.getElementsByClassName('tranding-btns2'));
const search_bx2 = document.querySelector('.search_bx2');
const internetCato = document.querySelector('[data-inter-cato]')
const noInternetCato = document.querySelector('[data-no-internet-cato]')
const noInternetCards = Array.from(document.querySelectorAll('.no-Internect-cards'))
const topSectionM = document.querySelectorAll('.diff-section');
const smallDeTi = document.querySelector('#small-s-title');
const smallDeAt = document.querySelectorAll('.small-s-a');
let playListMovies = [];
let allFilters = [];
let navA = [];
let isSearchBarOpen = false;
let isNavOpen = false;
let isPlayListSection = false;
const data = {
    id: 0
};

// nav code
mainBodyScroller.addEventListener('scroll', () => {
    if (mainBodyScroller.scrollTop == 0) {
        navbar2.style.backgroundColor = `transparent`
        navbar2.style.height = '65px';

        navA.forEach((elem) => {
            elem.style.color = 'rgb(255, 255, 255, .7)';
        })
        navA[0].style.color = 'white';
    }
    else {
        navbar2.style.backgroundColor = `rgb(18, 18, 18)`
        navbar2.style.height = '60px';
    }
})

navItems.forEach((elem) => {

    elem.addEventListener('click', () => {
        scrollToEnd('#body-scroller', elem.innerText);
    })
})

// time out code
setTimeout(function () {

    headerContent.classList.add('active');
    headerSecondBtns.classList.add('active');
    noInternetSlider.classList.add('active');
    noInternetCato.classList.add('no-internet-cato-active');
    internetCato.classList.remove('no-internet-cato-active');


    slider();
    onLoadBollywood();
    onLoadHollywood()
    onLoadSouth();
    topHeaderCode();


    noInternetCards.forEach((elem) => {
        elem.classList.add('active');
    });

    if (localStorage.getItem("navLocation") === null) {
        localStorage.setItem("navLocation", 'noData');
    }

    if (localStorage.getItem("navLocation") == 'noData') {
        updateSection('movies');

        navA.forEach((elem) => {
            elem.style.color = 'rgb(255, 255, 255, .7)'
        })
        navA[0].style.color = 'white';
    }

    if (localStorage.getItem("navLocation") != 'noData') {
        if (localStorage.getItem("navLocation") != 'home') {
            scrollToEnd('#body-scroller', localStorage.getItem("navLocation"));
        }
        else {
            updateSection('movies');
            document.getElementById('#body-scroller').scrollTop = 0;

            navA.forEach((elem) => {
                elem.style.color = 'rgb(255, 255, 255, .7)'
            })
            navA[0].style.color = 'white';
        }

        localStorage.setItem("navLocation", 'noData');
    }

}, 3000);

// scroll down code
let scrollToEnd = (elem, navItem) => {


    let el = document.querySelector(elem);

    if (navItem.toLowerCase() === 'home') {
        el.scrollTop = 0;
    }
    else {
        el.scrollTop = 1615;
    }

    setTimeout(function () {
        navbar2.classList.add('active');
    }, 300);

    navbar.classList.remove('navActive');
    document.body.classList.remove('active');
    overlay.classList.remove('active');
    isNavOpen = false;


    big_section.forEach((elem) => {
        elem.classList.remove('sectionActive')
    })



    for (let i = 0; i < trendingBtns2.length; i++) {

        if (trendingBtns2[i].innerText.trim().toLowerCase() == navItem.trim().toLowerCase()) {
            trendingBtns2[i].classList.add('active');
        }
        else {
            trendingBtns2[i].classList.remove('active');
        }
    }

    updateSection(navItem.trim().toLowerCase());
}


// section scrollbar button start
{

    let movie_left_scroll = Array.from(document.querySelectorAll('[data-movies-left-scroll]'));
    let movie_right_scroll = Array.from(document.querySelectorAll('[data-movies-right-scroll]'));
    let movie_sections = Array.from(document.querySelectorAll('[data-movie-section]'));


    for (let index = 0; index < movie_sections.length; index++) {
        movie_left_scroll[index].addEventListener('click', () => {
            movie_sections[index].scrollLeft -= 500;
        })
        movie_right_scroll[index].addEventListener('click', () => {
            movie_sections[index].scrollLeft += 500;
        })
    }
}
// section scrollbar button start


// bottom section scrollbar button start
function bottomButtons() {

    let movie_left_scroll = Array.from(document.querySelectorAll('[data-bottom-section-left-scroll]'));
    let movie_right_scroll = Array.from(document.querySelectorAll('[data-bottom-section-right-scroll]'));
    let movie_sections = Array.from(document.querySelectorAll('.bottom-section-scrollers'));


    for (let index = 0; index < movie_sections.length; index++) {
        movie_left_scroll[index].addEventListener('click', () => {
            movie_sections[index].scrollLeft -= 500;
        })
        movie_right_scroll[index].addEventListener('click', () => {
            movie_sections[index].scrollLeft += 500;
        })
    }
}
// bottom section scrollbar button start


// top header and navigation code start
function topHeaderCode() {

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
                search.value = ''
                search_bx2.style.visibility = "hidden";
                search_bx2.style.opacity = 0;
            }, 1100);
            isSearchBarOpen = false;
        }
    })


    const navElemArr = [navOpenBtn, navCloseBtn, overlay];

    for (let i = 0; i < navElemArr.length; i++) {

        navElemArr[i].addEventListener('click', () => {

            if (isNavOpen) {
                navbar.classList.remove('navActive');
                isNavOpen = false;

                setTimeout(function () {
                    navbar2.classList.add('active');
                }, 300);
            }
            else {

                isNavOpen = true;
                navbar.classList.add('navActive');
                navbar2.classList.remove('active');
            }


            document.body.classList.toggle('active');
            overlay.classList.toggle('active');

            big_section.forEach((elem) => {
                elem.classList.toggle('sectionActive')
            })
        })
    }



    // searchBar code start
    movies.forEach(element => {
        const { img, title, year, id, contentType } = element;

        data.id = id;
        const queryString = new URLSearchParams(data).toString();
        let url = deUrl;

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

    search.addEventListener('keyup', () => {

        let filter = search.value.toUpperCase();
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
            if (search.value == 0 || !isSearchBarOpen) {
                search_bx2.style.visibility = "hidden";
                search_bx2.style.opacity = 0;
            }
        }
    })
    // searchBar code end
}
// top header and navigation code end


// slider code are start 
let bannerIndex = 0;
const slider_load = () => {

    // header.style.background = `url("${allBannerArr[bannerIndex].sliderImg}") no-repeat center center/cover`;
    header.style.background = `url("${allBannerArr[bannerIndex].sliderImg}")`;
    headerMovieId.innerText = allBannerArr[bannerIndex].movieId;
    header_dur.innerText = allBannerArr[bannerIndex].sliderDur;
    header_gen.innerHTML = `<i class="fas fa-star"></i>${allBannerArr[bannerIndex].sliderRating}<span>${allBannerArr[bannerIndex].sliderGen}</span>`;
    header_title.innerText = allBannerArr[bannerIndex].sliderTitle;
    header_pra.innerText = allBannerArr[bannerIndex].sliderDiscription;

    let goUrl = deUrl;
    const data = {
        id: 0
    };

    let specificContent = movies.filter((elem) => {
        return elem.id == allBannerArr[bannerIndex].movieId;
    })

    data.id = allBannerArr[bannerIndex].movieId;
    const queryString = new URLSearchParams(data).toString();
    specificContent = specificContent[0];


    if (specificContent.contentType == 'movie' || specificContent.contentType == 'trailer') {
        goUrl = goUrl + `movies.html?${queryString}`
    }
    else {
        goUrl = goUrl + `series.html?${queryString}`
    }

    watchBtn.forEach((elem) => {
        elem.href = goUrl;
    })

    let genrs = allBannerArr[bannerIndex].sliderGen;
    let gen = '';

    for (let i = 0; i < genrs.length; i++) {

        if (genrs[i] != ' ' || genrs[i] != '/') {
            gen = gen + genrs[i];
        }

        if (genrs[i] == ' ') {
            smallDeAt[2].innerText = gen;
            break;
        }
    }

    smallDeTi.innerHTML = allBannerArr[bannerIndex].sliderTitle;
    smallDeAt[0].innerText = allBannerArr[bannerIndex].sliderDur;
    smallDeAt[1].innerHTML = `<i class="fas fa-star"></i> ${allBannerArr[bannerIndex].sliderRating}`;


    for (let j = 0; j < allBannerArr.length; j++) {
        slider_btn[j].style.background = "rgb(184, 184, 184, .1)";
    }

    slider_btn[bannerIndex].style.background = "#fff";
    bannerIndex++;

    if (bannerIndex == allBannerArr.length) {
        bannerIndex = 0;
    }
}

function slider() {

    let sliderContData = `<h6 class="slider"></h6>`;

    for (let sliders = 0; sliders < allBannerArr.length - 1; sliders++) {
        sliderContData += `<h6 class="slider"></h6>`;
    }
    document.getElementsByClassName('slider_btns')[0].innerHTML = sliderContData;


    slider_load();
    setInterval(slider_load, 5000);
}
// slider code are end 


// <!-- trending box1 start  -->
{
    let trendingBtns = Array.from(document.getElementsByClassName('tranding-btns'));

    trendingBtns.forEach((value) => {

        value.addEventListener('click', () => {

            if (value.innerText.trim().toLowerCase() == 'popular' || value.innerText.trim().toLowerCase() == 'prefrenes') {
                alert("Sorry this Feature is not Avilable currently");
            }
            else {

                trendingBtns.forEach((value2) => {
                    value2.classList.remove('active');
                })

                value.classList.add('active')
                updateFunction2(value.innerText.trim().toLowerCase());
            }
        })
    })
}
// <!-- trending box1 end  -->
function updateFunction2(elem) {


    switch (elem) {

        case 'recently added':
            let listMovies = decodeURIComponent(document.cookie);
            isPlayListSection = true;
            let movieIds = [];
            playListMovies = [];



            let speId = ''

            for (let i = 14; i < listMovies.length; i++) {

                if ((listMovies[i] != '[') && (listMovies[i] != ']') && (listMovies[i] != ' ')) {
                    if (listMovies[i] != ',') {
                        speId = speId + listMovies[i];
                    }
                    else {
                        movieIds.push(speId);
                        speId = '';
                    }
                }
            }

            if (listMovies != '') {
                movieIds.push(Number.parseInt(speId));
            }

            movieIds.forEach((ind) => {
                movies.forEach((elem) => {
                    if (ind == elem.id) {
                        playListMovies.push(elem);
                    }
                });
            });

            console.log(movieIds);

            onLoadBollywood();
            onLoadHollywood();
            onLoadSouth();
            updateSection('movies')
            break;

        case 'trends now':
            isPlayListSection = false;

            onLoadBollywood();
            onLoadHollywood();
            onLoadSouth();
            updateSection('movies')
            break;

        default:
            break;
    }
}


// <!-- category box start  -->
{
    categorys.forEach((value) => {

        value.addEventListener('click', () => {

            const cate = value.innerHTML;

            if (value.classList.contains('active')) {
                value.classList.remove('active');
                allFilters.splice(allFilters.indexOf(cate), 1);
            }
            else {
                value.classList.add('active');
                allFilters.push(cate);
            }

            bollywoodSectionData(allFilters);
            hollywoodSectionData(allFilters);
            southSectionData(allFilters);

            if (allFilters.length == 0) {

                onLoadBollywood();
                onLoadHollywood();
                onLoadSouth();
            }
        })
    })
}


function bollywoodSectionData(filters) {


    bollywood_section.innerHTML = '';
    let bollywood_Movies = [];
    let tempMovies = [];

    for (let ind = 0; ind < filters.length; ind++) {
        movies.forEach((e) => {
            if (
                ((e.genre1 == filters[ind]) ||
                    (e.genre2 == filters[ind]) ||
                    (e.genre3 == filters[ind]) ||
                    (e.genre4 == filters[ind]) ||
                    (e.genre5 == filters[ind]) ||
                    (e.genre6 == filters[ind]) ||
                    (e.genre7 == filters[ind]) ||
                    (e.genre8 == filters[ind]) ||
                    (e.genre9 == filters[ind]) ||
                    (e.genre10 == filters[ind]) ||
                    (e.genre11 == filters[ind]) ||
                    (e.genre12 == filters[ind]) ||
                    (e.genre13 == filters[ind]) ||
                    (e.genre14 == filters[ind]) ||
                    (e.genre15 == filters[ind])) &&
                (e.type == 'bollywood' && e.contentType == 'movie')) {

                tempMovies.push(e)
            }
        })
    }

    bollywood_Movies = tempMovies.filter((item, index) => {
        return tempMovies.indexOf(item) === index;
    })

    bollywood_Movies = bollywood_Movies.reverse();

    if (bollywood_Movies.length <= 0) {

        let p = document.createElement('p');
        p.classList.add('no-data-massage');
        p.innerText = 'No Data Avilable';
        topSectionM[0].appendChild(p);
        topSectionM[0].classList.add('active');
        return;
    }
    else {
        topSectionM[0].classList.remove('active');
    }

    bollywood_Movies.forEach(element => {
        const { img, title, year, rate, id, movieDuration } = element;

        data.id = id;
        const queryString = new URLSearchParams(data).toString();
        const url = deUrl + `movies.html?${queryString}`;

        let card = document.createElement('a');
        card.classList.add('card-link');
        card.href = url;
        card.innerHTML = `
        <div class="card2">
            <img src="${img}" alt="">
            <div class="card2-contain">
                <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                <h6 class="time-line"><span id="time">${movieDuration} </span></h6>
                <h5>
                    <i class="fas fa-play"></i>
                    <span class="main-title">${title}</span>
                </h5>
                <h5 class="year">${year}</h5>
            </div>
        </div>
  
    `

        bollywood_section.appendChild(card);
    })
}

function hollywoodSectionData(filters) {

    hollywood_section.innerHTML = '';
    let hollywood_Movies = []
    let tempMovies = [];

    for (let ind = 0; ind < filters.length; ind++) {
        movies.forEach((e) => {
            if (
                ((e.genre1 == filters[ind]) ||
                    (e.genre2 == filters[ind]) ||
                    (e.genre3 == filters[ind]) ||
                    (e.genre4 == filters[ind]) ||
                    (e.genre5 == filters[ind]) ||
                    (e.genre6 == filters[ind]) ||
                    (e.genre7 == filters[ind]) ||
                    (e.genre8 == filters[ind]) ||
                    (e.genre9 == filters[ind]) ||
                    (e.genre10 == filters[ind]) ||
                    (e.genre11 == filters[ind]) ||
                    (e.genre12 == filters[ind]) ||
                    (e.genre13 == filters[ind]) ||
                    (e.genre14 == filters[ind]) ||
                    (e.genre15 == filters[ind])) &&
                (e.type == 'hollywood' && e.contentType == 'movie')) {

                tempMovies.push(e)
            }
        })
    }

    hollywood_Movies = tempMovies.filter((item, index) => {
        return tempMovies.indexOf(item) === index;
    })

    hollywood_Movies = hollywood_Movies.reverse();


    if (hollywood_Movies.length <= 0) {

        let p = document.createElement('p');
        p.classList.add('no-data-massage');
        p.innerText = 'No Data Avilable';
        topSectionM[1].appendChild(p);
        topSectionM[1].classList.add('active');
        return;
    }
    else {
        topSectionM[1].classList.remove('active');
    }

    hollywood_Movies.forEach(element => {
        const { img, title, year, rate, id, movieDuration } = element;

        data.id = id;
        const queryString = new URLSearchParams(data).toString();
        const url = deUrl + `movies.html?${queryString}`;


        let card = document.createElement('a');
        card.classList.add('card-link');
        card.href = url;
        card.innerHTML = `
        <div class="card2">
            <img src="${img}" alt="">
            <div class="card2-contain">
                <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                <h6 class="time-line"><span id="time">${movieDuration} </span></h6>
                <h5>
                    <i class="fas fa-play"></i>
                    <span class="main-title">${title}</span>
                </h5>
                <h5 class="year">${year}</h5>
            </div>
        </div>
  
    `

        hollywood_section.appendChild(card);
    })
}

function southSectionData(filters) {

    south_section.innerHTML = '';
    let south_Movies = [];
    let tempMovies = [];

    for (let ind = 0; ind < filters.length; ind++) {
        movies.forEach((e) => {
            if (
                ((e.genre1 == filters[ind]) ||
                    (e.genre2 == filters[ind]) ||
                    (e.genre3 == filters[ind]) ||
                    (e.genre4 == filters[ind]) ||
                    (e.genre5 == filters[ind]) ||
                    (e.genre6 == filters[ind]) ||
                    (e.genre7 == filters[ind]) ||
                    (e.genre8 == filters[ind]) ||
                    (e.genre9 == filters[ind]) ||
                    (e.genre10 == filters[ind]) ||
                    (e.genre11 == filters[ind]) ||
                    (e.genre12 == filters[ind]) ||
                    (e.genre13 == filters[ind]) ||
                    (e.genre14 == filters[ind]) ||
                    (e.genre15 == filters[ind])) &&
                (e.type === 'south' && e.contentType == 'movie')) {

                tempMovies.push(e)
            }
        })
    }

    south_Movies = tempMovies.filter((item, index) => {
        return tempMovies.indexOf(item) === index;
    })

    south_Movies = south_Movies.reverse();

    if (south_Movies.length <= 0) {

        let p = document.createElement('p');
        p.classList.add('no-data-massage');
        p.innerText = 'No Data Avilable';
        topSectionM[2].appendChild(p);
        topSectionM[2].classList.add('active');
        return;
    }
    else {
        topSectionM[2].classList.remove('active');
    }


    south_Movies.forEach(element => {
        const { img, title, year, rate, id, movieDuration } = element;

        data.id = id;
        const queryString = new URLSearchParams(data).toString();
        const url = deUrl + `movies.html?${queryString}`;

        let card = document.createElement('a');
        card.classList.add('card-link');
        card.href = url;
        card.innerHTML = `
        <div class="card2">
            <img src="${img}" alt="">
            <div class="card2-contain">
                <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                <h6 class="time-line"><span id="time">${movieDuration} </span></h6>
                <h5>
                    <i class="fas fa-play"></i>
                    <span class="main-title">${title}</span>
                </h5>
                <h5 class="year">${year}</h5>
            </div>
        </div>
  
    `
        south_section.appendChild(card);
    })
}
// <!-- category box end  -->




//on Load function start
function onLoadBollywood() {

    bollywood_section.innerHTML = '';
    let bollywood_Movies = [];


    if (isPlayListSection) {
        bollywood_Movies = playListMovies.filter((e) => {
            return e.type == 'bollywood' && e.contentType == 'movie';
        })
    }
    else {
        bollywood_Movies = movies.filter((e) => {
            return e.type == 'bollywood' && e.contentType == 'movie';
        })
    }

    if (bollywood_Movies.length <= 0) {

        let p = document.createElement('p');
        p.classList.add('no-data-massage');
        p.innerText = 'No Data Avilable';
        topSectionM[0].appendChild(p);
        topSectionM[0].classList.add('active');
        return;
    }
    else {
        topSectionM[0].classList.remove('active');
    }

    bollywood_Movies.forEach(element => {
        const { img, title, year, id, rate, movieDuration } = element;

        data.id = id;
        const queryString = new URLSearchParams(data).toString();
        const url = deUrl + `movies.html?${queryString}`;

        let card = document.createElement('a');
        card.classList.add('card-link');
        card.href = url;
        card.innerHTML = `
        <div class="card2">
            <img src="${img}" alt="">
            <div class="card2-contain">
                <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                <h6 class="time-line"><span id="time">${movieDuration} </span></h6>
                <h5>
                    <i class="fas fa-play"></i>
                    <span class="main-title">${title}</span>
                </h5>
                <h5 class="year">${year}</h5>
            </div>
        </div>
  
    `

        bollywood_section.appendChild(card);
    })
    stopMarquee();
}

function stopMarquee() {
    const allMarqurees = Array.from(document.getElementsByClassName('marquees'));

    allMarqurees.forEach((elem) => {
        elem.stop();
    })
}

function onLoadHollywood() {

    hollywood_section.innerHTML = '';
    let hollywood_Movies = [];

    if (isPlayListSection) {
        hollywood_Movies = playListMovies.filter((e) => {
            return e.type == 'hollywood' && e.contentType == 'movie';
        })
    }
    else {
        hollywood_Movies = movies.filter((e) => {
            return e.type == 'hollywood' && e.contentType == 'movie';
        })
    }

    if (hollywood_Movies.length <= 0) {

        let p = document.createElement('p');
        p.classList.add('no-data-massage');
        p.innerText = 'No Data Avilable';
        topSectionM[1].appendChild(p);
        topSectionM[1].classList.add('active');
        return;
    }
    else {
        topSectionM[1].classList.remove('active');
    }

    hollywood_Movies.forEach(element => {
        const { img, title, year, id, rate, movieDuration } = element;

        data.id = id;
        const queryString = new URLSearchParams(data).toString();
        const url = deUrl + `movies.html?${queryString}`;

        let card = document.createElement('a');
        card.classList.add('card-link');
        card.href = url;
        card.innerHTML = `
        <div class="card2">
            <img src="${img}" alt="">
            <div class="card2-contain">
                <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                <h6 class="time-line"><span id="time">${movieDuration} </span></h6>
                <h5>
                    <i class="fas fa-play"></i>
                    <span class="main-title">${title}</span>
                </h5>
                <h5 class="year">${year}</h5>
            </div>
        </div>
  
    `

        hollywood_section.appendChild(card);
    })
}

function onLoadSouth() {

    south_section.innerHTML = ''
    let south_Movies = [];


    if (isPlayListSection) {
        south_Movies = playListMovies.filter((e) => {
            return e.type == 'south' && e.contentType == 'movie';
        })
    }
    else {
        south_Movies = movies.filter((e) => {
            return e.type == 'south' && e.contentType == 'movie';
        })
    }

    if (south_Movies.length <= 0) {

        let p = document.createElement('p');
        p.classList.add('no-data-massage');
        p.innerText = 'No Data Avilable';
        topSectionM[2].appendChild(p);
        topSectionM[2].classList.add('active');
        return;
    }
    else {
        topSectionM[2].classList.remove('active');
    }

    south_Movies.forEach(element => {
        const { img, title, year, id, rate, movieDuration } = element;

        data.id = id;
        const queryString = new URLSearchParams(data).toString();
        const url = deUrl + `movies.html?${queryString}`;

        let card = document.createElement('a');
        card.classList.add('card-link');
        card.href = url;
        card.innerHTML = `
        <div class="card2">
            <img src="${img}" alt="">
            <div class="card2-contain">
                <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                <h6 class="time-line"><span id="time">${movieDuration} </span></h6>
                <h5>
                    <i class="fas fa-play"></i>
                    <span class="main-title">${title}</span>
                </h5>
                <h5 class="year">${year}</h5>
            </div>
        </div>
  
    `
        south_section.appendChild(card);
    })
}

// <!-- trending box2 start  -->
{
    trendingBtns2.forEach((value) => {

        value.addEventListener('click', () => {

            trendingBtns2.forEach((other) => {
                other.classList.remove('active');
            })

            value.classList.add('active')

            updateSection(value.innerText.trim().toLowerCase());
        })
    })
}
// <!-- trending box2 end  -->

function updateSection(topic) {

    navItems.forEach((elem) => {
        navA.push(elem.childNodes[0]);
    })

    navA.forEach((elem) => {
        elem.style.color = 'rgb(255, 255, 255, .7)'

        if (elem.innerText.trim().toLowerCase() == topic) {
            elem.style.color = 'white';
        }
    })

    let movieIndex = 0;
    switch (topic) {

        case 'movies':

            let moviesData = [];

            trendingBtns2.forEach((values) => {
                values.classList.remove('active');
            })
            trendingBtns2[0].classList.add('active');

            if (isPlayListSection) {
                moviesData = playListMovies.filter((e) => {
                    return e.contentType == 'movie';
                })
            }
            else {
                moviesData = movies.filter((e) => {
                    return e.contentType == 'movie';
                })
            }

            if (moviesData.length <= 0) {
                noDataAvilable();
            }
            else {

                DataAvilable();
                movieIndex = 0;

                while (movieIndex < moviesData.length) {

                    let main_section = document.createElement('section');
                    main_section.classList.add('section');
                    let section_data = document.createElement('div');
                    section_data.classList.add('section-data');
                    section_data.innerHTML = `            
                
                    <div class="section-button-container section-left-btn-container">
                        <button class="section-left-scroll-btn" data-bottom-section-left-scroll>
                            <i class="fas fa-angle-down"></i>
                        </button>
                    </div>
    
                    <div class="section-button-container section-right-btn-container">
                        <button class="section-right-scroll-btn" data-bottom-section-right-scroll>
                            <i class="fas fa-angle-down"></i>
                        </button>
                    </div>`

                    main_section.appendChild(section_data);


                    let counting = 0;
                    let section_contian = document.createElement('div');
                    section_contian.classList.add('section-main-content');
                    section_contian.classList.add('bottom-section-scrollers');


                    while (counting < 15 && movieIndex < moviesData.length) {
                        const { img, title, year, rate, id, movieDuration } = moviesData[movieIndex];

                        data.id = id;
                        const queryString = new URLSearchParams(data).toString();
                        const url = deUrl + `movies.html?${queryString}`;

                        let card = document.createElement('a');
                        card.classList.add('card-link');
                        card.href = url;
                        card.innerHTML = `
                    <div class="card2">
                        <img src="${img}" alt="">
                        <div class="card2-contain">
                            <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                            <h6 class="time-line"><span id="time">${movieDuration} </span></h6>
                            <h5>
                                <i class="fas fa-play"></i>
                                <span class="main-title">${title}</span>
                            </h5>
                            <h5 class="year">${year}</h5>
                        </div>
                    </div>
                `

                        movieIndex++;
                        counting++;
                        section_contian.appendChild(card);
                    }

                    section_data.appendChild(section_contian);
                    bottom_section.appendChild(main_section);
                }

                bottomButtons();
            }
            break;

        case 'series':
            let series = [];

            if (isPlayListSection) {
                series = playListMovies.filter((e) => {
                    return e.contentType == 'series';
                })
            }
            else {
                series = movies.filter((e) => {
                    return e.contentType == 'series';
                })
            }

            if (series.length <= 0) {
                noDataAvilable();
            }
            else {

                DataAvilable();
                movieIndex = 0;

                while (movieIndex < series.length) {

                    let main_section = document.createElement('section');
                    main_section.classList.add('section');
                    let section_data = document.createElement('div');
                    section_data.classList.add('section-data');
                    section_data.innerHTML = `            
                
                    <div class="section-button-container section-left-btn-container">
                        <button class="section-left-scroll-btn" data-bottom-section-left-scroll>
                            <i class="fas fa-angle-down"></i>
                        </button>
                    </div>
    
                    <div class="section-button-container section-right-btn-container">
                        <button class="section-right-scroll-btn" data-bottom-section-right-scroll>
                            <i class="fas fa-angle-down"></i>
                        </button>
                    </div>`

                    main_section.appendChild(section_data);


                    let counting = 0;
                    let section_contian = document.createElement('div');
                    section_contian.classList.add('section-main-content');
                    section_contian.classList.add('bottom-section-scrollers');


                    while (counting < 15 && movieIndex < series.length) {
                        const { img, title, year, rate, id, movieAgeRestriction } = series[movieIndex];

                        data.id = id;
                        const queryString = new URLSearchParams(data).toString();
                        const url = deUrl + `series.html?${queryString}`;

                        let card = document.createElement('a');
                        card.classList.add('card-link');
                        card.href = url;
                        card.innerHTML = `
                    <div class="card2">
                        <img src="${img}" alt="">
                        <div class="card2-contain">
                            <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                            <h6 class="time-line"><span id="time">${movieAgeRestriction} </span></h6>
                            <h5>
                                <i class="fas fa-play"></i>
                                <span class="main-title">${title}</span>
                            </h5>
                            <h5 class="year">${year}</h5>
                        </div>
                    </div>
                `

                        movieIndex++;
                        counting++;
                        section_contian.appendChild(card);
                    }

                    section_data.appendChild(section_contian);
                    bottom_section.appendChild(main_section);
                }

                bottomButtons();
            }
            break;

        case 'tv shows':

            let tv_shows = [];

            if (isPlayListSection) {
                tv_shows = playListMovies.filter((e) => {
                    return e.contentType == 'tv shows';
                })
            }
            else {
                tv_shows = movies.filter((e) => {
                    return e.contentType == 'tv shows';
                })
            }


            if (tv_shows.length <= 0) {
                noDataAvilable();
            }
            else {

                DataAvilable();
                movieIndex = 0;

                while (movieIndex < tv_shows.length) {

                    let main_section = document.createElement('section');
                    main_section.classList.add('section');
                    let section_data = document.createElement('div');
                    section_data.classList.add('section-data');
                    section_data.innerHTML = `            
                
                    <div class="section-button-container section-left-btn-container">
                        <button class="section-left-scroll-btn" data-bottom-section-left-scroll>
                            <i class="fas fa-angle-down"></i>
                        </button>
                    </div>
    
                    <div class="section-button-container section-right-btn-container">
                        <button class="section-right-scroll-btn" data-bottom-section-right-scroll>
                            <i class="fas fa-angle-down"></i>
                        </button>
                    </div>`

                    main_section.appendChild(section_data);


                    let counting = 0;
                    let section_contian = document.createElement('div');
                    section_contian.classList.add('section-main-content');
                    section_contian.classList.add('bottom-section-scrollers');

                    while (counting < 15 && movieIndex < tv_shows.length) {
                        const { img, title, year, rate, id, movieAgeRestriction } = tv_shows[movieIndex];

                        data.id = id;
                        const queryString = new URLSearchParams(data).toString();
                        const url = deUrl + `series.html?${queryString}`;

                        let card = document.createElement('a');
                        card.classList.add('card-link');
                        card.href = url;
                        card.innerHTML = `
                    <div class="card2">
                        <img src="${img}" alt="">
                        <div class="card2-contain">
                            <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                            <h6 class="time-line"><span id="time">${movieAgeRestriction} </span></h6>
                            <h5>
                                <i class="fas fa-play"></i>
                                <span class="main-title">${title}</span>
                            </h5>
                            <h5 class="year">${year}</h5>
                        </div>
                    </div>
                `

                        movieIndex++;
                        counting++;
                        section_contian.appendChild(card);
                    }

                    section_data.appendChild(section_contian);
                    bottom_section.appendChild(main_section);
                }

                bottomButtons();
            }
            break;

        case 'trailer':

            let trailer = [];

            if (isPlayListSection) {
                trailer = playListMovies.filter((e) => {
                    return e.contentType == 'trailer';
                })
            }
            else {
                trailer = movies.filter((e) => {
                    return e.contentType == 'trailer';
                })
            }


            if (trailer.length <= 0) {
                noDataAvilable();
            }
            else {

                DataAvilable();
                movieIndex = 0;

                while (movieIndex < trailer.length) {

                    let main_section = document.createElement('section');
                    main_section.classList.add('section');
                    let section_data = document.createElement('div');
                    section_data.classList.add('section-data');
                    section_data.innerHTML = `            
                
                    <div class="section-button-container section-left-btn-container">
                        <button class="section-left-scroll-btn" data-bottom-section-left-scroll>
                            <i class="fas fa-angle-down"></i>
                        </button>
                    </div>
    
                    <div class="section-button-container section-right-btn-container">
                        <button class="section-right-scroll-btn" data-bottom-section-right-scroll>
                            <i class="fas fa-angle-down"></i>
                        </button>
                    </div>`

                    main_section.appendChild(section_data);


                    let counting = 0;
                    let section_contian = document.createElement('div');
                    section_contian.classList.add('section-main-content');
                    section_contian.classList.add('bottom-section-scrollers');


                    while (counting < 15 && movieIndex < trailer.length) {
                        const { img, title, year, rate, id, movieDuration } = trailer[movieIndex];

                        data.id = id;
                        const queryString = new URLSearchParams(data).toString();
                        const url = deUrl + `movies.html?${queryString}`;
                        let card = document.createElement('a');
                        card.classList.add('card-link');
                        card.href = url;
                        card.innerHTML = `
                    <div class="card2">
                        <img src="${img}" alt="">
                        <div class="card2-contain">
                            <h6 class="rating"><i class="fas fa-star"></i><span>${rate}</span></h6>
                            <h6 class="time-line"><span id="time">${movieDuration} </span></h6>
                            <h5>
                                <i class="fas fa-play"></i>
                                <span class="main-title">${title}</span>
                            </h5>
                            <h5 class="year">${year}</h5>
                        </div>
                    </div>
                `

                        movieIndex++;
                        counting++;
                        section_contian.appendChild(card);
                    }

                    section_data.appendChild(section_contian);
                    bottom_section.appendChild(main_section);
                }

                bottomButtons();
            }
            break;

        default:
            break;
    }
}

// no data Avilable massage
function noDataAvilable() {
    bottom_section.innerHTML = '';

    const massElem = document.createElement('span');
    massElem.classList.add('no-data-masage');
    massElem.innerText = 'No Data Avilable';
    bottom_section.appendChild(massElem);
    massage_container.classList.add('bottom-movie-section-active');
}

// data Avilable massage
function DataAvilable() {
    bottom_section.innerHTML = '';
    massage_container.classList.remove('bottom-movie-section-active');
}

// retrive data from local storag

