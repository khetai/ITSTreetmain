function setCookie(cname, cvalue, exdays) {
  const d = new Date(exdays)
  let expires = 'expires=' + d
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function getCookie(cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

function removeCookie(cname) {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

function removeCookieAll() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie =
    'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export { setCookie, getCookie, removeCookie, removeCookieAll }
