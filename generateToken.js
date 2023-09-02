import http from 'k6/http';
import {check} from 'k6';





export default function generateToken() {

   
    const tokenUrl = 'https://simple-books-api.glitch.me/api-clients/';

    const payload=JSON.stringify({
    clientName: `Sazid${Math.floor(Math.random() * 100) + 1}`,
    clientEmail: `Nassir${Math.floor(Math.random() * 10000) + 1}@gmail.com`
    })

    const params={
    headers : {
        'Content-Type': 'application/json', // Specify the Content-Type
    },
    };

    const res = http.post(tokenUrl, payload, params);

    // check(response, {
    //     'Token request successful': (response) => response.status === 201,
    // });
    // console.log(JSON.parse(res.body).accessToken)
    return JSON.parse(res.body).accessToken


}