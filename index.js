const TelegramApi = require("node-telegram-bot-api");
const {
  menuOptions,
  stuffOptions
} = require("./options");
// const sequelize = require('./db');
// const UserModel = require('./models');
const fs = require('fs');
let tokenJSON = {
  "token": ""
};
try {
  let jsonData = require('./token.json');
  tokenJSON.token = jsonData.token;
} catch (err) {
  console.error(err)
}

const bot = new TelegramApi(tokenJSON.token, {
  polling: true
})

const chats = {};
const chatToOffer = "-750145383";

const menu = async (chatId, msg) => {
  await bot.sendMessage(chatId, 'Меню', menuOptions);
}

const stuff = async (chatId, msg) => {
  await bot.sendMessage(chatId, "Интересности", stuffOptions);
}

const offerMem = async (chatId, msg) => {
  await bot.sendMessage(chatId, "Отправь мне мем или видосик")
}

let forwardToOffer = (chatId, msg) => {
  return bot.forwardMessage(chatToOffer, msg.from.id, msg.message_id)
}

const start = () => {
  bot.setMyCommands([{
      command: "/start",
      description: "Перезапустить бота"
    },
    {
      command: "/info",
      description: "Что может этот бот"
    },
    {
      command: "/links",
      description: "Сслыки"
    }
  ])

  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    try {
      if (text === "/start") {
        // await UserModel.create({chatId})
        return bot.sendMessage(chatId, `Меню`, menuOptions)
        // return menu(chatId, msg)
      }
      if (text === "/info") {
        return bot.sendMessage(chatId, `${msg.chat.username}, я пока ничего не умею :(`)
      }
      if (text === "/secretcommand") {
        return bot.sendMessage(chatId, chatId)
      }
      if (msg.hasOwnProperty("photo") || msg.hasOwnProperty("video") || msg.hasOwnProperty("audio") || msg.hasOwnProperty("video_note") || msg.hasOwnProperty("voice") || msg.hasOwnProperty("document") || msg.hasOwnProperty("sticker")) {
        await forwardToOffer(chatId, msg);
        return bot.sendMessage(chatId, "Ваш мем получен")
      }
      return bot.sendMessage(chatId, "Нет такой команды, я тебя не понимаю.")
    } catch (e) {
      return bot.sendMessage(chatId, `Ошибка ${e}`)
    }
  })

  //   {
  //   message_id: 246,
  //   from: {
  //     id: 318582941,
  //     is_bot: false,
  //     first_name: 'alexmcgil',
  //     username: 'alexmcgil',
  //     language_code: 'ru'
  //   },
  //   chat: {
  //     id: 318582941,
  //     first_name: 'alexmcgil',
  //     username: 'alexmcgil',
  //     type: 'private'
  //   },
  //   date: 1639236658,
  //   photo: [
  //     {
  //       file_id: 'AgACAgIAAxkBAAP2YbTEMod3VliGT7YGMOcWK8dByqoAAvK6MRs3maBJsw1xPVXleM4BAAMCAANzAAMjBA',
  //       file_unique_id: 'AQAD8roxGzeZoEl4',
  //       file_size: 2841,
  //       width: 90,
  //       height: 90
  //     },
  //     {
  //       file_id: 'AgACAgIAAxkBAAP2YbTEMod3VliGT7YGMOcWK8dByqoAAvK6MRs3maBJsw1xPVXleM4BAAMCAANtAAMjBA',
  //       file_unique_id: 'AQAD8roxGzeZoEly',
  //       file_size: 48727,
  //       width: 320,
  //       height: 320
  //     },
  //     {
  //       file_id: 'AgACAgIAAxkBAAP2YbTEMod3VliGT7YGMOcWK8dByqoAAvK6MRs3maBJsw1xPVXleM4BAAMCAAN4AAMjBA',
  //       file_unique_id: 'AQAD8roxGzeZoEl9',
  //       file_size: 128222,
  //       width: 720,
  //       height: 720
  //     }
  //   ]
  // }

  bot.on("callback_query", async msg => {
    // const msg = callbackQuery.message;
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/links") {
      await bot.sendMessage(chatId, "Админ -> @alexmcgil")
    }
    if (data === "/stuff") {
      return stuff(chatId)
    }
    if (data === "/dlbLan") {
      await bot.sendMessage(chatId, "https://t.me/setlanguage/dlgram")
    }
    if (data === "/offerMem") {
      return offerMem(chatId)
    }
  })

  bot.on("photo", msg => {
    forwardToOffer(msg);
  })
  bot.on("video", msg => {
    forwardToOffer(msg);
  })


}

start()
