let singerid = location.href.split("?")[1].split("=")[1]
fetch(`http://localhost:9090/api/www/artist/artist?artistid=${singerid}&httpsStatus=1&reqId=174baf90-e895-11ec-b2bd-a3ad7bf7415b`)
    .then(r => r.json())
    .then(res => {
        console.log(res);
        singerInfo.innerHTML += `
                <div class="img">
                    <img src="${res.data.pic300}" alt="">
                </div>
                <div class="detailInfo">
                    <h3>${res.data.name}</h3>
                    <p class="info">
                        <span>单曲：${res.data.musicNum}</span>
                        <span>专辑：${res.data.albumNum}</span>
                        <span>MV:${res.data.mvNum}</span>
                        <span>粉丝:${(res.data.artistFans / 10000).toFixed(1)}W</span>
                    </p>
                    <p class="itemInfo">
                        <span>英文名：${res.data.aartist}</span>
                        <span>国籍：${res.data.country}</span>
                        <span>语言：${res.data.language}</span>
                        <span>出生地：${res.data.birthplace}</span>
                    </p>
                    <p class="playBtn">
                        <button><i></i>播放全部歌曲</button>
                        <button><i></i>收藏</button>
                        <button><i></i>使用客户端查看歌手</button>
                    </p>
                </div>
        `
    })


let arr = [
    `http://localhost:9090/api/www/artist/artistMusic?artistid=${singerid}&pn=1&rn=30&httpsStatus=1&reqId=1fa68b30-e8ac-11ec-a08e-9fd2264696ef`,
    `http://localhost:9090/api/www/artist/artistAlbum?artistid=${singerid}&pn=1&rn=28&httpsStatus=1&reqId=3c924d50-e8ad-11ec-a7ba-531793331b9c`,
    `http://localhost:9090/api/www/artist/artistMv?artistid=${singerid}&pn=1&rn=28&httpsStatus=1&reqId=e9423080-e8b0-11ec-a5b4-2f9088445fe3`,
    `http://localhost:9090/api/www/artist/artist?artistid=${singerid}&httpsStatus=1&reqId=174baf90-e895-11ec-b2bd-a3ad7bf7415b`
]
let x = 0;
let singgerDetailBtn = document.getElementById("singgerDetailBtn").getElementsByTagName("li")
let singerDetailList = document.getElementById("singerDetailList")
singgerDetailBtn[0].classList.add("active")
Array.from(singgerDetailBtn).forEach((item, index) => {
    item.onclick = function () {
        singgerDetailBtn[x].classList.remove("active")
        this.classList.add("active")
        x = index
        send(arr[x], index)
    }
})
function send(index, ind) {
    fetch(index)
        .then(r => r.json())
        .then(res => {
            console.log(res);
            if (ind == 0) {
                singerDetailList.innerHTML = `
                <li>
                    <p>序号</p>
                    <p>歌曲</p>
                    <p>专辑</p>
                    <p>时长</p>
                </li>`
                get1(res)
            }
            if (ind == 1) {
                singerDetailList.innerHTML = ""
                get2(res)
            }
            if (ind == 2) {
                singerDetailList.innerHTML = ""
                get3(res)
            }
        })
}

function get1(res) {
    return res.data.list.forEach((item, ind) => {
        // console.log(item);
        singerDetailList.innerHTML += `
                <li>
                    <p class="ico">
                        <span>${ind + 1}</span>
                        <span><img src="${item.albumpic}" alt=""></span>
                    </p>
                    <p class="detail-rid"data-id="${item.rid}">${item.name}</p>
                    <p class="detail-albumid"data-id="${item.albumid}">${item.album}</p>
                    <p>${item.songTimeMinutes}</p>
                </li>
            
            `
        let detailRid = document.getElementsByClassName("detail-rid")
        let detailAlbumid = document.getElementsByClassName("detail-albumid")
        Array.from(detailRid).forEach((item, index) => {
            item.onclick = function () {
                window.location.href = `./detail.html?rid=${item.dataset.id}`
            }
        })
        Array.from(detailAlbumid).forEach((item, index) => {
            item.onclick = function () {
                //目前还没写对应的页面
                // window.location.href = `./detail.html?rid=${item.dataset.id}`
            }
        })
    })
}
function get2(res) {
    return res.data.albumList.forEach((item, index) => {
        singerDetailList.innerHTML += `
            <li class="albums">
                <img src="${item.pic}">
                <p>
                    <span>${item.album}</span>
                    <span>${item.releaseDate}</span>
                </p>
            </li>
        `
    })

}
function get3(res) {
    return res.data.mvlist.forEach((item, index) => {
        singerDetailList.innerHTML += `
            <li class="albums mv">
                <img src="${item.pic}">
                <p>
                    <span>${item.name}</span>
                    <span>${item.artist}</span>
                </p>
            </li>
        `
    })
}
send(arr[0], 0)