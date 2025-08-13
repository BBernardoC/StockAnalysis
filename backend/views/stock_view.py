from flask import jsonify

def render_stock(stock):
    print("cheugei view")
    if stock is None:
        return jsonify({}), 404

    if isinstance(stock, list) and all(hasattr(s, "to_dict") for s in stock):
        return jsonify([s.to_dict() for s in stock])

    return jsonify({"error": "Formato de dados não suportado"}), 500
