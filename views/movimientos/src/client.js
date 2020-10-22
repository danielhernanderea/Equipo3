let host = 'http://127.0.0.1:3000'

function getOperations(user, success) {
    return fetch(host + '/Movimientos/' + user, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(parseJSON).then(success)
}

function parseJSON(json) {
    return json.json();
}

export {
    getOperations
}
