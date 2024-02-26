const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

// Замініть 'YOUR_BOT_TOKEN' на реальний токен вашого бота
const token = (process.env.BOT_TOKEN);

// Об'єкт для зберігання стеку кнопок
const buttonStack = [];

// Створення об'єкту бота
const bot = new TelegramBot(token, {polling: true});

// Функція для відправлення повідомлення з кнопками
function sendButtonMessage(chatId, text, buttons) {
    const options = {
        reply_markup: {
            keyboard: buttons,
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };
    bot.sendMessage(chatId, text, options);
}

// Обробник команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const mainButtons = [
        ['📦Посилки з України', '📦Посилки з Європи'],
        ['☎️Контакти']
    ];

    buttonStack.push(mainButtons);

    sendButtonMessage(chatId, 'Виберіть що Вас цікавить:', mainButtons);
});


// Обробник кнопок
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
        case '📦Посилки з України':
            const ukraineDeliveryButtons = [
                ['Відправити до Братислави', 'Відправити до Відня'],
                ['Відправити до Лінцу', 'Відправити до Зальцбургу'],
                ['Відправити до Мюнхену', 'Повернутися назад']
            ];
            buttonStack.push(ukraineDeliveryButtons);
            sendButtonMessage(chatId, 'Виберіть місто для відправлення з України:', ukraineDeliveryButtons);
            break;


        case 'Відправити до Братислави':
        case 'Відправити до Відня':
        case 'Відправити до Лінцу':
        case 'Відправити до Зальцбургу':
        case 'Відправити до Мюнхену':
            const responseTextsTwo = {
                'Відправити до Братислави': 'Приймаємо посилки зі всієї України новою поштою: \nу м. Львові, відділення №1, на імя Радченко Ілля 0954590000. \nПосилка обовязково має бути підписаною, потрібно вказати \n📝Братислава, \n📝Прізвище, імя отримувача, \n📝К-тний № тел. отримувача. \nВартість пересилки 1€/кг за звичайні речі. \nМінімальна вартість відправлення 10€',
                'Відправити до Відня': 'Приймаємо посилки зі всієї України новою поштою: у м. Львові, відділення №1, на імя Кузіль Марян 0974009800. Посилка обовязково має бути підписаною, потрібно вказати Відень, 📝Прізвище, імя отримувача, 📝К-тний № тел. отримувача. Вартість пересилки 1€/кг за звичайні речі. Мінімальна вартість відправлення 10€',
                'Відправити до Лінцу': 'Приймаємо посилки зі всієї України новою поштою: у м. Львові, відділення №1, на імя Кузіль Вікторія 0978558008. Посилка обовязково має бути підписаною, потрібно вказати 📝Лінц, 📝Прізвище, імя отримувача, 📝К-тний № тел. отримувача. Вартість пересилки 1€/кг за звичайні речі. Мінімальна вартість відправлення 10€',
                'Відправити до Зальцбургу': 'Приймаємо посилки зі всієї України новою поштою: у м. Львові, відділення №1, на імя Кузіль Вікторія 0978558008. Посилка обовязково має бути підписаною, потрібно вказати 📝Зальцбург, 📝Прізвище, імя отримувача, 📝К-тний № тел. отримувача. Вартість пересилки 1.20€/кг за звичайні речі. Мінімальна вартість відправлення 12€',
                'Відправити до Мюнхену': 'Приймаємо посилки зі всієї України новою поштою: у м. Львові, відділення №1, на імя Думенко Андрій 0980593128. Посилка обовязково має бути підписаною, потрібно вказати 📝Мюнхен, 📝Прізвище, імя отримувача, 📝К-тний № тел. отримувача. Вартість пересилки 1.20€/кг за звичайні речі. Мінімальна вартість відправлення 12€'
            };
            const selectedTextTwo = responseTextsTwo[text];
            bot.sendMessage(chatId, selectedTextTwo);
            break;
        
      

        case '📦Посилки з Європи':
            const europeDeliveryButtons = [
                ['Відправити з Братислави', 'Відправити з Відня'],
                ['Відправити з Лінцу', 'Відправити з Зальцбургу'],
                ['Відправити з Мюнхену', 'Повернутися назад']
            ];
            buttonStack.push(europeDeliveryButtons);
            sendButtonMessage(chatId, 'Виберіть місто для відправлення з Європи:', europeDeliveryButtons);
            break;

        case 'Відправити з Братислави':
        case 'Відправити з Відня':
        case 'Відправити з Лінцу':
        case 'Відправити з Зальцбургу':
        case 'Відправити з Мюнхену':
            const responseTexts = {
                'Відправити з Братислави': 'Приймаємо посилки у Братиславі за наступний графіком 📅Понеділок-Пятниця з 09:00 до 18:00, 📅Субота з 09:00 до 14:00, 📅Неділя вихідний. Наш офіс знаходиться за адресою 🗺️Chalupkova 7, 811 09 Bratislava. Наші контакти📞️ +421948133123. Вартість пересилки до України 1.20€/кг за звичайні речі. Мінімальна вартість відправлення 10€',
                'Відправити з Відня': 'Приймаємо посилки у Відня 📅щодня за адресою 🗺️Wien 1170, Wichtelgasse 66. Наші контакти📞️ +436604620008 +4368110846055 +4368110244022. Вартість пересилки до Львова 1€/кг за звичайні речі. Мінімальна вартість відправлення 10€. Вартість пересилки по Україні 1.20€/кг за звичайні речі. Мінімальна вартість відправлення 10€',
                'Відправити з Лінцу': 'Приймаємо посилки у Лінці кожної 📅пятниці з 17:00 до 20:00 за адресою 🗺️Kärntnerstraße 16s, 4020 Linz. Наші контакти📞️ +436604590099 +380978558008. Вартість пересилки до Львова 1€/кг за звичайні речі. Мінімальна вартість відправлення 10€. Вартість пересилки по Україні 1.20€/кг за звичайні речі. Мінімальна вартість відправлення 10€',
                'Відправити з Зальцбургу': 'Приймаємо посилки у Зальцбурзі за наступним графіком 📅Середа, 📅Пятниця, 📅Неділя з 15:00 до 16:00 за адресою 🗺️Engelbert-Weiß-Weg 10, 5020 Salzburg. Наші контакти📞️ +436604590099 +380978558008. Вартість пересилки до Львова 1.20€/кг за звичайні речі. Мінімальна вартість відправлення 12€. Вартість пересилки по Україні 1.50€/кг за звичайні речі. Мінімальна вартість відправлення 15€',
                'Відправити з Мюнхену': 'Приймаємо посилки в Мюнхені за наступним графіком 📅Вівторок з 17:00 до 20:00, 📅Середа з 09:00 до 13:00, 📅Четвер з 17:00 до 20:00, 📅Пятниця з 09:00 до 13:00, 📅Субота, 📅Неділя з 09:00 до 13:00 за адресою 🗺️Ungererstraße, 80805 München, студентський парк. Наші контакти📞️ +4915738342187 +4917626997124. Вартість пересилки до Львова 1.20€/кг за звичайні речі. Мінімальна вартість відправлення 12€. Вартість пересилки по Україні 1.50€/кг за звичайні речі. Мінімальна вартість відправлення 15€'
            };
            const selectedText = responseTexts[text];
            bot.sendMessage(chatId, selectedText);
            break;

        case '☎️Контакти':
            const contactsText = 'Привіт це LEOPOLIS-GROUP. Контакти складу: Валерія - 0974009800 0633688308, Ілля - 0978558008 0672131512. Якщо Ваше питання стосується пасажирських перевезень за напрямом Україна-Братислава-Відень звяжіться з нашим менеджером Марією 📞️0504590000 абож якщо Вас цікавить напрям Україна-Лінц-Зальцбург-Мюнхен звяжіться з менеджером Оксаною 📞️0674590000';
            bot.sendMessage(chatId, contactsText);
            break;

        case 'Повернутися назад':
            // Перевіряємо, чи є попередні рівні кнопок в стеці
            if (buttonStack.length > 1) {
                // Видаляємо поточний рівень кнопок
                buttonStack.pop();
                // Отримуємо попередній рівень кнопок
                const previousButtons = buttonStack[buttonStack.length - 1];
                // Відправляємо повідомлення з попередніми кнопками
                sendButtonMessage(chatId, 'Виберіть що Вас цікавить:', previousButtons);
            } else {
                // Якщо стек кнопок порожній, відправляємо повідомлення про помилку
                bot.sendMessage(chatId, 'Ви не можете повернутися далі. Введіть або натисніть /start.');
            }
            break;

        default:
            // Обробка інших кнопок
            break;
    }
});
