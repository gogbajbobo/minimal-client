// https://developer.mozilla.org/ru/docs/Web/Guide/AJAX/Getting_Started

const makeRequest = (url = 'http://localhost:3000') => {

    let httpRequest = false

    if (window.XMLHttpRequest) { // Mozilla, Safari, ...

        httpRequest = new XMLHttpRequest()

        if (httpRequest.overrideMimeType)
            httpRequest.overrideMimeType('text/xml')

    } else if (window.ActiveXObject) { // IE

        try {
            httpRequest = new ActiveXObject('Msxml2.XMLHTTP')
        } catch (e) {
            try {
                httpRequest = new ActiveXObject('Microsoft.XMLHTTP')
            } catch (e) {}
        }
    }

    if (!httpRequest) {
        alert('Cannot create an XMLHTTP instance')
        return false
    }

    httpRequest.onreadystatechange = () => alertContents(httpRequest)
    httpRequest.open('GET', url, true)
    httpRequest.send(null)

}

const alertContents = httpRequest => {

    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            alert(httpRequest.responseText)
        } else {
            alert(`There was a problem with the request, status: ${ httpRequest.status }`)
        }
    }

}
