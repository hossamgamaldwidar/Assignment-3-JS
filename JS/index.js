var titleInput = document.getElementById('titleInput');
var urlInput = document.getElementById('urlInput');
var submitBtn = document.getElementById('submitBtn');
var bigWindowAlert1 = document.getElementById('bigWindowAlert1');
var bigWindowAlert2 = document.getElementById('bigWindowAlert2');
var bigWindowAlert3 = document.getElementById('bigWindowAlert3');
var bookmarks = [];
if (localStorage.getItem('allBookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('allBookmarks'));
    displayBookmarks();
}

function isValidURL(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return true;
    }
    return false;
}
function addBookmark() {
    if (titleInput.value.trim() === '' || urlInput.value.trim() === '') {
        getAlert()
        return

    }
    if (titleInput.value.trim().length < 3) {
        getAlert()
        return;
    }
    if (!isValidURL(urlInput.value.trim())) {
        getAlert()
        return;
    }

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].title === titleInput.value) {
            getAlert2()
            return;
        }
        if (bookmarks[i].url === urlInput.value) {
            getAlert3()
            return;
        }
    }

    var bookmark = {
        title: titleInput.value,
        url: urlInput.value
    };
    bookmarks.push(bookmark);
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
    titleInput.value = '';
    urlInput.value = '';
}


function displayBookmarks() {
    var bookmarksContainer = "";

    for (var i = 0; i < bookmarks.length; i++) {
        bookmarksContainer += `
        <div>${i + 1}</div>
        <div>${bookmarks[i].title}</div>
        <div><a href="${bookmarks[i].url}" target="_blank"><button class="visit-btn"><i class="fa-solid fa-eye"></i> Visit</button></a>
        </div>
        <div><button class="delete-btn" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
        </div>
        `;
    }
    document.getElementById("table-allbookmark").innerHTML = bookmarksContainer;
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}
function getAlert() {
    bigWindowAlert1.classList.remove('d-none')
}
function closeAlert() {
    bigWindowAlert1.classList.add('d-none')
}
function getAlert2() {
    bigWindowAlert2.classList.remove('d-none')
}
function closeAlert2() {
    bigWindowAlert2.classList.add('d-none')
}
function getAlert3() {
    bigWindowAlert3.classList.remove('d-none')
}
function closeAlert3() {
    bigWindowAlert3.classList.add('d-none')
}


