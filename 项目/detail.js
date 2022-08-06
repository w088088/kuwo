let myId = location.href.split("?")[1].split("=")[1]
let detailLeft = document.getElementById("detail-left")
let datailRightTop = document.getElementById("datail-right-top")
let detailList = document.getElementById("detail-list")

function getList() {
    fetch(`http://localhost:9090/newh5/singles/songinfoandlrc?musicId=${myId}&httpsStatus=1&reqId=45e5cd80-e887-11ec-8023-858ddaecfda8`)
        .then(r => r.json())
        .then(res => {
            console.log(res);
            detailLeft.innerHTML += `
                <div class="img">
                        <img src="${res.data.songinfo.pic}" alt="">
                    </div>
                    <div class="text">
                        <h3>专辑简介</h3>
                        <span></span>
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
                 <h2>${res.data.songinfo.songName}</h2>
                <p class="userinfo">
                    <span>${res.data.songinfo.artist}</span>
                </p>
                <p class="detail-type">
                    <span>专辑：${res.data.songinfo.album}</span>
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
            `
            res.data.lrclist.forEach((item, idnex) => {
                if (idnex < 18) {
                    detailList.innerHTML += `
                    <li>
                        ${item.lineLyric}
                    </li>
                `
                } else {
                    detailList.innerHTML += `
                    <li style="display:none">
                        ${item.lineLyric}
                    </li>
                `
                }
            })
            fetch(`http://localhost:9090/api/v1/www/music/playUrl?mid=${myId}&type=music&httpsStatus=1&reqId=ae3989b0-ea37-11ec-b9be-9d423c5cdd67`)
                .then(r => r.json())
                .then(res => {
                    console.log(res);
                    let btn = document.getElementsByClassName("main-btns")[0].children[0]
                    let aud = document.getElementById("aud")
                    btn.onclick = function () {
                        aud.src = res.data.url
                        aud.play()
                    }
                })
        })

}
getList(myId)
