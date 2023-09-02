import http from 'k6/http';
import {check} from 'k6';





export default function generateAccessToken() {

   
    const tokenUrl = 'https://simple-books-api.glitch.me/api-clients/';

    const payload=JSON.stringify({
    clientName: "sazidnassir1234",
    clientEmail: "sazid12345678@gamil.com"
    })

    const params={
    headers : {
        'Content-Type': 'application/json', // Specify the Content-Type
    },
    };

    const res = http.post(tokenUrl, payload, params);
    
    check(response, {
        'Token request successful': (response) => response.status === 201,
    });
    // console.log(JSON.parse(res.body).accessToken)
    return JSON.parse(res.body).accessToken


}