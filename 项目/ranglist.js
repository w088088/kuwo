let mainBottom = document.getElementsByClassName("main-bottom")[0]
let mainTop = document.getElementsByClassName("main-top")[0]
let mainRgith = document.getElementsByClassName("main-right-top")[0]
let d = new Date()
let y = d.getFullYear()
let m = d.getMonth() + 1
let day = d.getDate()
day = day > 9 ? day : "0" + day
m = m > 9 ? m : "0" + m
mainRgith.innerHTML = `
<span>酷我飙升榜</span>
<span>更新时间${y}-${m}-${day}</span>
`
fetch(`http://localhost:9090/api/www/bang/bang/bangMenu?httpsStatus=1`)
    .then(r => r.json())
    .then(res => {
        console.log(res);
        res.data.slice(0, 3).forEach((item, index) => {
            mainTop.innerHTML += `
        <li ><a href="javascript:;">${item.name}</a></li>
    `
        })
        let x = 0
        let listbtn = mainTop.getElementsByTagName("li")
        listbtn[0].classList.add("active")
        Array.from(listbtn).forEach((item, index) => {
            item.onclick = function () {
                listbtn[x].classList.remove("active")
                this.classList.add("active")
                getlist1(index)
                getlist2(index == 0 ? 93 : index == 1 ? 242 : index == 2 ? 279 : '')
                x = index
                mainRgith.innerHTML = `
                 <span>${index == 0 ? "酷我飙升榜" : index == 1 ? "极品电音榜" : index == 2 ? "夏日畅爽版" : ''}</span>
                 <span>更新时间${y}-${m}-${day}</span>
                `
            }
        })
    })


function getlist1(index) {
    fetch(`http://localhost:9090/api/www/bang/bang/bangMenu?httpsStatus=1`)
        .then(r => r.json())
        .then(res => {
            console.log(res);
            mainBottom.innerHTML = ""
            res.data[index].list.forEach((item, index) => {
                mainBottom.innerHTML += `
                <li data-id = ${item.sourceid}>
                    <img src="${item.pic}" alt="">
                    <div>
                        <p>${item.name}</p>
                        <p>${item.pub}</p>
                    </div>
                </li>
                `
            })
            let mainBottomList = document.getElementsByClassName("main-bottom")[0].getElementsByTagName("li")
            let x = 0
            mainBottomList[0].classList.add("active2")
            Array.from(mainBottomList).forEach((item, index) => {
                item.onclick = function () {
                    mainBottomList[x].classList.remove("active2")
                    console.log(item);
                    this.classList.add("active2")
                    x = index
                    getlist2(item.dataset.id)
                    mainRgith.innerHTML = `
                    <span>${item.children[1].children[0].innerHTML}</span>
                    <span>更新时间${y}-${m}-${day}</span>
                   `
                }
            })

        })
}
getlist1(0)
function getlist2(id) {
    fetch(`http://localhost:9090/api/www/bang/bang/musicList?bangId=${id}&pn=1&rn=30&httpsStatus=1`)
        .then(r => r.json())
        .then(res => {
            console.log(res);
            mainList.innerHTML = ""
            res.data.musicList.forEach((item, index) => {
                mainList.innerHTML += `
                    <li>
                        <div>
                            <img src="https://h5static.kuwo.cn/www/kw-www/img/icon_first.df06fb1.png" alt="">
                            <img src="${item.albumpic}" alt="">
                        </div>
                        <div data-id=${item.rid} class="rid">
                            ${item.name}
                        </div>
                        <div data-id=${item.artistid} class="artistid">
                            ${item.artist}
                        </div>
                        <div data-id=${item.albumid} class="albumid">
                           ${item.album}
                        </div>
                        <div>
                            ${item.songTimeMinutes}
                        </div>
                 </li>
                `
            })
            let rid = document.getElementsByClassName("rid")
            let artistid = document.getElementsByClassName("artistid")
            //专辑页面
            let albumid = document.getElementsByClassName("albumid")
            Array.from(rid).forEach((item, index) => {
                item.onclick = function () {
                    window.location.href = `./detail.html?rid=${item.dataset.id}`
                }
            })
            Array.from(artistid).forEach((item, index) => {
                item.onclick = function () {
                    window.location.href = `./singerDetail.html?rid=${item.dataset.id}`
                }
            })
        }
        )
}
getlist2(93)
