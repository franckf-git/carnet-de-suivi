const envoiInfosAnomyniseesSurUtilisation = () => {
  const intervalSec = 15

  // retourne la valeur d'un cookie passé en argument - source w3schools.com
  function getCookie (cname) {
    var name = cname + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  const uuid = Math.random()
    .toString(16)
    .slice(2)
  const uuidStatsAnonym = getCookie('uuidStatsAnonym')
  const doNotTrack = navigator.doNotTrack
  const userAgent = navigator.userAgent
  const language = navigator.language
  const pathname = document.location.pathname
  const width = screen.width
  const height = screen.height
  const orientation = screen.orientation.type
  const duration = 0

  const infos = {
    uuid,
    uuidStatsAnonym,
    doNotTrack,
    userAgent,
    language,
    pathname,
    width,
    height,
    orientation,
    duration
  }

  const sendToServer = () => {
    fetch('/statsutilisation', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(infos)
    })
  }

  const cycle = () => {
    infos.duration = infos.duration + intervalSec
    sendToServer()
  }

  if (doNotTrack !== '1') {
    sendToServer() // initialisation
    setInterval(() => cycle(), intervalSec * 1000)
  }
}

export default envoiInfosAnomyniseesSurUtilisation
