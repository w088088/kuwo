http://localhost:9090/urllet h = ["热门", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#"]
let n = ["全部", "华语男", "华语女", "华语组合", "日韩男", "日韩女", "日韩组合", "欧美男", "欧美女", "欧美组合", "其他"]
let hot = document.getElementsByClassName("hot")[0]
let nn = document.getElementsByClassName("n")[0]
let lists = document.getElementsByClassName("list")[0]

console.log(hot);
h.forEach((item, index) => {
    hot.innerHTML += `
        <span>${item}</span>
    `
})
n.forEach((item, index) => {
    nn.innerHTML += `
    <span>${item}</span>
    `
})
let hotspan = document.getElementsByClassName("hot")[0].getElementsByTagName("span")
let nnspan = document.getElementsByClassName("n")[0].getElementsByTagName("span")
let x = 0
let y = 0
let prefix = ""
function getlist() {
    let url = `http://localhost:9090/api/www/artist/artistInfo?category=${y}&pn=1&rn=100&prefix=${prefix}`
    fetch(url)
        .then(r => r.json())
        .then(res => {
            console.log(url);
            console.log(res);
            lists.innerHTML = ""
            res.data.artistList.forEach((item, index) => {
                if (index < 12) {
                    lists.innerHTML += `
            <li data-id=${item.id} class="imgs">
                <div>
                    <img src="${item.pic}">
                </div>
                <p>${item.name}</p>
                <p >${item.musicNum}首歌曲</p>
            </li>
        `
                } else {
                    lists.innerHTML += `
            <li class='small'}>
                <div>
                    <img src="${item.pic}">
                </div>
                <p>${item.name}</p>
            </li>
        `
                }
            })
            let imgs = document.getElementsByClassName("imgs")
            Array.from(imgs).forEach((item, index) => {
                item.onclick = function () {
                    window.location.href = `singerDetail.html?singerid=${item.dataset.id}`
                }
            })
        })
}
getlist()
hotspan[0].classList.add("hot-active")
Array.from(hotspan).forEach((item, index) => {
    item.onclick = function () {
        hotspan[x].classList.remove("hot-active")
        this.classList.add("hot-active")
        x = index
        prefix = this.innerHTML == "热门" ? "" : this.innerHTML
        getlist()
    }
})
nnspan[0].classList.add("hot-active")
Array.from(nnspan).forEach((item, index) => {
    item.onclick = function () {
        nnspan[y].classList.remove("hot-active")
        this.classList.add("hot-active")
        y = index
        getlist()
    }
})