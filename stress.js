import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export let options = {
    stages: [
      { duration: '10m', target: 200 }, 
    ],
    thresholds: {
      'http_req_duration': ['p(95)<3000'], 
      'http_req_failed': ['rate<0.01'],    
    },
  };

  

export default function () {
  const baseUrl="https://simple-books-api.glitch.me/";
  const endPoint="books";  
  const res=http.get(`${baseUrl}${endPoint}`);
  //console.log(res);
  check(res, { 'status was 200': (r) => r.status === 200})
    
  sleep(1);
}


export function handleSummary(data) {

    return {

        "StressReport.html": htmlReport(data),

    };

}