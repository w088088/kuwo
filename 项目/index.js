let recommendedList = document.getElementsByClassName("recommended-list")[0]
//推荐歌单的接口数组
let arr =
    ["http://localhost:9090/api/www/rcm/index/playlist?id=rcm&pn=1&rn=5&httpsStatus=1&reqId=6a8081f0-e40c-11ec-a95c-797c9dc738d6",
        "http://localhost:9090/api/www/classify/playlist/getTagPlayList?id=1848&pn=1&rn=5&httpsStatus=1&reqId=b8942c40-e414-11ec-a999-0b9c58bde6bc",
        "http://localhost:9090/api/www/classify/playlist/getTagPlayList?id=621&pn=1&rn=5&httpsStatus=1&reqId=c2743fc0-e414-11ec-a999-0b9c58bde6bc",
        "http://localhost:9090/api/www/classify/playlist/getTagPlayList?id=146&pn=1&rn=5&httpsStatus=1&reqId=e5e4aad0-e414-11ec-a999-0b9c58bde6bc",
        "http://localhost:9090/api/www/classify/playlist/getTagPlayList?id=35&pn=1&rn=5&httpsStatus=1&reqId=f491afb0-e414-11ec-a999-0b9c58bde6bc"
    ]
//歌手推荐的接口数组
let singerListArr = [
    'http://localhost:9090/api/www/artist/artistInfo?category=11&pn=1&rn=6&httpsStatus=1&reqId=1f7b2ad0-e48d-11ec-8e66-390f47003596',
    'http://localhost:9090/api/www/artist/artistInfo?category=13&pn=1&rn=6&httpsStatus=1&reqId=ff522d20-e48d-11ec-8e66-390f47003596',
    'http://localhost:9090/api/www/artist/artistInfo?category=12&pn=1&rn=6&httpsStatus=1&reqId=061919c0-e48e-11ec-8e66-390f47003596',
    'http://localhost:9090/api/www/artist/artistInfo?category=16&pn=1&rn=6&httpsStatus=1&reqId=0c8ba4d0-e48e-11ec-8e66-390f47003596'
]
//进页面请求的数据
getlist1(arr[0])
let x = 0
let recommendeds = document.getElementsByClassName("recommended")[0].getElementsByTagName("li")
let songerWrap = document.getElementsByClassName("songer-wrap")[0]
recommendeds[0].firstChild.classList.add("active")
Array.from(recommendeds).splice(0, 5).forEach((item, index) => {
    item.onclick = function () {
        recommendeds[x].firstChild.classList.remove("active")
        getlist1(arr[index])
        this.firstChild.classList.add("active")
        x = index
    }
})

//进页面请求的数据
getSongerList(singerListArr[0])
let songerListBtn = document.getElementsByClassName("songer-list")[0].getElementsByTagName("li")
let songerListBtnIndex = 0
songerListBtn[0].firstChild.classList.add("active")
Array.from(songerListBtn).splice(0, 4).forEach((item, index) => {
    item.onclick = function () {
        songerListBtn[songerListBtnIndex].firstChild.classList.remove("active")
        this.firstChild.classList.add("active")
        getSongerList(singerListArr[index])
        songerListBtnIndex = index
    }
})
//推荐歌单列表
function getlist1(index) {
    fetch(index)
        .then(r => r.json())
        .then(res => {
            console.log(res);
            recommendedList.innerHTML = ""
            get(res.data.list || res.data.data)
        })
}
//推荐歌单列表
function get(a) {
    a.slice(0, 5).forEach((item, index) => {
        recommendedList.innerHTML += `
    <li data-id=${item.id}>
        <div>
            <img data-id=${item.id} src="${item.img}" alt="">
        </div>
        <p>
            <span>${item.name}</span>
        </p>
        <p>
            <i class="iconfont icon-24gl-play"></i>
            <span>${(item.listencnt > 10000 ? (item.listencnt / 10000).toFixed(1) + '万' : item.listencnt)}</span>
        </p>
    </li>
`
    })
    let lis = document.getElementById("recommended-list").getElementsByTagName("li")
    // console.log(lis);
    Array.from(lis).forEach((item, index) => {
        item.onclick = function () {
            window.location.href = `./playListDetail.html?sid=${item.dataset.id}`
        }
    })
}
//推荐歌手
function getSongerList(index) {
    fetch(index)
        .then(r => r.json())
        .then(res => {
            songerWrap.innerHTML = ""
            console.log(res);
            res.data.artistList.forEach((item, index) => {
                songerWrap.innerHTML += `
            <li class="song" data-i=${item.id}>
                <img src="${item.pic}" alt="">
                <p>
                    ${item.name}
                </p>
                <span>${item.musicNum}<span>首歌曲</span></span>
            </li>
            `
            })
            let song = document.getElementsByClassName("song")
            console.log(song);
            Array.from(song).forEach((item, index) => {
                item.onclick = function () {
                    window.location.href = `./singerDetail.html?singerid=${item.dataset.i
                        }`
                }
            })
        })


}
//轮播图
let wrap = document.getElementsByClassName("wrap")[0]
let imgWarp = document.getElementsByClassName("imgs")[0]
let imgs = imgWarp.children;
let next = document.getElementById("next")
let prev = document.getElementById("prev")
let dotWrap = document.getElementById("dots")
for (let i = 0; i < imgs.length; i++) {
    dotWrap.innerHTML += `
            <li></li>
        `
}
let dots = dotWrap.children
dots[0].style.opacity = 1
let node = imgs[0].cloneNode(true)
imgWarp.appendChild(node)
imgWarp.style.width = 1400 * imgs.length + "px"
let xx = 0
let flag = true
imgWarp.addEventListener("transitionend", function () {
    if (xx == imgs.length - 1) {
        xx = 0
        imgWarp.style.transition = "none"
        imgWarp.style.marginLeft = 0
        setTimeout(() => {
            imgWarp.style.transition = "all .5s"
        }, 16.7)
    }
    flag = true
})
next.onclick = nextFun
prev.onclick = prevFun
function nextFun() {
    if (flag) {
        flag = false
        dots[xx].style.opacity = 0.2
        xx++
        dots[xx > dots.length - 1 ? 0 : xx].style.opacity = 1
        imgWarp.style.marginLeft = -1400 * xx + "px"
    }
}
function prevFun() {
    if (flag) {
        flag = false
        dots[xx].style.opacity = 0.2
        xx--
        dots[xx == -1 ? dots.length - 1 : xx].style.opacity = 1
        if (xx == -1) {
            imgWarp.style.transition = "none"
            imgWarp.style.marginLeft = -1400 * (imgs.length - 1) + "px"
            setTimeout(() => {
                imgWarp.style.transition = "all .5s"
                xx = imgs.length - 2
                imgWarp.style.marginLeft = -1400 * xx + "px"
            }, 16.7)
        } else {
            imgWarp.style.marginLeft = -1400 * xx + "px"
        }
    }
}
let timer = setInterval(nextFun, 2000)
wrap.onmouseover = function () {
    clearInterval(timer)
}
wrap.onmouseout = function () {
    timer = setInterval(nextFun, 2000)
}
Array.from(dots).forEach((item, index) => {
    item.onclick = function () {
        dots[xx].style.opacity = 0.2
        this.style.opacity = 1
        xx = index
        imgWarp.style.marginLeft = -1400 * xx + "px"
    }
})
let rangingWrap = document.getElementById("ranging-wrap")
//排行榜列表
fetch(`http://localhost:9090/api/www/bang/index/bangList?httpsStatus=1&reqId=251b0870-e802-11ec-a701-5999c9ea490f`)
    .then(r => r.json())
    .then(res => {
        console.log(res);
        let typeStr = ""
        res.data.forEach((type, typeindex) => {
            let lisStr = ""
            type.musicList.slice(0, 5).forEach((item, index) => {
                lisStr += `
                     <li >
                        <div class="number">
                            ${index + 1 == 1 ? '<img src="https://h5static.kuwo.cn/www/kw-www/img/icon_first.df06fb1.png">' : index + 1 == 2 ? '<img src="https://h5static.kuwo.cn/www/kw-www/img/icon_secondary.d99e73e.png">' : index + 1 == 3 ? '<img src="https://h5static.kuwo.cn/www/kw-www/img/icon_third.8abbb65.png">' : index + 1}
                        </div>
                        <div>
                            <p class="songerId" data-id=${item.rid}>${item.album}</p>
                            <p class="singerId" data-id=${item.artistid}>${item.artist}</p>
                        </div>
                    </li>
                `
            })
            typeStr += `
            <div class="ranking-item">
                <div class="item-top">
                    <img src="${type.pic}" alt="">
                </div>
                <ul class="item-bottom">
                ${lisStr}
                </ul>
            </div>
            `
        })
        rangingWrap.innerHTML += typeStr
        let lis = document.getElementsByClassName("songerId")
        let sid = document.getElementsByClassName("singerId")
        Array.from(lis).forEach((item, index) => {
            item.onclick = function () {
                window.location.href = `./detail.html?songerId=${item.dataset.id}`
            }
        })
        Array.from(sid).forEach((item, index) => {
            item.onclick = function () {
                window.location.href = `./singerDetail.html?singerid=${item.dataset.id
                    }`
            }
        })
    })