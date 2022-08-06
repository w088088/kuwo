let order = "new"
let uls = document.getElementById("uls")
let selectlist = document.getElementsByClassName("selectlist")[0].getElementsByTagName("li")
function getlist() {
    fetch(`http://localhost:9090/api/www/classify/playlist/getRcmPlayList?pn=1&rn=30&order=${order}&httpsStatus=1`)
        .then(r => r.json())
        .then(res => {
            console.log(res);
            uls.innerHTML = ""
            res.data.data.forEach((item, index) => {
                uls.innerHTML += `
            <li data-id="${item.id}">
                <div>
                    <img src="${item.img}" alt="">
                </div>
                <p>${item.name}</p>
                <p><i class="iconfont icon-24gl-play"></i>${((item.listencnt) / 10000).toFixed(1)}万</p>
            </li>
            `
            })
            let lis = document.getElementById("uls").getElementsByTagName("li")
            Array.from(lis).forEach((item, index) => {
                item.onclick = function () {
                    window.location.href = `playListDetail.html?id=${item.dataset.id}`
                }
            })

        })

}
getlist(order)
let x = 0
selectlist[0].firstChild.classList.add("active")
Array.from(selectlist).forEach((item, index) => {
    item.onclick = function () {
        selectlist[x].firstChild.classList.remove("active")
        this.firstChild.classList.add("active")
        order = this.firstChild.innerHTML == "最新" ? "new" : this.firstChild.innerHTML == "最热" ? "hot" : ''
        getlist()
        x = index
    }
})