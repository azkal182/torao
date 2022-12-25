const axios = require("axios");
const cheerio = require("cheerio");
const host = "https://oploverz.co.in/";
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
  let list = $(
   "#content > div > div.postbody > div:nth-child(3) > div.listupd.normal > div > article"
  );
  //   console.log(list.html())
  let index = [];
  list.each(function () {
   const title = $(this).find(".eggtitle").text();
   const type = $(this).find(".eggtype").text();
   const episode = $(this).find(".eggepisode").text()
    ? $(this).find(".eggepisode").text().match(/\d+/g)[0]
    : "";
   const poster = $(this).find("img").attr("src");
   const link = $(this).find("a").attr("href");
   const id = link
    .match(/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/)[3]
    .replaceAll("/", "");

   index.push({ title, id, type, episode, poster, link });
  });

  return { message: "success", length: index.length, results: index };
 });

 //return result;
 console.log(req.query);
 res.status(200).json(result);
}
