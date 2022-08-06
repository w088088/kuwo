let myId = location.href.split("?")[1].split("=")[1]
let detailLeft = document.getElementById("detail-left")
let datailRightTop = document.getElementById("datail-right-top")
let detailList = document.getElementById("detail-list")
function getList() {
    fetch(`http://localhost:9090/api/www/playlist/playListInfo?pid=${myId}&pn=1&rn=30&httpsStatus=1&reqId=14963080-e869-11ec-a912-6f61407f358c`)
        .then(r => r.json())
        .then(res => {
            console.log(res);
            detailLeft.innerHTML += `
                <div class="img">
                        <img src="${res.data.img500}" alt="">
                    </div>
                    <div class="text">
                        <h3>歌单简介</h3>
                        <span>${res.data.info}</span>
                    </div>
                    <p class="btn">
                        <span>下载该歌曲</span>
                    </p>
                    <div class="ewm">
                        <img src="https://h5static.kuwo.cn/www/kw-www/img/qrcode.d53daff.png" alt="">
                        <p>手机扫描二维码下载客户端</p>
                </div>

                `
            datailRightTop.innerHTML += `
                 <h2>${res.data.name}</h2>
                <p class="userinfo">
                    <img src="${res.data.uPic}" alt="">
                    <span>${res.data.userName}</span>
                </p>
                <p class="detail-type">
                    <span>${res.data.tag}</span>
                </p>
                <!-- 下面按钮组 -->
                <div class="main-btns">
                    <button>
                        <i class="iconfont icon-24gl-play"></i>
                        播放全部
                    </button>
                    <button>
                        <i class="iconfont icon-tianjia"></i>
                        添加
                    </button>
                    <button>
                        <i class="iconfont icon-shoucang"></i>
                        收藏
                    </button>
                    <button>
                        <i class="iconfont icon-31pinglun"></i>
                        分享
                    </button>
                    <a href="">
                        <i class="iconfont icon-31pinglun"></i>
                        评论
                    </a>
                </div>
                <!-- 标题头 -->
                <ul class="main-list-top">
                    <li>序号</li>
                    <li>歌曲</li>
                    <li>歌手</li>
                    <li>时长</li>
                </ul>
            `
            res.data.musicList.forEach((item, idnex) => {
                detailList.innerHTML += `
                    <li>
                        <span>${idnex + 1}</span>
                        <span class="rid" data-id="${item.rid}">${item.name}</span>
                        <span class="artistid" data-id="${item.artistid}">${item.artist}</span>
                        <span>${item.songTimeMinutes}</span>
                    </li>
                `
            })
            let rid = document.getElementsByClassName("rid")
            Array.from(rid).forEach((item, index) => {
                item.onclick = function () {
                    window.location.href = `./detail.html?rid=${item.dataset.id}`
                }
            })
            let artistid = document.getElementsByClassName("artistid")
            Array.from(artistid).forEach((item, index) => {
                item.onclick = function () {
                    window.location.href = `./singerDetail.html?rid=${item.dataset.id}`
                }
            })
        })

}
getList(myId)