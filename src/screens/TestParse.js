const axios = require('axios');
const cheerio = require('cheerio');

const uriTarget = 'https://kayak.co.id/hotels/Bandung,West-Java,Indonesia/2019-10-09/2019-10-19/1adults?sort=rank_a';
// prefix : 'https://www.kayak.co.id/hotels' + city, province, nation + date1 + date2 + 1adults?sort=rank_a;
const wiki = 'https://en.wikipedia.org/wiki/Grayscale';
const saver = 'https://cors-escape.herokuapp.com/';
const hero = 'https://cors-anywhere.herokuapp.com/';
const elwiki = 'https://elwiki.net/w/Sharp_Fall';
const booking = "https://www.booking.com/";
const newTarget = 'https://www.kayak.co.id/hotels/Sheraton-Bandung-Hotel--Towers,Bandung-c18593-h6918-details/2019-11-07/2019-11-17/1adults?sid=EDFETgdSFz';

const Scrap = async () => {
    try {
        const response = await axios.get(hero + elwiki);
        // const $ = cheerio.load(response.data);
        // const child = $('.mw-parser-output').children('div:first-child').text();
        // console.log(child);
        console.log(response.data)
    } catch(error) {
        console.log(error)
    }
}

// let Scrap = function () {
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (this.readyState === 4 && this.status === 200) {
//     //   let response = JSON.parse(this.responseText);
//     //   renderPosts(response);    
//     console.log(this.responseText)
//     }
//   }
//   xhr.open("GET", "https://cors-escape.herokuapp.com/https://www.kayak.co.id/hotels/Bandung,West-Java,Indonesia/2019-10-10/2019-10-11/1adults?sort=rank_a");
//   xhr.setRequestHeader("Accept", 'application/html');
//   xhr.send();
// }

module.exports = Scrap;