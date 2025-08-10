

class Stock:
    def __init__(self,ticker,close,high,low,open,volume,date):
        self.ticker = ticker
        self.close  = close
        self.open= open
        self.high = high
        self.low = low
        self.volume = volume
        self.date = date
    def to_dict(self):
        return{
            "ticker": self.ticker,
            "close": self.close,
            "open": self.open,
            "high": self.high,
            "low": self.low,
            "volume": self.volume,
            "date": self.date
        }
