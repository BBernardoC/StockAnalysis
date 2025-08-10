import yfinance as yf
from models.stock import Stock 


def getStock(ticker, timestamp = '1mo'):
    # Defina o ticker da ação
    ticker_name = f'{ticker}.SA'
    dados = yf.download(ticker_name, period=timestamp)
    # Exiba os dados
    print(dados)
    return dados