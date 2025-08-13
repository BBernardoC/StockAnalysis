# backend/app.py
from flask import Flask
from controllers.stock_controller import get_stock, get_stock_info
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/stock/<ticker>/<timestamp>")
def get_stock_data(ticker, timestamp):
    return get_stock(ticker,timestamp)


@app.route("/stock/<ticker>")
def get_stock_information(ticker):
    return get_stock_info(ticker)


if __name__ == "__main__":
    app.run(debug=True)


