const axios = require("axios");
const cheerio = require("cheerio");
const host = process.env.host || "https://oploverz.co.in/";

export default async function handler(req, res) {
 const config = {
  headers: {
   "user-agent":
    "Mozilla/5.0 (Linux; Android 12; CPH2043) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
   "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
   "Accept-Encoding": "application/json",
  },
 };

 let result = await axios.get(host, config).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  let list = $("div:nth-child(6) > div.listupd.normal");
  let index = [];
  list.find("article").each(function () {
   const title = $(this).find("h2").text();
   const episode = $(this).find(".bt > .epx").text().match(/\d+/g)[0];
   const type = $(this).find(".typez").text();
   const score = $(this).find(".scr").text();
   const poster = $(this).find("img").attr("src");
   const link = $(this).find("h2 > a").attr("href");
   const id = link
    .match(/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/)[3]
    .replaceAll("/", "");
   const detail = $(this).find("li");

   let status = "";
   let posted_by = "";
   let released_on = "";
   let series = "";

   detail.each(function () {
    const detail = $(this);
    if (detail.text().split(":")[0] == "Status") {
     // console.log('status')
     status = detail.text().split(":")[1];
    } else if (detail.text().split(":")[0] == "Posted by") {
     // console.log('posted_by')
     posted_by = detail.text().split(":")[1];
    } else if (detail.text().split(":")[0] == "Released on") {
     // console.log('released_on')
     released_on = detail.text().split(":")[1];
    } else if (detail.text().split(":")[0] == "series") {
     // console.log('series')
     series = detail.text().split(":")[1];
    } else {
     // console.log('lain')
    }
   });
   index.push({
    title,
    id,
    episode,
    type,
    score,
    poster,
    link,
    status,
    posted_by,
    released_on,
    series,
   });
  });
  return { message: "success", length: index.length, results: index };
  // console.log(index)
 });
 // console.log(result)
 
 res.status(200).json(result);
}
