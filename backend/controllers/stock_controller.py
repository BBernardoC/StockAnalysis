from services.stock_service import getStock
from views.stock_view import render_stock

def get_stock(ticker, timestamp='1mo'):
    stock_data = getStock(ticker, timestamp)
    return render_stock(stock_data)
