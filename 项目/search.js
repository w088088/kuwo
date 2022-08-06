let searchVall = location.href.split("?")[1].split("=")[1]
let searchInp = document.getElementById("searchInp")
searchInp.value = decodeURIComponent(searchVall)
searchInp.onkeydown = function (e) {
    if (e.keyCode == 13) {
        searchVall = searchInp.value
        send(searchArr[0], 0)
        searchArr = [
            `http://localhost:9090/api/www/search/searchMusicBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=cbb9bf20-e931-11ec-afbe-af733d8328d5`,
            `http://localhost:9090/api/www/search/searchAlbumBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=6604e210-e934-11ec-afbe-af733d8328d5`,
            `http://localhost:9090/api/www/search/searchMvBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=9f28dfb0-e934-11ec-afbe-af733d8328d5`,
            `http://localhost:9090/api/www/search/searchPlayListBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=cff27f70-e934-11ec-afbe-af733d8328d5`,
            `http://localhost:9090/api/www/search/searchArtistBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=d664bc60-e934-11ec-afbe-af733d8328d5`
        ]
    }
}
let searchArr = [
    `http://localhost:9090/api/www/search/searchMusicBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=cbb9bf20-e931-11ec-afbe-af733d8328d5`,
    `http://localhost:9090/api/www/search/searchAlbumBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=6604e210-e934-11ec-afbe-af733d8328d5`,
    `http://localhost:9090/api/www/search/searchMvBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=9f28dfb0-e934-11ec-afbe-af733d8328d5`,
    `http://localhost:9090/api/www/search/searchPlayListBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=cff27f70-e934-11ec-afbe-af733d8328d5`,
    `http://localhost:9090/api/www/search/searchArtistBykeyWord?key=${searchVall}&pn=1&rn=30&httpsStatus=1&reqId=d664bc60-e934-11ec-afbe-af733d8328d5`
]
console.log(searchArr);
let topListBtn = document.getElementsByClassName("top-list")[0].getElementsByTagName("li")
let wrap = document.getElementsByClassName("wrap")[0].getElementsByTagName("ul")
let x = 0
let tab1 = document.getElementById("tab1")
let tab2 = document.getElementById("tab2")
let tab3 = document.getElementById("tab3")
let tab4 = document.getElementById("tab4")
let tab5 = document.getElementById("tab5")
let mainBtns = document.getElementsByClassName("main-btns")[0]
// console.log(mainBtns);
topListBtn[0].classList.add("active")
wrap[0].style.display = "block"
Array.from(topListBtn).forEach((item, index) => {
    item.onclick = function () {
        topListBtn[x].classList.remove("active")
        wrap[x].style.display = "none"
        this.classList.add("active")
        x = index
        wrap[x].style.display = "block"
        send(searchArr[x], x)
    }
})
function send(searchBtnIndex, index) {
    fetch(searchBtnIndex)
        .then(r => r.json())
        .then(res => {
            if (index == 0) {
                tab1.innerHTML = `
            <li>
                <p>序号</p>
                <p>歌曲</p>
                <p>歌手</p>
                <p>专辑</p>
                <p>时长</p>
            </li>
                `
                get1(res)
                let songerId = document.getElementsByClassName("songerid")
                let singerid = document.getElementsByClassName("singerid")
                console.log(songerId);
                Array.from(songerId).forEach((item, index) => {
                    item.onclick = function () {
                        window.location.href = `Detail.html?sid=${item.dataset.id}`
                    }
                })
                Array.from(singerid).forEach((item, index) => {
                    item.onclick = function () {
                        window.location.href = `singerDetail.html?singerid=${item.dataset.id}`
                    }
                })
            }
            if (index == 1) {
                tab2.innerHTML = ""
                get2(res)
            }
            if (index == 2) {
                tab3.innerHTML = ""
                get3(res)
            }
            if (index == 3) {
                tab4.innerHTML = ""
                get4(res)
            }
            if (index == 4) {
                tab5.innerHTML = ""
                get5(res)
            }
        })

}

function get1(res) {
    return res.data.list.forEach((item, index) => {
        console.log(item);
        tab1.innerHTML += `
        <li>
            <p>
                <span>${index + 1}</span>
                <span>
                    <img src="${item.albumpic}" alt="">
                </span>
            </p>
            <p data-id=${item.rid} class="songerid">${item.name}</p>
            <p data-id=${item.artistid} class="singerid">${item.artist}</p>
            <p>${item.album}</p>
            <p>${item.songTimeMinutes}</p>
        </li>
        `
    })
}
function get2(res) {
    res.data.albumList.forEach((item, index) => {
        tab2.innerHTML += `
        <li>
            <img src="${item.pic}">
            <div>
                <p>${item.album}</p>
                <p>${item.releaseDate}</p>
            </div>
        </li>
    `
    })

}
function get3(res) {
    return res.data.mvlist.forEach((item, index) => {
        tab3.innerHTML += `
        <li>
            <img src="${item.pic}">
            <div>
                <p>${item.name}</p>
                <p>${item.artist}</p>
            </div>
        </li>
        `
    })
}
function get4(res) {
    return res.data.list.forEach((item, index) => {
        tab4.innerHTML += `
        <li>
            <img src="${item.img}">
            <div>
                <p>${item.name}</p>
                <p>${(item.listencnt / 10000).toFixed(1)}万</p>
            </div>
        </li>
        `
    })
}
function get5(res) {
    return res.data.list.forEach((item, index) => {
        tab5.innerHTML += `
        <li>
            <img src="${item.pic300}">
            <div>
                <p>${item.name}</p>
                <p>${(item.musicNum)}首歌曲</p>
            </div>
        </li>
        `
    })
}
send(searchArr[0], 0)