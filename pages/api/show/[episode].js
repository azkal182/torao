const axios = require("axios");
const cheerio = require("cheerio");
const host = process.env.host || "https://oploverz.co.in/";
export default async function handler(req, res) {
 const eps = req.query.episode
 const config = {
  headers: {
   "user-agent":
    "Mozilla/5.0 (Linux; Android 12; CPH2043) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
   "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
   "Accept-Encoding": "application/json",
  },
 };

 let result = await axios.get(host + eps, config).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  let list = $(".soraddlx.soradlg");
  //console.log(list.html())
  let index = {
   status: "",
   studio: "",
   released: "",
   duration: "",
   season: "",
   type: "",
   posted_by: "",
   released_on: "",
   updated_on: "",
   episode: "",
   anime_id: "",
   prev: "",
   next: "",
   download: [],
   embed: [],
  };
  //get detail
  let getDetail = $(".info-content > .spe");

  const prev = $(
   "div.megavid > div > div.naveps.bignav > div:nth-child(1) > a"
  ).attr("href");

  const anime_id = $(
   "div.megavid > div > div.naveps.bignav > div:nth-child(2) > a"
  )
   .attr("href")
   .match(/(?<=anime\/)(.*)/g)[0]
   .replaceAll("/", "");
  index.anime_id = anime_id;
  //console.log(id_anime);

  const next = $(
   "div.megavid > div > div.naveps.bignav > div:nth-child(3) >a"
  ).attr("href");
  if (prev) {
   const final_prev = prev
    .match(
     /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
    )[5]
    .replaceAll("/", "");
   //  index.next.push(final_prev);
   index.prev = final_prev;
  }

  if (next) {
   const final_next = next
    .match(
     /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
    )[5]
    .replaceAll("/", "");
   index.next = final_next;
  }

  const get_embed = $(
   "div.entry-content > div:nth-child(3) > div.mctnx > div:nth-child(1) > .soraurlx"
  );

  get_embed.each(function () {
   const item = $(this);
   if (item.text() == "Google Drive (Acefile)") {
    //console.log(item.text());
   }

   item.each(function () {
    const get_google = $(this).find("a");
    const res_embed = $(this).find("strong").text();

    //console.log(res_embed);
    //embed.push({ res: res_embed });
    get_google.each(function () {
     if ($(this).text() === "Google Drive (Acefile)") {
      //console.log($(this).text());
      index.embed.push({
       resolution: res_embed,
       server: $(this).text(),
       link: $(this).attr("href"),
       id: $(this).attr("href").match(/(\d+)/)[1],
      });
     }
    });
   });
  });

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
    index.episode = $(this).text().split(":")[1];
   } else {
    console.log("other");
    console.log($(this).text().split(":")[0]);
   }
  });

  list.each(function (v, i) {
   const format = $(this).find("h3").text();

   const list = $(this).find(".soraurlx");

   const formatData = {
    format,
    resolutions: [],
   };

   list.each(function (v, i) {
    let resolutions = $(this).find("strong").text();

    const resolutionData = {
     name: resolutions,
     servers: [],
    };

    const server = $(this).find("a");

    server.each(function (v, e) {
     const server = $(this).text();
     const link = $(this).attr("href");
     const serverData = {
      name: server,
      link,
     };

     resolutionData.servers.push(serverData);
    });
    formatData.resolutions.push(resolutionData);
   });
   index.download.push(formatData);
  });
  return {
   message: "success",
   results: index,
  };
 });

 res.status(200).json(result);
}
