rypto Telegram Bot (Updated Version)

This is an updated version of the Crypto Telegram Bot, bringing new features such as live price tracking and account balance retrieval from OKX and Binance. It retains all previous functionalities while enhancing user experience with additional commands.

Updated Features

Live price tracking for selected cryptocurrency pairs.

Retrieve account balances from OKX and Binance.

Improved monitoring capabilities with more precise alerts.

Installation

Clone the repository:
git clone https://github.com/U82146510/telegram-crypto-price-alert
cd telegram-trade-warrning

Install dependencies:
npm install

Create a .env file and add your Telegram bot token:
telegram_token=your_telegram_bot_token

Start the bot:
npm startor
node index.ts

Commands & Usage

/start - Start monitoring crypto prices.
/stop - Stop monitoring crypto prices.
/high - Display the highest recorded prices.
/low - Display the lowest recorded prices.
/live - Show real-time prices for selected cryptocurrency pairs (New Feature!).
/ok - Show account balance on OKX exchange (New Feature!).
/binance - Show account balance on Binance exchange (New Feature!).
min:<currency_pairs>: - Set the lowest price target (e.g., min:btcusdt:5000).
max:<currency_pairs>: - Set the highest price target (e.g., max:btcusdt:15000).

Dependencies

Node.js

Telegraf (Telegram bot framework)

WebSocket (for real-time crypto price updates)

Binance API (for retrieving Binance balances)

OKX API (for retrieving OKX balances)

License

This project is licensed under the MIT License.

Author

[U82146510]

Enjoy real-time crypto monitoring with instant alerts and new features!