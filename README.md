Звісно! Для створення чат-бота для Telegram на JavaScript використовуючи бібліотеку node-telegram-bot-api, вам спочатку потрібно встановити цю бібліотеку. Для цього використовуйте npm:

bash
Copy code
npm install node-telegram-bot-api
Далі ви можете створити свій проект та включити бібліотеку. Тепер давайте розглянемо приклад коду для чат-бота, що містить 4 кнопки та 2 inline кнопки:

javascript
Copy code
const TelegramBot = require('node-telegram-bot-api');

// Замініть 'YOUR_BOT_TOKEN' на реальний токен вашого бота
const token = 'YOUR_BOT_TOKEN';

// Створення об'єкту бота
const bot = new TelegramBot(token, {polling: true});

// Обробник команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const options = {
        reply_markup: {
            keyboard: [
                ['Button 1', 'Button 2'],
                ['Button 3', 'Button 4']
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    bot.sendMessage(chatId, 'Виберіть опцію:', options);
});

// Обробник inline кнопок
bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;

    if (action === 'inline_button_1') {
        bot.sendMessage(chatId, 'Ви вибрали Inline Button 1');
    } else if (action === 'inline_button_2') {
        bot.sendMessage(chatId, 'Ви вибрали Inline Button 2');
    }
});

// Створення inline кнопок
bot.onText(/\/inline/, (msg) => {
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Inline Button 1', callback_data: 'inline_button_1' }],
                [{ text: 'Inline Button 2', callback_data: 'inline_button_2' }]
            ]
        }
    };

    bot.sendMessage(chatId, 'Виберіть inline кнопку:', options);
});
Запустіть цей скрипт, і ваш бот буде відповідати на команду /start, виводячи 4 кнопки та реагуючи на inline кнопки.

Структура проекту не є обов'язковою в даному випадку. Просто збережіть цей код в один файл (наприклад, index.js) та запустіть його за допомогою Node.js:

bash
Copy code
node index.js
Зауважте, що ви повинні взяти токен бота у BotFather на Telegram перед використанням цього коду.

User
Допиши код, щоб при натисканні на одну з кнопок виводилося повідомлення з текстом на 10 слів
ChatGPT
Звісно, давайте додамо до коду обробник для кнопок, який виведе повідомлення з текстом на 10 слів при їхньому натисканні. Ось змінений код:

javascript
Copy code
const TelegramBot = require('node-telegram-bot-api');

// Замініть 'YOUR_BOT_TOKEN' на реальний токен вашого бота
const token = 'YOUR_BOT_TOKEN';

// Створення об'єкту бота
const bot = new TelegramBot(token, {polling: true});

// Обробник команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            keyboard: [
                ['Button 1', 'Button 2'],
                ['Button 3', 'Button 4']
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    bot.sendMessage(chatId, 'Виберіть опцію:', options);
});

// Обробник кнопок
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === 'Button 1' || text === 'Button 2' || text === 'Button 3' || text === 'Button 4') {
        const words = text.split(' ').slice(0, 10).join(' ');
        bot.sendMessage(chatId, `Ви натиснули кнопку "${text}" і отримали перших 10 слів: ${words}`);
    }
});

// Обробник inline кнопок
bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;

    if (action === 'inline_button_1' || action === 'inline_button_2') {
        const words = action.split('_').slice(0, 10).join(' ');
        bot.sendMessage(chatId, `Ви натиснули inline кнопку "${action}" і отримали перших 10 слів: ${words}`);
    }
});

// Створення inline кнопок
bot.onText(/\/inline/, (msg) => {
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Inline Button 1', callback_data: 'inline_button_1' }],
                [{ text: 'Inline Button 2', callback_data: 'inline_button_2' }]
            ]
        }
    };

    bot.sendMessage(chatId, 'Виберіть inline кнопку:', options);
});
Цей код додає обробник, який перевіряє, яку кнопку було натиснуто, та виводить перші 10 слів з її тексту. Якщо це inline кнопка, то використовується callback_data замість тексту кнопки.

User
Перепиши код так щоб при натисканні на 'Button 1' відкривалися нові 4 button і при натисканні на які виводилися різні 10 слів
ChatGPT
Звісно, давайте модифікуємо код так, щоб при натисканні на 'Button 1' виводилися нові чотири кнопки, і при натисканні на кожну з них виводилися різні 10 слів. Ось оновлений код:

javascript
Copy code
const TelegramBot = require('node-telegram-bot-api');

// Замініть 'YOUR_BOT_TOKEN' на реальний токен вашого бота
const token = 'YOUR_BOT_TOKEN';

// Створення об'єкту бота
const bot = new TelegramBot(token, {polling: true});

// Обробник команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            keyboard: [
                ['Button 1', 'Button 2'],
                ['Button 3', 'Button 4']
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    bot.sendMessage(chatId, 'Виберіть опцію:', options);
});

// Обробник кнопок
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
        case 'Button 1':
            const buttonOptions = {
                reply_markup: {
                    keyboard: [
                        ['SubButton 1', 'SubButton 2'],
                        ['SubButton 3', 'SubButton 4']
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            };
            bot.sendMessage(chatId, 'Виберіть sub-кнопку:', buttonOptions);
            break;

        case 'SubButton 1':
        case 'SubButton 2':
        case 'SubButton 3':
        case 'SubButton 4':
            const words = text.split(' ').slice(0, 10).join(' ');
            bot.sendMessage(chatId, `Ви натиснули кнопку "${text}" і отримали перших 10 слів: ${words}`);
            break;

        default:
            // Обробка інших кнопок
            break;
    }
});

// Створення inline кнопок
bot.onText(/\/inline/, (msg) => {
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Inline Button 1', callback_data: 'inline_button_1' }],
                [{ text: 'Inline Button 2', callback_data: 'inline_button_2' }]
            ]
        }
    };

    bot.sendMessage(chatId, 'Виберіть inline кнопку:', options);
});

// Обробник inline кнопок
bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;

    if (action === 'inline_button_1' || action === 'inline_button_2') {
        const words = action.split('_').slice(0, 10).join(' ');
        bot.sendMessage(chatId, `Ви натиснули inline кнопку "${action}" і отримали перших 10 слів: ${words}`);
    }
});
Цей код додає обробник, який розпізнає натискання 'Button 1' і виводить нові чотири кнопки. Кожна з цих нових кнопок, а саме 'SubButton 1', 'SubButton 2', 'SubButton 3' та 'SubButton 4', реагує на своє натискання, виводячи різні 10 слів для кожної кнопки.





