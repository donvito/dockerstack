const http = require('http');

const options = {
  socketPath: '/var/run/docker.sock',
  path: '/services'
};

const callback = resp => {
  console.log(`STATUS: ${resp.statusCode}`);

	var body = '';

    resp.on('data', (chunk) => {
	  body += chunk;
    }).on('end', () => {
        var respArr = JSON.parse(body + '');

        respArr.forEach((value) => {
            console.log(value.Spec.Name + ' replicas=' + value.Spec.Mode.Replicated.Replicas);

        })

    }).on('error', data => console.error(data));

}

const clientRequest = http.get(options, callback);
clientRequest.end(0);

