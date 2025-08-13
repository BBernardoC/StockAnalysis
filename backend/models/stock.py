class Stock:
    def __init__(self, ticker, close, high, low, open, volume,date):
        self.ticker = ticker
        self.close = float(close)
        self.open = float(open)
        self.high = float(high)
        self.low = float(low)
        self.volume = int(volume)
        self.date = str(date)
    def to_dict(self):
        return {
            "ticker": self.ticker,
            "close": self.close,
            "open": self.open,
            "high": self.high,
            "low": self.low,
            "volume": self.volume,
            "date": self.date,

        }


class StockInfo:
    def __init__(self, ticker, priceToBookRatio, priceToEarningsRatio, dividendYield, debtToEquity, ebitda, enterpriseToEbitda, enterpriseToRevenue, enterpriseValue, fiftyTwoWeekHigh, fiftyTwoWeekHighChange, fiftyTwoWeekHighChangePercent, fiftyTwoWeekLow, fiftyTwoWeekLowChange, fiftyTwoWeekLowChangePercent, floatShares, marketCap, overallRisk, payoutRatio, returnOnAssets, returnOnEquity, revenueGrowth, revenuePerShare, targetHighPrice, targetLowPrice, targetMeanPrice, targetMedianPrice, totalDebt):
        self.ticker = ticker
        self.priceToBookRatio = priceToBookRatio
        self.priceToEarningsRatio = priceToEarningsRatio
        self.dividendYield =  dividendYield
        self.debtToEquity = debtToEquity
        self.ebitda = ebitda
        self.enterpriseToEbitda = enterpriseToEbitda
        self.enterpriseToRevenue = enterpriseToRevenue
        self.enterpriseValue = enterpriseValue
        self.fiftyTwoWeekHigh = fiftyTwoWeekHigh
        self.fiftyTwoWeekHighChange = fiftyTwoWeekHighChange
        self.fiftyTwoWeekHighChangePercent = fiftyTwoWeekHighChangePercent
        self.fiftyTwoWeekLow = fiftyTwoWeekLow
        self.fiftyTwoWeekLowChange = fiftyTwoWeekLowChange
        self.fiftyTwoWeekLowChangePercent = fiftyTwoWeekLowChangePercent
        self.floatShares = floatShares
        self.marketCap = marketCap
        self.overallRisk = overallRisk
        self.payoutRatio = payoutRatio
        self.returnOnAssets = returnOnAssets
        self.returnOnEquity = returnOnEquity
        self.revenueGrowth = revenueGrowth
        self.revenuePerShare = revenuePerShare
        self.targetHighPrice = targetHighPrice
        self.targetLowPrice = targetLowPrice
        self.targetMeanPrice = targetMeanPrice
        self.targetMedianPrice = targetMedianPrice
        self.totalDebt = totalDebt

    def to_dict(self):
        return {
    'ticker_name': self.ticker,
    'priceToBookRatio': self.priceToBookRatio,
    'priceToEarningsRatio': self.priceToEarningsRatio,
    'dividendYield': self.dividendYield,
    'debtToEquity': self.debtToEquity,
    'ebitda':  self.ebitda,
    'enterpriseToEbitda':  self.enterpriseToEbitda,
    'enterpriseToRevenue':  self.enterpriseToRevenue,
    'enterpriseValue':  self.enterpriseValue,
    'fiftyTwoWeekHigh':  self.fiftyTwoWeekHigh,
    'fiftyTwoWeekHighChange':  self.fiftyTwoWeekHighChange,
    'fiftyTwoWeekHighChangePercent':  self.fiftyTwoWeekHighChangePercent,
    'fiftyTwoWeekLow':  self.fiftyTwoWeekLow,
    'fiftyTwoWeekLowChange':  self.fiftyTwoWeekLowChange,
    'fiftyTwoWeekLowChangePercent':  self.fiftyTwoWeekLowChangePercent,
    'floatShares':  self.floatShares,
    'marketCap':  self.marketCap,
    'overallRisk':  self.overallRisk,
    'payoutRatio':  self.payoutRatio,
    'returnOnAssets':  self.returnOnAssets,
    'returnOnEquity':  self.returnOnEquity,
    'revenueGrowth':  self.revenueGrowth,
    'revenuePerShare':  self.revenuePerShare,
    'targetHighPrice':  self.targetHighPrice,
    'targetLowPrice':  self.targetLowPrice,
    'targetMeanPrice':  self.targetMeanPrice,
    'targetMedianPrice':  self.targetMedianPrice,
    'totalDebt':  self.totalDebt}