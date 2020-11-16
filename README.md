# Javascript Anti Anime

A discord bot to detect, and delete anime. 

If you do not wish to self-host you can add the bot to your server with [this convenient link](https://discord.com/oauth2/authorize?client_id=736232510085660762&scope=bot&permissions=67497024).

## Installation

### Prerequisites 

- [git](https://git-scm.com/downloads) (Optional)
- [python](https://www.python.org/downloads/) (Test on ver. 3.7.4)
- [node-js](https://nodejs.org/en/) (Tested on ver. 12.16.3)
- [pip](https://pip.pypa.io/en/stable/installing/) (Tested on ver. 20.1.1)
- [npm](https://www.npmjs.com/get-npm) (Tested on ver. 6.14.8)

You can download them all on Windows or Mac; on Linux you can most likely install them with your package manager of choice.

### Setup

You can download the project in two ways:
1.  `git clone` the [repository](https://github.com/skrub-dev/anime-deletion-discord-bot) 
```bash
git clone https://github.com/skrub-dev/anime-deletion-discord-bot
```

2. Alternatively you can download the [zip file](https://codeload.github.com/skrub-dev/anime-deletion-discord-bot/zip/master) and unzip it.

Next, open up your terminal of choice and head into the project directory.

```bash
cd anime-deletion-discord-bot
```

### lbpcascade_animeface
This project uses [`lbpcascade_animeface`](https://raw.githubusercontent.com/nagadomi/lbpcascade_animeface/master/lbpcascade_animeface.xml) to detect faces. 

You can either download it manually and save it with Control+S to the project folder or run:
```bash
wget https://raw.githubusercontent.com/nagadomi/lbpcascade_animeface/master/lbpcascade_animeface.xml
```

### Dependencies with Node

Install all dependencies for node with `npm i`:
```bash
npm i
```

### Dependencies with Python
Pip all dependencies for Python:
```bash
pip install numpy
pip install opencv-python
```
You may have to use pip3

## Config
Head into the `config.json` file. Make sure to add your bots token and set `use-python-3-command` to true if Python2 is your default python version.

## Usage
Run with `npm run run`. When online, the bot should delete any image it detects as anime when it gets uploaded.
```bash
npm run run
```

## Cache
You may have noticed the `./cache` folder. The bot saves images, the image denoised, and the image output. Once created these images serve no purpose but still exist. You will have to clean the cache manually to prevent it from taking up too much storage space. This issue may be fixed in a later update.

## Credits
- [lbpcascade_animeface](https://github.com/nagadomi/lbpcascade_animeface) for `lbpcascade_animeface.xml` and the Python Example
- [cv2](https://pypi.org/project/opencv-python/)
- [Discord.JS](https://github.com/discordjs)
- [Sharp](https://sharp.pixelplumbing.com/)

## Contributing
Pull requests are welcome!

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Preview
![Preview](https://js-anti-anime.skrub.dev/preview.gif)