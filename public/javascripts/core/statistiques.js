export function envoiInfosAnomyniseesSurUtilisation() {
  const listCookies = document.cookie.split('; ')
  const cookiesEmpty = []
  listCookies.forEach(element => {
    const search = element.split('=')[0]
    cookiesEmpty.push(search)
  })
  if (!cookiesEmpty.includes('uuidStatsAnonym')) {
    const uuid = Math.random()
      .toString(16)
      .slice(2)
    document.cookie = `uuidStatsAnonym=${uuid}`
  }

  const intervalSec = 15

  // retourne la valeur d'un cookie passé en argument - source w3schools.com
  function getCookie(cname) {
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

  // si l'utilisateur refuse les stats
  let refusStats = false
  const buttonRefusStats = document.querySelector('.button-nostats')
  buttonRefusStats.addEventListener('click', () => {
    refusStats = true
    buttonRefusStats.classList.add('is-hidden')
    document.cookie = 'refusStatistiques=1'
  })
  const refusStatsCookie = decodeURIComponent(document.cookie).split('; ').includes('refusStatistiques=1')
  if (refusStatsCookie) {
    refusStats = true
    buttonRefusStats.classList.add('is-hidden')
  }

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

  const envoisInfosAuServeur = async () => {
    if (!refusStats) {
      await fetch('/statsutilisation', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(infos)
      })
    }
  }

  const cycle = () => {
    infos.duration = infos.duration + intervalSec
    envoisInfosAuServeur()
  }

  if (doNotTrack !== '1') {
    envoisInfosAuServeur() // initialisation
    setInterval(() => cycle(), intervalSec * 1000)
  }
}
