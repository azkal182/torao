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

    let result = await axios
      .get(host + "anime/?status=&type=&order=update#", config)
      .then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        let list = $("article");
        let index = [];
        list.each(function () {
          const title = $(this).find("h2").text();
          const status = $(this).find(".bt > .epx").text();
          const type = $(this).find(".typez").text();
          const poster = $(this).find("img").attr("src");
          const link = $(this).find("a").attr("href");
          const id = $(this)
            .find("a")
            .attr("href")
            .match(/(?<=anime\/)(.*)/g)[0]
            .replace("/", "");
          index.push({ title, id, status, type, poster, link });
        });

        return { message: "success", length: index.length, results: index };
      });
    //   console.log(result)
    
 res.status(200).json(result);
}
