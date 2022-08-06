let mvid = location.href.split("?")[1].split("=")[1]
let vid = document.getElementById("vid")
fetch(`http://localhost:9090/api/v1/www/music/playUrl?mid=${mvid}&type=mv&httpsStatus=1&reqId=ae50f110-e96d-11ec-bad8-f9a846271827`)
    .then(r => r.json())
    .then(res => {
        vid.src = res.data.url
    })
vid.play()