from flask import jsonify
def render_stock(stock):
    if stock is None:
        return jsonify({}), 404
    stock_dict = stock.to_dict(orient="records")
    converted = []

    for item in stock_dict:
        new_item = {}
        for key, value in item.items():
            new_item[key[0]] = value
        converted.append(new_item)

    print(stock)
    print('--------------')
    print(stock_dict)
    return jsonify(converted)