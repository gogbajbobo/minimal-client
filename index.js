// https://developer.mozilla.org/ru/docs/Web/Guide/AJAX/Getting_Started

window.onload = () => makeRequest()

const makeRequest = (url = 'http://172.16.101.10:3000') => {

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

const spanMessage = (message, isError) => {

    const resultSpan = document.querySelector("#result")
    if (isError)
        resultSpan.style.color = 'red'
    return resultSpan.innerHTML = message

}

const alertContents = httpRequest => {

    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {

            try {

                const { message, result, err } = JSON.parse(httpRequest.responseText)

                if (err)
                    return spanMessage(`${ message }<br>Response error: ${ err.message || err.sqlMessage }`, true)

                return spanMessage(`${ message }<br>Server connected to '${ result }' database`)

            } catch (err) {
                return spanMessage(`Response parse error: ${ err.message }`, true)
            }

        } else {
            return spanMessage(`There was a problem with the request, status: ${ httpRequest.status }`, true)
        }
    }

}
