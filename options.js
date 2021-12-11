module.exports = {
    menuOptions: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{
            "text": '\u{1F919} Предложить мем/новость',
            callback_data: '/offerMem'
          }],
          [{
            "text": '\u{1F48A} Интересное',
            callback_data: '/stuff'
          }, {
            "text": '\u{26EA} Контакты',
            callback_data: '/links'
          }]
        ]
      })
    },
    stuffOptions: {
      reply_markup: JSON.stringify({
          inline_keyboard: [
            [{
              "text": "Язык Dolbogram",
              callback_data: "/dlbLan"
            }]
          ]
        })
      }
    }
