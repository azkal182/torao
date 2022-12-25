const axios = require("axios");
const cheerio = require("cheerio");
const host = process.env.host || "https://oploverz.co.in/";

export default async function handler(req, res) {
 const id = req.query.id;
 const config = {
  headers: {
   "user-agent":
    "Mozilla/5.0 (Linux; Android 12; CPH2043) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
   "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
   "Accept-Encoding": "application/json",
  },
 };

 let result = await axios.get(`${host}anime/${id}`, config).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  let list = $(".eplister > ul > li");
  let index = {
   title: "",
   poster: "",
   status: "",
   studio: "",
   released: "",
   duration: "",
   season: "",
   episodes: "",
   type: "",
   posted_by: "",
   released_on: "",
   updated_on: "",
   description: "",
   list_episode: [],
  };

  const poster = $(".thumbook > .thumb > img").attr("src");
  index.poster = poster;

  const title = $("h1[itemprop=name]").text();

  index.title = title;
  let getDetail = $(".info-content > .spe");
  const desc = $("[itemprop=description]").text().trim();
  index.description = desc;
  $(".info-content > .spe > span").each(function () {
   // console.log($(this).text().split(':')[0])
   if ($(this).text().split(":")[0] == "Status") {
    //console.log('status')
    index.status = $(this).text().split(":")[1];
   } else if ($(this).text().split(":")[0] == "Type") {
    //console.log('type')
    index.type = $(this).text().split(":")[1];
   } else if ($(this).text().split(":")[0] == "Posted by") {
    //console.log('posted_by')
    index.posted_by = $(this).text().split(":")[1];
   } else if ($(this).text().split(":")[0] == "Released on") {
    //console.log('released_on')
    index.released_on = $(this).text().split(":")[1];
   } else if ($(this).text().split(":")[0] == "Updated on") {
    //console.log('updated_on')
    index.updated_on = $(this).text().split(":")[1];
   } else if ($(this).text().split(":")[0] == "Studio") {
    //console.log('studio')
    index.studio = $(this).text().split(":")[1];
   } else if ($(this).text().split(":")[0] == "Released") {
    //console.log('released')
    index.released = $(this).text().split(":")[1];
   } else if ($(this).text().split(":")[0] == "Duration") {
    //console.log('duration')
    index.duration = $(this).text().split(":")[1];
   } else if ($(this).text().split(":")[0] == "Season") {
    // console.log('season')
    index.season = $(this).text().split(":")[1];
   } else if ($(this).text().split(":")[0] == "Episodes") {
    // console.log('season')
    index.episodes = $(this).text().split(":")[1];
   } else {
    console.log("other");
   }
  });

  //console.log(list.html())
  list.each(function (v, e) {
   const episode = $(this).find(".epl-num").text();
   const id = $(this)
    .find("a")
    .attr("href")
    .match(
     /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
    )[5]
    .replaceAll("/", "");
   const title = $(this).find(".epl-title").text();
   const uploaded = $(this).find(".epl-date").text();

   index.list_episode.push({
    episode,
    title,
    id,
    uploaded,
   });
  });

  return {
   message: "success",
   results: index,
  };
 });
 //console.log(result)

 res.status(200).json(result);
}
