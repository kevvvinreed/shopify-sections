from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/log', methods=['POST'])
def log():
    data = request.get_json()
    app.logger.info(f"Received log data: {data}")
    return jsonify({"status": "success"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
