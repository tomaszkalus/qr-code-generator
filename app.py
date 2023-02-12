from flask import Flask
from flask import render_template, request, jsonify, url_for
from qr import generateQR_b64

app = Flask(__name__)
EXAMPLE_QR = "Enter some text to convert it to QR code!"


@app.route('/')
def index():
    placeholder_qr = generateQR_b64(EXAMPLE_QR)
    return render_template('main.html', qr_image = placeholder_qr)

@app.route('/qr', methods=["POST"])
def qr():
    data = request.get_json()
    text = data['text']
    if not text:
        text = EXAMPLE_QR
    qr_b64 = generateQR_b64(text, data['style'], data['fg'], data['bg'])
    return jsonify(qr = qr_b64)

