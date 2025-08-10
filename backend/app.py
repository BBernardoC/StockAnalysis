# backend/app.py
from flask import Flask
from controllers.stock_controller import get_stock
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/stock/<ticker>/<timestamp>")
def get_stock_data(ticker, timestamp):
    return get_stock(ticker,timestamp)

if __name__ == "__main__":
    app.run(debug=True)
