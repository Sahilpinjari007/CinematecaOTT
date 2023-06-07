import { moviesData, sliderData } from "./adminPageNet";
let movies = moviesData;
let sliders = sliderData;
let episodes = [];
let CurrSeriesTableN = '';
let CurrSeriesName = '';
let updateSeriesCardId = '';

const url = `http://localhost/All%20Projects/FilmIaneMovies.com/All%20Apis/`;

const navBar = document.querySelector('[data-main-navigation]');
const navOpenBtn = document.querySelector('[data-menu-open-btn]');
const overlay = document.querySelector('[data-main-overlay]');
const searchIcon = document.querySelector('[data-search-icon]');
const searchBar = document.querySelector('[data-search-bar]');
const headerTitle = document.querySelector('[data-header-title]');
const backBtn = document.querySelector('[data-back-btn]');
const mainContentSection = document.querySelectorAll('#main-content-section');
const movieSection = document.querySelector('[data-movie-section]');
const content_type_drop_down_items = Array.from(document.querySelectorAll('[data-content-type-down-itmes]'));
const content_type_section = document.querySelector('[data-content-type-section]');
const content_from_drop_down_items = Array.from(document.querySelectorAll('[data-content-type-down-itmes2]'));
const content_from_section = document.querySelector('[data-content-type-section2]');
const insertMainDataSection = document.querySelector('[data-movies-insert-section]')
const sliderSection = document.querySelector('[data-slider-section]');
const sliderInsertSection = document.querySelector('[data-insert-slider-section]');
const insertSliderBtn = document.querySelector('[data-insert-slider-btn]');
const seriesSection = document.querySelector('[data-series-section]');
const InsertseriesSection = document.querySelector('[data-insert-series-section]');
const InsertseriesBtn = document.querySelector('#insert-series-btn');
const viewSeriesEpSection = document.querySelector('#view-series-ep-section');
const settingSection = document.querySelector('#setting-section');
const search_bx2 = document.querySelector('.search_bx2');


const contentCardImg = document.getElementById('card-img');
const contentPosterImg = document.getElementById('poster-img');
const contentTitle = document.getElementById('content-title');
const contentDes = document.getElementById('content-des');
const contentYear = document.getElementById('content-year');
const contentRate = document.getElementById('content-rate');
const contentUrl = document.getElementById('content-url');
const contentFrom = document.getElementById('content-from');
const contentEpTableName = document.getElementById('content-episodes-table-name');
const contentDownloadUrl = document.getElementById('content-download-url');
const contentDownloadWebUrl = document.getElementById('content-download-web-url');
const contentAgeRes = document.getElementById('content-age-reg');
const contentDuration = document.getElementById('content-duration');
const contentTypes = document.getElementById('content-type');
const allCheckBoxTxt = Array.from(document.querySelectorAll('.checkBoxTxt'));
const movieSectionInsertBtn = document.querySelector('#insert-btn');
const notifyMassage = document.querySelector('#notifyMassage');
const notifyMassageContent = document.getElementById('massage');
const navLinks = Array.from(document.getElementsByClassName('navLinks'));
const contentFromLa = document.getElementById('content-from-lable');

const slidersImg = document.getElementById('slider-img');
const slidersDur = document.getElementById('slider-duration');
const slidersRat = document.getElementById('slider-rating');
const slidersGen = document.getElementById('slider-gens');
const slidersTitle = document.getElementById('slider-title');
const slidersDes = document.getElementById('slider-des');
const slidersContId = document.getElementById('slider-content-id');

const seriesName = document.getElementById('series-name');
const seriesTablName = document.getElementById('ep-table-name');
const epImg = document.getElementById('ep-img');
const epTitle = document.getElementById('ep-title');
const epDura = document.getElementById('ep-duration');
const epDate = document.getElementById('ep-date');
const epUrl = document.getElementById('ep-url');
const epDesc = document.getElementById('ep-descri');
const epNo = document.getElementById('ep-no');

let isSearchBarOpen = false;
let isSeries = false;
let specificContent = '';
let paginStack = [];
let allCheckBox = [];



for (let i = 0; i < allCheckBoxTxt.length; i++) {
    allCheckBox.push({
        checkBx: document.getElementById('checkBox' + i),
        checkGen: allCheckBoxTxt[i]
    });
}

// on load body
document.body.onload = detectUser;
function detectUser() {

    const loginCard = document.querySelector('#login-card');
    const loginBtn = document.querySelector('#login-userName-password-btn');
    const nameInput = document.querySelector('#login-userName');
    const passInput = document.querySelector('#login-Password');

    overlay.classList.add('overlayActive');
    loginCard.classList.add('login-card-active');

    loginBtn.addEventListener('click', () => {

        if (nameInput.value != '' && passInput != '') {

            const name = nameInput.value;
            const pass = passInput.value;

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(url + "getAdminNamePass.php", requestOptions)
                .then(response => response.text())
                .then((result) => {

                    let mainResult = JSON.parse(result);
                    let author = mainResult.data[0];

                    if (name == author.userName && pass == author.userPass) {
                        notifyMassageContent.innerText = 'Login SuccessFull!';
                        notifyMassage.classList.add('notifyMassageActive')

                        overlay.classList.remove('overlayActive');
                        loginCard.classList.remove('login-card-active');
                        navBar.classList.add('displayNavMainSection');
                        mainContentSection[0].classList.add('displayNavMainSection');

                        setTimeout(function () {
                            notifyMassage.classList.remove('notifyMassageActive');
                        }, 2000);
                        nameInput.value = '';
                        passInput.value = '';

                        setTimeout(function () {
                            loadAllMovies()
                            searcingCodes();
                        }, 3000);

                        const navClickListeners = [navOpenBtn, overlay];

                        navClickListeners.forEach((elem) => {

                            elem.addEventListener('click', () => {

                                navBar.classList.toggle('navActive');
                                document.body.classList.toggle('active');
                                overlay.classList.toggle('overlayActive')
                            })
                        })

                    }
                    else {
                        alert('Please enter valid Username and password')
                        nameInput.value = '';
                        passInput.value = '';
                    }
                })
                .catch(error => console.log('error', error));
        } else {
            alert('Please Enter the Specific Field!')
        }
    })
}

// searchbar code 
searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('searchActive');
    backBtn.classList.toggle('backBtnActive')

    if (!isSearchBarOpen) {
        headerTitle.classList.add('titleActive');
        isSearchBarOpen = true;
    }
    else {

        setTimeout(function () {
            headerTitle.classList.remove('titleActive')
        }, 300);
        isSearchBarOpen = false;


        searchBar.value = ''
        search_bx2.style.visibility = "hidden";
        search_bx2.style.opacity = 0;
    }
})

function searcingCodes() {


    // searchBar code start
    movies.forEach(element => {
        const { img, title, year, id } = element;

        let card = document.createElement('a');
        card.classList.add('searcing-cards')
        card.innerHTML = ` <img src="${img}" alt="">
        <div class="content2"">
        <span class="search-content-id" style="display: none;">${id}</span>
            <h6>${title}</h6>
            <p>${year}</p>
        </div>`;

        search_bx2.appendChild(card);
    });

    searchResClick();

    searchBar.addEventListener('keyup', () => {

        let filter = searchBar.value.toUpperCase();
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
            if (searchBar.value == 0 || !isSearchBarOpen) {
                search_bx2.style.visibility = "hidden";
                search_bx2.style.opacity = 0;
            }
        }
    })
    // searchBar code end
}

function searchResClick() {

    const searchIds = Array.from(document.querySelectorAll('.search-content-id'));
    const allCards = Array.from(document.querySelectorAll('.searcing-cards'));


    allCards.forEach((elem, ind) => {

        elem.addEventListener('click', () => {
            const contentId = searchIds[ind].innerText;
            search_bx2.style.visibility = "hidden";
            search_bx2.style.opacity = 0;
            searchBar.value = ''


            searchBar.classList.toggle('searchActive');
            backBtn.classList.toggle('backBtnActive')
            setTimeout(function () {
                headerTitle.classList.remove('titleActive')
            }, 300);
            isSearchBarOpen = false;

            let specificContent = movies.filter((elem) => {
                return elem.id == contentId;
            })

            movieSectionInsertBtn.innerHTML = `<a>Update</a>`

            if (!insertMainDataSection.classList.contains('insert-movie-items-active')) {

                insertMainDataSection.classList.add('insert-movie-items-active');
                movieSection.classList.remove('movie-section-active');

                paginStack.push({
                    from: movieSection,
                    to: insertMainDataSection
                });
            }


            const { img, down_img, title, description, year, rate, url, type,
                episodesTable, downloadurl, movieAgeRestriction, movieDuration, contentType, downloadWebsiteUrl } = specificContent[0];

            if (contentType == 'movie' || contentType == 'trailer') {
                isSeries = false;
                contentUrl.disabled = false;
                contentDuration.disabled = false;
                contentEpTableName.disabled = true;
                contentFromLa.style.display = '';
            }
            else {
                isSeries = true;
                contentUrl.disabled = true;
                contentDuration.disabled = true;
                contentEpTableName.disabled = true;
                contentFromLa.style.display = 'none';
            }

            contentCardImg.value = img;
            contentPosterImg.value = down_img;
            contentTitle.value = title;
            contentDes.value = description;
            contentYear.value = year;
            contentRate.value = rate;
            contentUrl.value = url;
            contentFrom.innerHTML = `${type} <i class="fa-sharp fa-solid fa-caret-down">`;
            contentEpTableName.value = episodesTable;
            contentDownloadWebUrl.value = downloadWebsiteUrl;
            contentDownloadUrl.value = downloadurl;
            contentAgeRes.value = movieAgeRestriction;
            contentDuration.value = movieDuration;
            contentTypes.innerHTML = `${contentType} <i class="fa-sharp fa-solid fa-caret-down">`;
            console.log(url);
            console.log(movieDuration);

            const AllGenre = Object.values(specificContent[0]);

            let l = 0, j = 0;
            for (l = 0; l < allCheckBoxTxt.length; l++) {
                for (j = 0; j < AllGenre.length; j++) {

                    if (allCheckBoxTxt[l].innerText == AllGenre[j]) {
                        document.getElementById('checkBox' + l).checked = true;
                    }
                    else {
                        document.getElementById('checkBox' + ind).checked = false;
                    }
                }
            }
        })
    })
}




// menu Clikeing and oprations
navLinks.forEach((elem) => {
    elem.addEventListener('click', () => {


        document.getElementById('header-titile').innerText = elem.innerText;
        navBar.classList.remove('navActive');
        document.body.classList.remove('active');
        overlay.classList.remove('overlayActive')

        navLinks.forEach((elem) => {
            elem.classList.remove('navLiActive');
        })

        switch (elem.innerText) {

            case 'Sliders':
                elem.classList.add('navLiActive');
                loadSliderData();
                break;

            case 'Movies':
                elem.classList.add('navLiActive');
                loadAllMovies();
                break;

            case 'Series':
                elem.classList.add('navLiActive');
                loadSeriesData();
                break;

            case 'Setting':
                elem.classList.add('navLiActive');
                loadSetting();
                break;
        }
    })
})


// movie section start
function loadAllMovies() {


    sliderSection.classList.remove('slider-content-section-active');
    sliderInsertSection.classList.remove('insert-slider-items-Active')
    insertMainDataSection.classList.remove('insert-movie-items-active');
    seriesSection.classList.remove('series-section-active');
    InsertseriesSection.classList.remove('insert-series-items-Active');
    viewSeriesEpSection.classList.remove('view-series-ep-section-active')
    settingSection.classList.remove('setting-section-Active');

    movieSection.classList.add('movie-section-active');
    paginStack = [];


    movieSection.innerHTML = ``;

    let insertBtn = document.createElement('div');
    insertBtn.setAttribute('id', 'add-content-btn');
    insertBtn.onclick = addContentBtnF;
    insertBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    movieSection.appendChild(insertBtn);

    movies.forEach((elem) => {

        const { id, img } = elem;
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
                <img src="${img}" alt="">
                <span style="display: none" class="card-id" data-all-card-ids>${id}</span>
                <div class="actions">
                    <i class="fa-solid fa-trash" data-delete-icon></i>
                    <i class="fa-solid fa-pen" data-update-icon></i>
                </div>
        `

        movieSection.appendChild(card);
    })

    deleteAndUpdateMoviesBtn();
}

function deleteAndUpdateMoviesBtn() {

    let deletItemBtn = Array.from(document.querySelectorAll('[data-delete-icon]'));
    let updateItemBtn = document.querySelectorAll('[data-update-icon]');
    let allCardsIds = Array.from(document.querySelectorAll('[data-all-card-ids]'));


    updateItemBtn.forEach((elem, i) => {
        elem.addEventListener('click', () => {

            const contentId = allCardsIds[i].innerText;
            movieSectionInsertBtn.innerHTML = `<a>Update</a>`

            insertMainDataSection.classList.toggle('insert-movie-items-active');
            movieSection.classList.toggle('movie-section-active');

            paginStack.push({
                from: movieSection,
                to: insertMainDataSection
            });


            specificContent = movies.filter((elem) => {
                return elem.id == contentId;
            })


            const { img, down_img, title, description, year, rate, url, type,
                episodesTable, downloadurl, movieAgeRestriction, movieDuration, contentType, downloadWebsiteUrl } = specificContent[0];


            if (contentType == 'movie' || contentType == 'trailer') {
                isSeries = false;
                contentUrl.disabled = false;
                contentDuration.disabled = false;
                contentEpTableName.disabled = true;
                contentFromLa.style.display = '';
            }
            else {
                isSeries = true;
                contentUrl.disabled = true;
                contentDuration.disabled = true;
                contentEpTableName.disabled = true;
                contentFromLa.style.display = 'none';
            }


            contentCardImg.value = img;
            contentPosterImg.value = down_img;
            contentTitle.value = title;
            contentDes.value = description;
            contentYear.value = year;
            contentRate.value = rate;
            contentUrl.value = url;
            contentFrom.innerHTML = `${type} <i class="fa-sharp fa-solid fa-caret-down">`;
            contentEpTableName.value = episodesTable;
            contentDownloadWebUrl.value = downloadWebsiteUrl;
            contentDownloadUrl.value = downloadurl;
            contentAgeRes.value = movieAgeRestriction;
            contentDuration.value = movieDuration;
            contentTypes.innerHTML = `${contentType} <i class="fa-sharp fa-solid fa-caret-down">`;

            const AllGenre = Object.values(specificContent[0])

            let l = 0, j = 0;
            for (l = 0; l < allCheckBoxTxt.length; l++) {
                for (j = 0; j < AllGenre.length; j++) {

                    if (allCheckBoxTxt[l].innerText == AllGenre[j]) {
                        document.getElementById('checkBox' + l).checked = true;
                    }
                    else {
                        document.getElementById('checkBox' + i).checked = false;
                    }
                }
            }
        })
    })

    deletItemBtn.forEach((elem, i) => {

        elem.addEventListener('click', () => {

            if (confirm('Are Your Sure you Want to Delete this content')) {

                var formdata = new FormData();
                formdata.append("itemId", allCardsIds[i].innerText);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                fetch(url + "deleteMainContent.php", requestOptions)
                    .then(response => response.text())
                    .then((result) => {


                        let mainResult = JSON.parse(result);

                        notifyMassageContent.innerText = mainResult.massage;
                        notifyMassage.classList.add('notifyMassageActive')

                        setTimeout(function () {
                            notifyMassage.classList.remove('notifyMassageActive');
                        }, 2000);
                    })
                    .catch(error => console.log('error', error));


                let temMovies = movies.filter((elem) => {

                    if (elem.id == allCardsIds[i].innerText) {
                        if (elem.contentType == 'series' ||
                            elem.contentType == 'tv shows') {

                            var formdata = new FormData();
                            formdata.append("tableName", elem.episodesTable);

                            var requestOptions = {
                                method: 'POST',
                                body: formdata,
                                redirect: 'follow'
                            };

                            fetch(url + "deleteSeriesTable.php", requestOptions)
                                .then(response => response.text())
                                .then(result => console.log(result))
                                .catch(error => console.log('error', error));
                        }
                    }


                    return elem.id != allCardsIds[i].innerText;
                })

                movies = temMovies;
                loadAllMovies();
            }
        })
    })
}

function addContentBtnF() {


    clearInputs();


    contentUrl.disabled = false;
    contentDuration.disabled = false;
    contentEpTableName.disabled = true;
    contentEpTableName.value = 'none';
    contentFromLa.style.display = '';


    movieSectionInsertBtn.innerHTML = `<a>Insert</a>`
    insertMainDataSection.classList.toggle('insert-movie-items-active');
    movieSection.classList.toggle('movie-section-active');
    isSeries = false;

    paginStack.push({
        from: movieSection,
        to: insertMainDataSection
    });
}

movieSectionInsertBtn.addEventListener('click', () => {

    if (movieSectionInsertBtn.innerHTML == `<a>Update</a>`) {

        if (contentDes.value.includes('\'') || contentDes.value.includes('\"')) {

            let des = contentDes.value;

            for (let i = 0; i < des.length; i++) {

                if (des[i] === '\'' || des[i] === '\"') {
                    if (des[i - 1] != "\\") {
                        alert('Description contains the ( \' or \" ) please add ( \\ ) back Slash before this ');
                        return;
                    }
                }
            }
        }


        if (confirm('Are Your Sure you Want to Update this content')) {

            var formdata = new FormData();
            formdata.append("contentId", specificContent[0].id);
            formdata.append("contentImg", contentCardImg.value);
            formdata.append("contentPosterImg", contentPosterImg.value);
            formdata.append("contentTitle", contentTitle.value);
            formdata.append("contentDes", contentDes.value);
            formdata.append("contentgen1", allCheckBox[0].checkBx.checked == true ? allCheckBox[0].checkGen.innerText : 'none');
            formdata.append("contentgen2", allCheckBox[1].checkBx.checked == true ? allCheckBox[1].checkGen.innerText : 'none');
            formdata.append("contentgen3", allCheckBox[2].checkBx.checked == true ? allCheckBox[2].checkGen.innerText : 'none');
            formdata.append("contentgen4", allCheckBox[3].checkBx.checked == true ? allCheckBox[3].checkGen.innerText : 'none');
            formdata.append("contentgen5", allCheckBox[4].checkBx.checked == true ? allCheckBox[4].checkGen.innerText : 'none');
            formdata.append("contentgen6", allCheckBox[5].checkBx.checked == true ? allCheckBox[5].checkGen.innerText : 'none');
            formdata.append("contentgen7", allCheckBox[6].checkBx.checked == true ? allCheckBox[6].checkGen.innerText : 'none');
            formdata.append("contentgen8", allCheckBox[7].checkBx.checked == true ? allCheckBox[7].checkGen.innerText : 'none');
            formdata.append("contentgen9", allCheckBox[8].checkBx.checked == true ? allCheckBox[8].checkGen.innerText : 'none');
            formdata.append("contentgen10", allCheckBox[9].checkBx.checked == true ? allCheckBox[9].checkGen.innerText : 'none');
            formdata.append("contentgen11", allCheckBox[10].checkBx.checked == true ? allCheckBox[10].checkGen.innerText : 'none');
            formdata.append("contentgen12", allCheckBox[11].checkBx.checked == true ? allCheckBox[11].checkGen.innerText : 'none');
            formdata.append("contentgen13", allCheckBox[12].checkBx.checked == true ? allCheckBox[12].checkGen.innerText : 'none');
            formdata.append("contentgen14", allCheckBox[13].checkBx.checked == true ? allCheckBox[13].checkGen.innerText : 'none');
            formdata.append("contentgen15", allCheckBox[14].checkBx.checked == true ? allCheckBox[14].checkGen.innerText : 'none');
            formdata.append("contentyear", contentYear.value);
            formdata.append("contentrate", contentRate.value);
            formdata.append("contenturl", contentUrl.value);
            formdata.append("contenttype", contentFrom.innerText);
            formdata.append("contentEpTableN", contentEpTableName.value);
            formdata.append("contentDonloaWebUrl", contentDownloadWebUrl.value != '' ? contentDownloadWebUrl.value : 'none');
            formdata.append("contentDonloaUrl", contentDownloadUrl.value  != '' ? contentDownloadUrl.value : 'none');
            formdata.append("contentAgeReg", contentAgeRes.value);
            formdata.append("contentDurati", contentDuration.value);
            formdata.append("contentContType", contentTypes.innerText);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(url + "updateMainContent.php", requestOptions)
                .then(response => response.text())
                .then((result) => {

                    let mainResult = JSON.parse(result);

                    notifyMassageContent.innerText = mainResult.massage;
                    notifyMassage.classList.add('notifyMassageActive')

                    setTimeout(function () {
                        notifyMassage.classList.remove('notifyMassageActive');
                    }, 2000);
                })
                .catch(error => console.log('error', error));

            insertMainDataSection.classList.toggle('insert-movie-items-active');
            movieSection.classList.toggle('movie-section-active');
            paginStack.splice(paginStack.length - 1, 1);
        }

    }
    else if (movieSectionInsertBtn.innerHTML == `<a>Insert</a>`) {
        insertMainData();
    }
})

function insertMainData() {

    if (contentDes.value.includes('\'') || contentDes.value.includes('\"')) {

        let des = contentDes.value;

        for (let i = 0; i < des.length; i++) {

            if (des[i] === '\'' || des[i] === '\"') {
                if (des[i - 1] != "\\") {
                    alert('Description contains the ( \' or \" ) please add ( \\ ) back Slash before this ');
                    return;
                }
            }
        }
    }

    if (contentEpTableName.disabled === false && isSeries) {
        if (contentEpTableName.value.includes(' ')) {
            alert('please remove space between Episode table name');
            return;
        }
    }


    var formdata = new FormData();
    formdata.append("contentImg", contentCardImg.value);
    formdata.append("contentPosterImg", contentPosterImg.value);
    formdata.append("contentTitle", contentTitle.value);
    formdata.append("contentDes", contentDes.value);
    formdata.append("contentgen1", allCheckBox[0].checkBx.checked == true ? allCheckBox[0].checkGen.innerText : 'none');
    formdata.append("contentgen2", allCheckBox[1].checkBx.checked == true ? allCheckBox[1].checkGen.innerText : 'none');
    formdata.append("contentgen3", allCheckBox[2].checkBx.checked == true ? allCheckBox[2].checkGen.innerText : 'none');
    formdata.append("contentgen4", allCheckBox[3].checkBx.checked == true ? allCheckBox[3].checkGen.innerText : 'none');
    formdata.append("contentgen5", allCheckBox[4].checkBx.checked == true ? allCheckBox[4].checkGen.innerText : 'none');
    formdata.append("contentgen6", allCheckBox[5].checkBx.checked == true ? allCheckBox[5].checkGen.innerText : 'none');
    formdata.append("contentgen7", allCheckBox[6].checkBx.checked == true ? allCheckBox[6].checkGen.innerText : 'none');
    formdata.append("contentgen8", allCheckBox[7].checkBx.checked == true ? allCheckBox[7].checkGen.innerText : 'none');
    formdata.append("contentgen9", allCheckBox[8].checkBx.checked == true ? allCheckBox[8].checkGen.innerText : 'none');
    formdata.append("contentgen10", allCheckBox[9].checkBx.checked == true ? allCheckBox[9].checkGen.innerText : 'none');
    formdata.append("contentgen11", allCheckBox[10].checkBx.checked == true ? allCheckBox[10].checkGen.innerText : 'none');
    formdata.append("contentgen12", allCheckBox[11].checkBx.checked == true ? allCheckBox[11].checkGen.innerText : 'none');
    formdata.append("contentgen13", allCheckBox[12].checkBx.checked == true ? allCheckBox[12].checkGen.innerText : 'none');
    formdata.append("contentgen14", allCheckBox[13].checkBx.checked == true ? allCheckBox[13].checkGen.innerText : 'none');
    formdata.append("contentgen15", allCheckBox[14].checkBx.checked == true ? allCheckBox[14].checkGen.innerText : 'none');
    formdata.append("contentyear", contentYear.value);
    formdata.append("contentrate", contentRate.value);
    formdata.append("contenturl", contentUrl.value);
    formdata.append("contenttype", contentFrom.innerText);
    formdata.append("contentEpTableN", contentEpTableName.value);
    formdata.append("contentDonloaWebUrl", contentDownloadWebUrl.value != undefined ? contentDownloadWebUrl.value : 'none');
    formdata.append("contentDonloaUrl", contentDownloadUrl.value != undefined ? contentDownloadUrl.value : 'none');
    formdata.append("contentAgeReg", 'U/A ' + contentAgeRes.value + '+');
    formdata.append("contentDurati", contentDuration.value);
    formdata.append("contentContType", contentTypes.innerText);


    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch(url + "insertMainContent.php", requestOptions)
        .then(response => response.text())
        .then((result) => {


            if (isSeries) {
                var formdata = new FormData();
                formdata.append("tableName", contentEpTableName.value);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                fetch(url + "createSeriesTable.php", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            }



            let mainResult = JSON.parse(result);

            notifyMassageContent.innerText = mainResult.massage;
            notifyMassage.classList.add('notifyMassageActive')

            setTimeout(function () {
                notifyMassage.classList.remove('notifyMassageActive');
            }, 2000);

            document.getElementById('cont-id').innerText = mainResult.YourContentId[0];
            document.getElementById('insertItemIdMass').classList.toggle('insertItemIdMassActive');
            overlay.classList.toggle('overlayActive')
            document.getElementById('ok-btn').addEventListener('click', () => {

                document.getElementById('insertItemIdMass').classList.toggle('insertItemIdMassActive');

                if (isSeries) {
                    seriesSection.classList.toggle('series-section-active');
                    insertMainDataSection.classList.toggle('insert-movie-items-active');


                }
                else {
                    insertMainDataSection.classList.toggle('insert-movie-items-active');
                    movieSection.classList.toggle('movie-section-active');
                }

                paginStack.splice(paginStack.length - 1, 1);
                overlay.classList.toggle('overlayActive')
            })
        })
        .catch(error => console.log('error', error));
}



// slider-content-section start 
function loadSliderData() {

    movieSection.classList.remove('movie-section-active');
    insertMainDataSection.classList.remove('insert-movie-items-active');
    sliderInsertSection.classList.remove('insert-slider-items-Active')
    seriesSection.classList.remove('series-section-active');
    InsertseriesSection.classList.remove('insert-series-items-Active');
    viewSeriesEpSection.classList.remove('view-series-ep-section-active')
    settingSection.classList.remove('setting-section-Active');

    sliderSection.classList.add('slider-content-section-active');
    paginStack = [];


    sliderSection.innerHTML = ``;

    let sliderinsertBtn = document.createElement('div');
    sliderinsertBtn.setAttribute('id', 'add-content-btn');
    sliderinsertBtn.onclick = addSliderBtnF;
    sliderinsertBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    sliderSection.appendChild(sliderinsertBtn);


    sliders.forEach((elem) => {

        const { id, sliderImg } = elem;

        const sliderCard = document.createElement('div');
        sliderCard.classList.add('slider-card');

        sliderCard.innerHTML = `
        <img src="${sliderImg}" alt="">
        <span style="display: none" class="card-id" data-all-slider-card-ids>${id}</span>
        <div class="slider-card-actions">
            <i class="fa-solid fa-trash" data-slider-delete-icon></i>
            <i class="fa-solid fa-pen" data-slider-update-icon></i>
        </div>`

        sliderSection.appendChild(sliderCard);
    })

    deleteUpdateSliderBtn();
}

function deleteUpdateSliderBtn() {
    let deletItemBtn = Array.from(document.querySelectorAll('[data-slider-delete-icon]'));
    let updateItemBtn = document.querySelectorAll('[data-slider-update-icon]');
    let allCardsIds = Array.from(document.querySelectorAll('[data-all-slider-card-ids]'));


    deletItemBtn.forEach((elem, i) => {

        elem.addEventListener('click', () => {

            if (confirm('Are Your Sure you Want to Delete this content')) {


                var formdata = new FormData();
                formdata.append("itemId", allCardsIds[i].innerText);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                fetch(url + "deleteSlider.php", requestOptions)
                    .then(response => response.text())
                    .then((result) => {
                        let mainResult = JSON.parse(result);

                        notifyMassageContent.innerText = mainResult.massage;
                        notifyMassage.classList.add('notifyMassageActive')

                        setTimeout(function () {
                            notifyMassage.classList.remove('notifyMassageActive');
                        }, 2000);
                    })
                    .catch(error => console.log('error', error));

                let newSliders = sliders.filter((elem) => {
                    return elem.id != allCardsIds[i].innerText;
                })


                sliders = newSliders;
                loadSliderData();
            }
        })
    })

    updateItemBtn.forEach((elem, i) => {

        elem.addEventListener('click', () => {

            insertSliderBtn.innerHTML = `<a>Update</a>`;
            const sliderId = allCardsIds[i].innerText;

            movieSection.classList.remove('movie-section-active');
            insertMainDataSection.classList.remove('insert-movie-items-active');
            sliderSection.classList.remove('slider-content-section-active');

            sliderInsertSection.classList.add('insert-slider-items-Active')

            paginStack.push({
                from: sliderSection,
                to: sliderInsertSection
            });

            specificContent = sliders.filter((elem) => {
                return elem.id == sliderId;
            })

            const { movieId, sliderDiscription, sliderDur, sliderGen, sliderImg, sliderRating, sliderTitle } = specificContent[0];

            slidersContId.value = movieId;
            slidersDes.value = sliderDiscription;
            slidersDur.value = sliderDur;
            slidersGen.value = sliderGen;
            slidersImg.value = sliderImg;
            slidersRat.value = sliderRating;
            slidersTitle.value = sliderTitle;

        })
    })
}

function addSliderBtnF() {
    movieSection.classList.remove('movie-section-active');
    insertMainDataSection.classList.remove('insert-movie-items-active');
    sliderSection.classList.remove('slider-content-section-active');

    clearInputs()

    sliderInsertSection.classList.add('insert-slider-items-Active')
    insertSliderBtn.innerHTML = `<a>Insert</a>`;

    paginStack.push({
        from: sliderSection,
        to: sliderInsertSection
    });
}

insertSliderBtn.addEventListener('click', () => {

    if (insertSliderBtn.innerHTML == '<a>Update</a>') {

        if (slidersDes.value.includes('\'') || slidersDes.value.includes('\"')) {

            let des = slidersDes.value;

            for (let i = 0; i < des.length; i++) {
                if (des[i] === '\'' || des[i] === '\"') {
                    if (des[i - 1] != "\\") {
                        alert('Description contains the ( \' or \" ) please add ( \\ ) back Slash before this ');
                        return;
                    }
                }
            }
        }

        if (confirm('Are Your Sure you Want to Update this content')) {

            var formdata = new FormData();
            formdata.append("contentId", specificContent[0].id);
            formdata.append("contentImg", slidersImg.value);
            formdata.append("contentTitle", slidersTitle.value);
            formdata.append("contentDes", slidersDes.value);
            formdata.append("contentRate", slidersRat.value);
            formdata.append("contentGen", slidersGen.value);
            formdata.append("contentDur", slidersDur.value);
            formdata.append("contentContId", slidersContId.value);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(url + "updateSliders.php", requestOptions)
                .then(response => response.text())
                .then((result) => {

                    let mainResult = JSON.parse(result);

                    notifyMassageContent.innerText = mainResult.massage;
                    notifyMassage.classList.add('notifyMassageActive')

                    setTimeout(function () {
                        notifyMassage.classList.remove('notifyMassageActive');
                    }, 2000);


                    sliderInsertSection.classList.toggle('insert-slider-items-Active')
                    sliderSection.classList.toggle('slider-content-section-active');
                    paginStack.splice(paginStack.length - 1, 1);

                })
                .catch(error => console.log('error', error));
        }
    }
    else if (insertSliderBtn.innerHTML == '<a>Insert</a>') {
        insertSliderData();
    }
})

function insertSliderData() {

    if (slidersDes.value.includes('\'') || slidersDes.value.includes('\"')) {

        let des = slidersDes.value;

        for (let i = 0; i < des.length; i++) {
            if (des[i] === '\'' || des[i] === '\"') {
                if (des[i - 1] != "\\") {
                    alert('Description contains the ( \' or \" ) please add ( \\ ) back Slash before this ');
                    return;
                }
            }
        }
    }

    var formdata = new FormData();
    formdata.append("contentImg", slidersImg.value);
    formdata.append("contentTitle", slidersTitle.value);
    formdata.append("contentDes", slidersDes.value);
    formdata.append("contentRate", slidersRat.value);
    formdata.append("contentGen", slidersGen.value);
    formdata.append("contentDur", slidersDur.value);
    formdata.append("contentContId", slidersContId.value);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch(url + "insertSlider.php", requestOptions)
        .then(response => response.text())
        .then((result) => {

            let mainResult = JSON.parse(result);

            notifyMassageContent.innerText = mainResult.massage;
            notifyMassage.classList.add('notifyMassageActive')

            setTimeout(function () {
                notifyMassage.classList.remove('notifyMassageActive');
            }, 2000);


            sliderInsertSection.classList.toggle('insert-slider-items-Active')
            sliderSection.classList.toggle('slider-content-section-active');
            paginStack.splice(paginStack.length - 1, 1);
        })
        .catch(error => console.log('error', error));
}


// series section start
function loadSeriesData() {

    movieSection.classList.remove('movie-section-active');
    insertMainDataSection.classList.remove('insert-movie-items-active');
    sliderSection.classList.remove('slider-content-section-active');
    sliderInsertSection.classList.remove('insert-slider-items-Active');
    InsertseriesSection.classList.remove('insert-series-items-Active');
    viewSeriesEpSection.classList.remove('view-series-ep-section-active')
    settingSection.classList.remove('setting-section-Active');

    seriesSection.classList.add('series-section-active');
    paginStack = [];

    seriesSection.innerHTML = ``;

    let insertBtn = document.createElement('div');
    insertBtn.setAttribute('id', 'add-content-btn');
    insertBtn.onclick = addSeriesContent;
    insertBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    seriesSection.appendChild(insertBtn);

    let allSearies = movies.filter((elem) => {
        return (elem.contentType == 'series') || (elem.contentType == 'tv shows');
    })

    allSearies.forEach((elem) => {

        const { title, episodesTable, img } = elem;
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
                <img src="${img}" alt="">
                <span style="display: none" class="series-table-names">${episodesTable}</span>
                <span style="display: none" class="series-names">${title}</span>
                <div class="actions">
                    <i class="fa-solid fa-plus" data-add-EP-btn></i>
                    <i class="fa-solid fa-eye" data-view-series-ep></i>
                </div>
        `

        seriesSection.appendChild(card);
    })

    insertSeriesEPBtn();
}

function insertSeriesEPBtn() {

    let addSeriesBtn = Array.from(document.querySelectorAll('[data-add-EP-btn]'));
    let viewSeriesEp = Array.from(document.querySelectorAll('[data-view-series-ep]'));
    let seriesNames = Array.from(document.getElementsByClassName('series-names'));
    let tableNames = Array.from(document.getElementsByClassName('series-table-names'));

    addSeriesBtn.forEach((elem, i) => {

        elem.addEventListener('click', () => {

            clearInputs();
            movieSection.classList.remove('movie-section-active');
            insertMainDataSection.classList.remove('insert-movie-items-active');
            sliderSection.classList.remove('slider-content-section-active');
            sliderInsertSection.classList.remove('insert-slider-items-Active');
            seriesSection.classList.remove('series-section-active');

            InsertseriesSection.classList.add('insert-series-items-Active');

            seriesName.value = seriesNames[i].innerText;
            seriesTablName.value = tableNames[i].innerText;
            InsertseriesBtn.innerHTML = `<a>Insert</a>`;

            paginStack.push({
                from: seriesSection,
                to: InsertseriesSection
            });
        })
    })

    viewSeriesEp.forEach((elem, index) => {

        elem.addEventListener('click', () => {

            movieSection.classList.remove('movie-section-active');
            insertMainDataSection.classList.remove('insert-movie-items-active');
            sliderSection.classList.remove('slider-content-section-active');
            sliderInsertSection.classList.remove('insert-slider-items-Active');
            seriesSection.classList.remove('series-section-active');
            InsertseriesSection.classList.remove('insert-series-items-Active');

            viewSeriesEpSection.classList.add('view-series-ep-section-active');
            CurrSeriesTableN = tableNames[index].innerText;
            CurrSeriesName = seriesNames[index].innerText;

            paginStack.push({
                from: seriesSection,
                to: viewSeriesEpSection
            });


            var formdata = new FormData();
            formdata.append("contentTableN", CurrSeriesTableN);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(url + "getSeriesContent.php", requestOptions)
                .then(response => response.text())
                .then((result) => {
                    let mainResult = JSON.parse(result);
                    episodes = mainResult.data;
                    loadSeriesEpisodes();

                })
                .catch(error => console.log('error', error));
        })
    })
}

function loadSeriesEpisodes() {
    viewSeriesEpSection.innerHTML = ''

    episodes.forEach((elem) => {

        const { EPid, EPImg, EPTitle } = elem;

        const card = document.createElement('div');
        card.classList.add('cart');
        card.innerHTML = `
        <img src="${EPImg}" alt="">
        <span style="display: none" class="ep-card-id">${EPid}</span>
        <div class="card-actions">
            <i class="fa-solid fa-trash" data-ep-delete-icon></i>
            <i class="fa-solid fa-pen" data-ep-update-icon></i>
            <marquee class="ep-card-title">${EPTitle}</marquee>
        </div>`


        viewSeriesEpSection.appendChild(card);

    })

    updateDeleteEpBtn()

}

function updateDeleteEpBtn() {
    let deletItemBtn = Array.from(document.querySelectorAll('[data-ep-delete-icon]'));
    let updateItemBtn = document.querySelectorAll('[data-ep-update-icon]');
    let allEpCardsIds = Array.from(document.querySelectorAll('.ep-card-id'));


    deletItemBtn.forEach((elem, ind) => {

        elem.addEventListener('click', () => {

            if (confirm('Are Your Sure you Want to Delete this content')) {

                var formdata = new FormData();
                formdata.append("itemId", allEpCardsIds[ind].innerText);
                formdata.append("contentTableN", CurrSeriesTableN);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                fetch(url + "deleteEp.php", requestOptions)
                    .then(response => response.text())
                    .then((result) => {
                        let mainResult = JSON.parse(result);

                        notifyMassageContent.innerText = mainResult.massage;
                        notifyMassage.classList.add('notifyMassageActive')

                        setTimeout(function () {
                            notifyMassage.classList.remove('notifyMassageActive');
                        }, 2000);
                    })
                    .catch(error => console.log('error', error));

                let newEpisodes = episodes.filter((elem) => {
                    return elem.EPid != allEpCardsIds[ind].innerText;
                })

                episodes = newEpisodes;
                loadSeriesEpisodes();
            }
        })
    })

    updateItemBtn.forEach((elem, ind) => {

        elem.addEventListener('click', () => {

            isSeries = true;
            clearInputs()
            movieSection.classList.remove('movie-section-active');
            insertMainDataSection.classList.remove('insert-movie-items-active');
            sliderSection.classList.remove('slider-content-section-active');
            sliderInsertSection.classList.remove('insert-slider-items-Active');
            seriesSection.classList.remove('series-section-active');
            viewSeriesEpSection.classList.remove('view-series-ep-section-active')

            InsertseriesSection.classList.add('insert-series-items-Active');
            InsertseriesBtn.innerHTML = `<a>Update</a>`;
            updateSeriesCardId = allEpCardsIds[ind].innerText;

            paginStack.push({
                from: viewSeriesEpSection,
                to: InsertseriesSection
            });

            let spicificEpisodes = episodes.filter((elem) => {
                return elem.EPid == allEpCardsIds[ind].innerText;
            })

            spicificEpisodes = spicificEpisodes[0];

            seriesName.value = CurrSeriesName;
            epImg.value = spicificEpisodes.EPImg;
            epTitle.value = spicificEpisodes.EPTitle;
            epDura.value = spicificEpisodes.EPDura;
            epDate.value = spicificEpisodes.EPDate;
            seriesTablName.value = CurrSeriesTableN;
            epUrl.value = spicificEpisodes.EPUrl;
            epDesc.value = spicificEpisodes.EPDescri;
            epNo.value = spicificEpisodes.EPNo;

        })
    })
}

InsertseriesBtn.addEventListener('click', () => {

    if (InsertseriesBtn.innerHTML == `<a>Insert</a>`) {

        if (epDesc.value.includes('\'') || epDesc.value.includes('\"')) {

            let des = epDesc.value;
            for (let i = 0; i < des.length; i++) {
                if (des[i] === '\'' || des[i] === '\"') {
                    if (des[i - 1] != "\\") {
                        alert('Description contains the ( \' or \" ) please add ( \\ ) back Slash before this ');
                        return;
                    }
                }
            }
        }

        var formdata = new FormData();
        formdata.append("contentImg", epImg.value);
        formdata.append("contentTitle", epTitle.value);
        formdata.append("contentDur", epDura.value);
        formdata.append("contentDate", epDate.value);
        formdata.append("contentTableN", seriesTablName.value);
        formdata.append("contentEpUrl", epUrl.value);
        formdata.append("contentDesc", epDesc.value);
        formdata.append("contentEpNo", epNo.value);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(url + "insertSeriesEP.php", requestOptions)
            .then(response => response.text())
            .then((result) => {

                let mainResult = JSON.parse(result);

                notifyMassageContent.innerText = mainResult.massage;
                notifyMassage.classList.add('notifyMassageActive');

                setTimeout(function () {
                    notifyMassage.classList.remove('notifyMassageActive');
                }, 2000);


                InsertseriesSection.classList.toggle('insert-series-items-Active')
                seriesSection.classList.toggle('series-section-active');
                paginStack.splice(paginStack.length - 1, 1);
            })
            .catch(error => console.log('error', error));
    }
    else if (InsertseriesBtn.innerHTML == `<a>Update</a>`) {

        if (epDesc.value.includes('\'') || epDesc.value.includes('\"')) {

            let des = epDesc.value;
            for (let i = 0; i < des.length; i++) {
                if (des[i] === '\'' || des[i] === '\"') {
                    if (des[i - 1] != "\\") {
                        alert('Description contains the ( \' or \" ) please add ( \\ ) back Slash before this ');
                        return;
                    }
                }
            }
        }

        if (confirm('Are Your Sure you Want to Update this content')) {


            var formdata = new FormData();
            formdata.append("contentImg", epImg.value);
            formdata.append("contentTitle", epTitle.value);
            formdata.append("contentDur", epDura.value);
            formdata.append("contentDate", epDate.value);
            formdata.append("contentTableN", seriesTablName.value);
            formdata.append("contentid", updateSeriesCardId);
            formdata.append("contentEpUrl", epUrl.value);
            formdata.append("contentDesc", epDesc.value);
            formdata.append("contentEpNo", epNo.value);


            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(url + "updateSeriesEp.php", requestOptions)
                .then(response => response.text())
                .then((result) => {

                    let mainResult = JSON.parse(result);

                    notifyMassageContent.innerText = mainResult.massage;
                    notifyMassage.classList.add('notifyMassageActive')

                    setTimeout(function () {
                        notifyMassage.classList.remove('notifyMassageActive');
                    }, 2000);


                    viewSeriesEpSection.classList.toggle('view-series-ep-section-active');
                    InsertseriesSection.classList.toggle('insert-series-items-Active');
                    paginStack.splice(paginStack.length - 1, 1);
                })
                .catch(error => console.log('error', error));
        }
    }
})

function addSeriesContent() {

    isSeries = true;
    clearInputs();

    contentUrl.value = Math.floor((Math.random() * 100) + 1) + '';
    contentDuration.value = 'none'

    contentUrl.disabled = true;
    contentDuration.disabled = true;
    contentEpTableName.disabled = false;
    contentFromLa.style.display = 'none';


    movieSectionInsertBtn.innerHTML = `<a>Insert</a>`
    seriesSection.classList.remove('series-section-active');
    insertMainDataSection.classList.add('insert-movie-items-active');

    paginStack.push({
        from: seriesSection,
        to: insertMainDataSection
    });
}


// setting section start
function loadSetting() {
    movieSection.classList.remove('movie-section-active');
    insertMainDataSection.classList.remove('insert-movie-items-active');
    sliderSection.classList.remove('slider-content-section-active');
    sliderInsertSection.classList.remove('insert-slider-items-Active');
    InsertseriesSection.classList.remove('insert-series-items-Active');
    viewSeriesEpSection.classList.remove('view-series-ep-section-active')
    seriesSection.classList.remove('series-section-active');
    paginStack = [];

    settingSection.classList.add('setting-section-Active');
    UpdateUserPasswordName();
}

function UpdateUserPasswordName() {

    let updateBtn = document.querySelector('#update-userName-password');
    let nameInput = document.querySelector('#userName');
    let passwordInput = document.querySelector('#Password');

    updateBtn.addEventListener('click', () => {

        if (nameInput.value != '' && passwordInput != '') {
            if (confirm('Are you Sure Your want to Update Admin UserName and Password')) {
                var formdata = new FormData();
                formdata.append("adminName", nameInput.value);
                formdata.append("adminPass", passwordInput.value);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                fetch(url + "updateAdmin.php", requestOptions)
                    .then(response => response.text())
                    .then((result) => {

                        nameInput.value = '';
                        passwordInput.value = '';

                        notifyMassageContent.innerText = JSON.parse(result).massage;
                        notifyMassage.classList.add('notifyMassageActive')

                        setTimeout(function () {
                            notifyMassage.classList.remove('notifyMassageActive');
                        }, 2000);
                    })
                    .catch(error => console.log('error', error));
            }
        }
        else {
            alert('Please Enter the Specific Field!')
        }
    })
}

// go back btn code start
backBtn.addEventListener('click', () => {

    if (paginStack.length > 0) {

        const fromPage = paginStack[paginStack.length - 1].from;
        const toPage = paginStack[paginStack.length - 1].to;

        if (fromPage == movieSection && toPage == insertMainDataSection) {
            insertMainDataSection.classList.toggle('insert-movie-items-active');
            movieSection.classList.toggle('movie-section-active');
        }
        else if (fromPage == sliderSection && toPage == sliderInsertSection) {
            sliderInsertSection.classList.toggle('insert-slider-items-Active')
            sliderSection.classList.toggle('slider-content-section-active');
        }
        else if (fromPage == seriesSection && toPage == InsertseriesSection) {
            InsertseriesSection.classList.toggle('insert-series-items-Active')
            seriesSection.classList.toggle('series-section-active');
        }
        else if (fromPage == seriesSection && toPage == viewSeriesEpSection) {
            viewSeriesEpSection.classList.toggle('view-series-ep-section-active')
            seriesSection.classList.toggle('series-section-active');
        }
        else if (fromPage == viewSeriesEpSection && toPage == InsertseriesSection) {
            viewSeriesEpSection.classList.toggle('view-series-ep-section-active');
            InsertseriesSection.classList.toggle('insert-series-items-Active');
        }
        else if (fromPage == seriesSection && toPage == insertMainDataSection) {
            seriesSection.classList.toggle('series-section-active');
            insertMainDataSection.classList.toggle('insert-movie-items-active');
        }

        paginStack.splice(paginStack.length - 1, 1);
        clearInputs()
    }
})


// clear all inputs
function clearInputs() {

    let allInputs = Array.from(document.getElementsByClassName('inputs'));
    allInputs.forEach((elem) => {
        elem.value = '';
        elem.checked = false;
    })

    content_from_section.innerHTML = `select <i class="fa-sharp fa-solid fa-caret-down">`;
    content_type_section.innerHTML = `select <i class="fa-sharp fa-solid fa-caret-down">`;
}

// drop down code start
content_type_drop_down_items.forEach((elem) => {
    elem.addEventListener('click', () => {
        content_type_section.innerHTML = `${elem.innerText} <i class="fa-sharp fa-solid fa-caret-down">`;
    })
})


if (!isSeries) {
    content_from_drop_down_items.forEach((elem) => {
        elem.addEventListener('click', () => {
            content_from_section.innerHTML = `${elem.innerText} <i class="fa-sharp fa-solid fa-caret-down">`;
        })
    })
}


