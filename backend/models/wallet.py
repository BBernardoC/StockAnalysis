class UserWallet:
    cpf: int
    ticker: str
    quantity: int
    price_bought: float
    price_sold: float = None
    date_insert: str
    order_date: str
    total_invested: float = None
    


    def to_dict(self):
        return {
            "cpf": self.cpf,
            "ticker": self.ticker,
            "quantity": self.quantity,
            "price_bought": self.price_bought,
            "price_sold": self.price_sold,
            "date_insert": self.date_insert,
            "order_date": self.order_date,
            "total_invested": self.quantity * self.price_bought if self.total_invested is None else self.total_invested,
        }