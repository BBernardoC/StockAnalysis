from services.stock_service import getStock
from views.stock_view import render_stock


def get_stock(ticker, timestamp):
    stock = getStock(ticker,timestamp)
    return render_stock(stock)