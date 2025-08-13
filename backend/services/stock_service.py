import yfinance as yf
from models.stock import Stock 

#retorna close, high, low, open, volume
def getStock(ticker, timestamp='1mo'):
    ticker_name = f'{ticker}.SA'
    dados = yf.download(ticker_name, period=timestamp)
    print(dados.head())  # mostra as primeiras linhas do dataframe
    if dados.empty:
        return None

    stocks = []
    for idx, row in dados.iterrows():
        print(idx)
        stocks.append(Stock(
            ticker=ticker,
            close=float(row['Close']),
            high=float(row['High']),
            low=float(row['Low']),
            open=float(row['Open']),
            volume=int(row['Volume']),
            date=str(idx.date())
        ))
        
    return stocks
#retorna informacoes uteis
def getStockInfo(ticker):
    ticker_name = yf.Ticker(ticker)
    data = ticker_name.info
    priceToBookRatio = data['priceToBook']
    priceToEarningsRatio = data['trailingPE']
    dividendYeld = data['dividendYield']
    debtToEquity = data['debtToEquity']
    ebitda = data['ebitda']
    enterpriseToEbitda = data['enterpriseToEbitda']
    enterpriseToRevenue = data['enterpriseToRevenue']
    enterpriseValue = data['enterpriseValue']
    fiftyTwoWeekHigh = data['fiftyTwoWeekHigh']
    fiftyTwoWeekHighChange = data['fiftyTwoWeekHighChange']
    fiftyTwoWeekHighChangePercent = data['fiftyTwoWeekHighChangePercent']
    fiftyTwoWeekLow = data['fiftyTwoWeekLow']
    fiftyTwoWeekLowChange = data['fiftyTwoWeekLowChange']
    fiftyTwoWeekLowChangePercent = data['fiftyTwoWeekLowChangePercent']
    floatShares = data['floatShares']
    marketCap = data['marketCap']
    overallRisk = data['overallRisk']
    payoutRatio = data['payoutRatio']
    returnOnAssets = data['returnOnAssets']
    returnOnEquity = data['returnOnEquity']
    revenueGrowth = data['revenueGrowth']
    revenuePerShare = data['revenuePerShare']
    targetHighPrice = data['targetHighPrice']
    targetLowPrice = data['targetLowPrice']
    targetMeanPrice = data['targetMeanPrice']
    targetMedianPrice = data['targetMedianPrice']
    totalDebt = data['totalDebt']


