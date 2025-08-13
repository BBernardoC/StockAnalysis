from services.stock_service import getStock
from views.stock_view import render_stock
from views.stock_view import render_stock_info
from services.stock_service import getStockInfo

def get_stock(ticker, timestamp='1mo'):
    stock_data = getStock(ticker, timestamp)
    return render_stock(stock_data)


def get_stock_info(ticker):
    stock_info = getStockInfo(ticker)
    return render_stock_info(stock_info)