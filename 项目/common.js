//热歌
let searchVal = document.getElementById("search-val")
let sec = document.getElementById("sec")
fetch(`http://localhost:9090/api/www/search/searchKey?key=&httpsStatus=1&reqId=e12b1180-e7d1-11ec-a5c8-611ebbc35b8d`)
    .then(r => r.json())
    .then(res => {
        // console.log(res);
        res.data.slice(0, 10).forEach((item, index) => {
            // console.log(item);
            searchVal.innerHTML += `
        <li ><span class='${index + 1 == 1 ? 'active1' : index + 1 == 2 ? 'active2' : index + 1 == 3 ? 'active3' : 'active4'}'>${index + 1}</span><i>${item}</i></li>
        `
        })
        //热歌点击给input值
        let lis = searchVal.getElementsByTagName("li")
        Array.from(lis).forEach((item, index) => {
            item.onclick = function () {
                // console.log(item.lastElementChild.innerHTML);
                sec.value = item.lastElementChild.innerHTML
            }
        })
    })
//
sec.onblur = function () {
    setTimeout(() => {
        searchVal.style.display = "none"
    }, 200);
}
sec.onfocus = function () {
    searchVal.style.display = "block"
}
//回车搜索
sec.onkeydown = function (e) {
    console.log(e);
    if (e.keyCode == 13) {
        window.location.href = `./search.html?val=${this.value}`
    }

}
sec.onchange = function () {
    window.location.href = `./search.html?val=${this.value}`
}
// //二级导航点击切换
// let subNav = document.getElementsByClassName("sub-nav")[0].getElementsByTagName("li")
// subNav[0].firstChild.classList.add("active")
// let subIndex = 0
// Array.from(subNav).forEach((item, index) => {
//     item.onclick = function () {
//         subNav[subIndex].firstChild.classList.remove("active")
//         this.firstChild.classList.add("active")
//         subIndex = index
//     }
// })