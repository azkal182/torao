const axios = require("axios");
const cheerio = require("cheerio");
const host = process.env.host;

export default async function handler(req, res) {
 const query = req.query.q;
 const config = {
  params: {
   s: query,
  },
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
  let list = $("article");
  let index = [];
  // console.log(list.html())
  list.each(function (v, i) {
   const title = $(this).find("h2").text();
   const id = $(this)
    .find("a")
    .attr("href")
    .match(/(?<=anime\/)(.*)/g)[0]
    .replace("/", "");
   const link = $(this).find("a").attr("href");
   const type = $(this).find(".typez").text();
   const img = $(this).find("img").attr("src");
   index.push({
    title,
    id,
    link,
    type,
    img,
   });
  });
  return { message: "success", length: index.length, results: index };
 });
 // console.log(result)
 //return result;
 res.status(200).json(result);
}
