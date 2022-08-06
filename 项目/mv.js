let obj = [
    { 首播: "236682871" },
    { 华语: "236682731" },
    { 日韩: "236742444" },
    { 网络: "236682773" },
    { 欧美: "236682735" },
    { 现场: "236742576" },
    { 热舞: "236682777" },
    { 伤感: "236742508" },
    { 剧情: "236742578" },
]
let id
let mvList = document.getElementById("mv-list")
let mvListBtn = document.getElementById("mv-list").getElementsByTagName("li")
let mvListWrap = document.getElementById("mv-list-wrap")
obj.forEach((item, index) => {
    for (let key in item) {
        mvList.innerHTML += `
        <li data-id=${item[key]}>${key}</li>
        `
    }
})
let x = 0
mvListBtn[0].classList.add("mvactive")
Array.from(mvListBtn).forEach((item, index) => {
    item.onclick = function () {
        mvListBtn[x].classList.remove("mvactive")
        this.classList.add("mvactive")
        x = index
        getmv(this.dataset.id)
    }
})
function getmv(id) {
    fetch(`http://localhost:9090/api/www/music/mvList?pid=${id}&pn=1&rn=30&httpsStatus=1`)
        .then(r => r.json())
        .then(res => {
            mvListWrap.innerHTML = ""
            res.data.mvlist.forEach((item, index) => {
                // console.log(item);
                mvListWrap.innerHTML += `
                 <li data-id=${item.id}>
                    <div>
                        <div>
                            <img src="${item.pic}" alt="">
                        </div>
                        <p>${item.name}</p>
                        <p>${item.artist}</p>
                    </div>
                </li>
                `
            })
            let mvBtn = mvListWrap.getElementsByTagName("li")
            Array.from(mvBtn).forEach((item, index) => {
                item.onclick = function () {
                    window.location.href = `./playmv.html?mvid=${item.dataset.id}`
                }
            })
        })
}
getmv(obj[0].首播)