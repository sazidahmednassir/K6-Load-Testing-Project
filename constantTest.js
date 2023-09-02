import http from 'k6/http';
import {check, sleep} from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import generateToken from "./generateToken.js";

export const options = {
    scenarios: {
      constant_vus: {
        executor: 'constant-vus',
        vus: 30,      
        duration: '2m',
      },
    },
  thresholds: {

        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.05'],
        http_reqs: ['rate<25'],
    },

};



export default function () {
    const url="https://simple-books-api.glitch.me/orders"; 
    const token=generateToken();
    console.log(token)
    const params = {
        headers:{
  
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res=http.get(url, params);
    //console.log(res);
    check(res, { 'status was 200': (r) => r.status === 200})
      
    sleep(1);
}


export function handleSummary(data) {

    return {

        "ConstantTestReport.html": htmlReport(data),

    };

}
