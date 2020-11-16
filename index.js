const Discord = require("discord.js");
const fs = require("fs");
const request = require('request');
const sharp = require('sharp');
const exec = require('child_process').exec;
const fetch = require("node-fetch");

const config = require("./config.json");
const client = new Discord.Client();

function animeQuarantine(message, detection, threat) {
    message.delete();
    detection.delete();
    message.channel.send(`Message deleted (${threat}) anime detected.`)
}

async function animeScan(potentialAnime, message) {
    let id = new Date().getTime();
    let def_ext = `.${potentialAnime.split(".").pop().toLowerCase()}`;
    let ext = ".png"

    def_ext = (["jpg", "jpeg", "webp", "tiff", "gif", "svg", "png"].indexOf(def_ext.substr(1))+1) ? def_ext : ext;

    try {
        download(potentialAnime, `./cache/${id}-0${def_ext}`, () => {
            console.log('✅ Done!');
            // We have an error with **some** types of images, we can fix this by converting them all to png.
            sharp(`./cache/${id}-0${def_ext}`)
                .flatten({ background: { r: 255, g: 255, b: 255 } }) // We get rid of transparency
                .toFormat(ext.substr(1))
                .blur()
                .toFile(`./cache/${id}${ext}`, () => {
                    const Scan = exec(`python${config["use-python-3-command"] ? "3" : ""} detect.py cache/${id}${ext} cache/${id}-1${ext}`);
                    Scan.stdout.on('data', async (data) => {
                        console.log(data);
                        try {
                            let animeIndexReturnValue = JSON.parse(data);
                            if (animeIndexReturnValue.anime) {
                                let Attachment = new Discord.MessageAttachment(`./cache/${id}-1${ext}`, `anime${ext}`);
                                let detection = await message.channel.send(`Has (${animeIndexReturnValue.anime}) Anime:`, Attachment);
                                animeQuarantine(message, detection, animeIndexReturnValue.anime);
                            }
                            return animeIndexReturnValue;
                        } catch (err) {
                            console.log("Not an anime index return value.")
                            return {"anime": undefined};
                        }
                    });
                    Scan.stderr.on('data', async (data) => {
                        console.log(data);
                        Scan.kill();
                    });
                });
        })
    } catch (e) {
        console.log("Error reading file.");
    }

}

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(path)).on('close', callback)
    })
}

client.on("ready", () => {
    console.log("Ready!")
    client.user.setPresence(config["activity"]);
})

client.on('message', async message => {
    if (message.author.bot) return;
    let linksArray = []
    if (message.content.length) {
        message.content.match(/\bhttps?:\/\/\S+/gi).forEach(e => {
            if (e.startsWith("https://tenor.com/view")) {
                linksArray.push(fetch(e).then(response => response.text()).then(html => html.match(/\bhttps?:\/\/media1.tenor.com\/images\/.+?(?=">)/gi)[0]))
            } else linksArray.push(e);
        })
    }
    if (message.attachments.array().length) {
        message.attachments.array().forEach(e => {
            linksArray.push(e.url);
        })
    }
    linksArray = await Promise.all(linksArray)

    if (linksArray.length) {
        for (let potentialAnime of linksArray) {
            await animeScan(potentialAnime, message);
        }
    }
});


client.login(config.token);