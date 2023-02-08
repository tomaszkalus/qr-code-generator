from flask import Flask
from flask import render_template, request, jsonify, url_for
from qr import generateQR_b64

app = Flask(__name__)

@app.route('/')
def index():
    placeholder_qr = generateQR_b64("Example QR code")
    return render_template('main.html', qr_image = placeholder_qr)

@app.route('/qr', methods=["POST"])
def qr():
    data = request.get_json()
    print(data)
    qr_b64 = generateQR_b64(data['text'], data['style'], data['fg'], data['bg'])
    return jsonify(qr = qr_b64)

