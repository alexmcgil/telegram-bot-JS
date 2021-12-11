const TelegramApi = require("node-telegram-bot-api");
const fs = require('fs');
let tokenJSON = {"token": ""};
try {
  let jsonData = require('./token.json');
  tokenJSON.token = jsonData.token;
} catch (err) {
  console.error(err)
}

const bot = new TelegramApi(tokenJSON.token, {polling: true})

bot.setMyCommands([
  {command: "/start", description: "Начальное приветствие"},
  {command: "/info", description: "Что может этот бот"}
])

bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start"){
    await bot.sendMessage(chatId, `${msg.chat.username}, добро пожаловать в телеграм бота канала amoraq`)
  }
  if (text === "/info"){
    await bot.sendMessage(chatId, `${msg.chat.username}, я пока ничего не умею :(`)
  }
})
