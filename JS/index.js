var titleInput = document.getElementById('titleInput');
var urlInput = document.getElementById('urlInput');
var submitBtn = document.getElementById('submitBtn');
var bigWindowAlert1 = document.getElementById('bigWindowAlert1');
var bigWindowAlert2 = document.getElementById('bigWindowAlert2');
var bigWindowAlert3 = document.getElementById('bigWindowAlert3');
var bigWindowAlert4 = document.getElementById('bigWindowAlert4');
var titleInputUpdate = document.getElementById("titleInputUpdate");
var urlInputUpdate = document.getElementById('urlInputUpdate');
var lastIndex;
var lastIndexD;
var bookmarks = [];

if (localStorage.getItem('allBookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('allBookmarks'));
    displayBookmarks(bookmarks);  // عرض جميع الـ bookmarks عند تحميل الصفحة
}

function isValidURL(url) {
    return url.startsWith('http://') || url.startsWith('https://');
}

function addBookmark() {
    if (titleInput.value.trim() === '' || urlInput.value.trim() === '') {
        getAlert();
        return;
    }
    if (titleInput.value.trim().length < 3) {
        getAlert();
        return;
    }
    if (!isValidURL(urlInput.value.trim())) {
        getAlert();
        return;
    }

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].title === titleInput.value) {
            getAlert2();
            return;
        }
        if (bookmarks[i].url === urlInput.value) {
            getAlert3();
            return;
        }
    }

    var bookmark = {
        title: titleInput.value,
        url: urlInput.value
    };
    bookmarks.push(bookmark);
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    clearBookmarkForm();
    displayBookmarks(bookmarks); // عرض الـ bookmarks بعد الإضافة
}

function displayBookmarks(bookmarksToDisplay) {
    var bookmarksContainer = "";
    for (var i = 0; i < bookmarksToDisplay.length; i++) {
        bookmarksContainer += `
        <div>${i + 1}</div>
        <div>${bookmarksToDisplay[i].title}</div>
        <div><a href="${bookmarksToDisplay[i].url}" target="_blank"><button class="visit-btn"><i class="fa-solid fa-eye"></i> Visit</button></a></div>
        <div><button class="delete-btn" onclick="getAlert4(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></div>
        <div><button class="update-btn" onclick="getUpdatAlert(${i})"><i class="fa-solid fa-pen-to-square"></i> Update</button></div>
        `;
    }
    document.getElementById("table-allbookmark").innerHTML = bookmarksContainer;
}
function getAlert4(index) {
    bigWindowAlert4.classList.remove('d-none');
    lastIndexD = index;
}
function deleteBookmark() {
    bookmarks.splice(lastIndexD, 1);
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    displayBookmarks(bookmarks); 
    closeAlert4(); 
}

function clearBookmarkForm() {
    titleInput.value = '';
    urlInput.value = '';
    titleInputUpdate.value = '';
    urlInputUpdate.value = '';
}

function getUpdatAlert(index) {
    bigWindowupdate.classList.remove('d-none');
    titleInputUpdate.value = bookmarks[index].title;
    urlInputUpdate.value = bookmarks[index].url;
    lastIndex = index;
}

function updateBookmark() {
    var updatedTitle = titleInputUpdate.value.trim();
    var updatedURL = urlInputUpdate.value.trim();

    if (updatedTitle === '' || updatedURL === '') {
        closeUpdatAlert();
        getAlert();
        return;
    }
    if (updatedTitle.length < 3) {
        closeUpdatAlert();
        getAlert();
        return;
    }
    if (!isValidURL(updatedURL)) {
        closeUpdatAlert();
        getAlert();
        return;
    }

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].title === updatedTitle && i !== lastIndex) {
            closeUpdatAlert();
            getAlert2();
            return;
        }
        if (bookmarks[i].url === updatedURL && i !== lastIndex) {
            closeUpdatAlert();
            getAlert3();
            return;
        }
    }
    bookmarks[lastIndex].title = updatedTitle;
    bookmarks[lastIndex].url = updatedURL;
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    clearBookmarkForm();
    closeUpdatAlert();
    displayBookmarks(bookmarks); 
}

function getAlert() {
    bigWindowAlert1.classList.remove('d-none');
}

function closeAlert() {
    bigWindowAlert1.classList.add('d-none');
}

function getAlert2() {
    bigWindowAlert2.classList.remove('d-none');
}

function closeAlert2() {
    bigWindowAlert2.classList.add('d-none');
}

function getAlert3() {
    bigWindowAlert3.classList.remove('d-none');
}

function closeAlert3() {
    bigWindowAlert3.classList.add('d-none');
}

// function getAlert4() {
//     bigWindowAlert4.classList.remove('d-none');
// }

function closeAlert4() {
    bigWindowAlert4.classList.add('d-none');
}


function closeUpdatAlert() {
    bigWindowupdate.classList.add('d-none');
}
function searchBookmarks(searchkey) {
    var result = [];
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].title.toLowerCase().trim().includes(searchkey.toLowerCase().trim())) {
            result.push(bookmarks[i]);
        }
    }
    displayBookmarks(result);
}