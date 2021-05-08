from flask import Flask, request, render_template, request, redirect, url_for, send_from_directory
import requests
import json
import os

import decrypt as dec
import encrypt as enc   
from encryptv2 import encrypt, decode
import encryptv2 as e

UPLOAD_FOLDER = 'static'
app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def index():
    #return render_template("base.html")
    return render_template("index.html")

@app.route('/encrypt')
def encrypted():
    return render_template("encrypt.html")

@app.route('/decrypt')
def decrypted():
    return render_template("decrypt.html")

@app.route('/aboutus')
def aboutus():
    return render_template("about.html")

# Route that will process the file upload
@app.route('/upload_encrypt', methods=['POST'])
def upload_encrypt():
    # Get the name of the uploaded file
    if request.method == 'POST':
        file = request.files['file']
        #feature = request.form['feature']
        #print(feature)
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        enc.encrypt(filename)
        #copy = e.encrypt(UPLOAD_FOLDER+"/"+filename, message)
        #copy.save(os.path.join(app.config['UPLOAD_FOLDER'], filename[:-4] + "_copy.png"))
        return redirect(url_for("view", filename=filename))
    # Check if the file is one of the allowed types/extensions
    else:
        return "File bad"

@app.route('/upload_decrypt', methods=['POST'])
def upload_decrypt():
    # Get the name of the uploaded file
    if request.method == 'POST':
        file = request.files['file']
        #file_kr = request.files['filekr']
        #file_kc = request.files['filekc']
        #file_item = request.files['fileitem']
        
        #feature = request.form['feature']
        #print(feature)
        filename = file.filename
        #filename_kr = file_kr.filename
        #filename_kc = file_kc.filename
        #filename_item = file_item.filename
        
        #Save file
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        #file_kr.save(os.path.join(app.config['UPLOAD_FOLDER'], filename_kr))
        #file_kc.save(os.path.join(app.config['UPLOAD_FOLDER'], filename_kc))
        #file_item.save(os.path.join(app.config['UPLOAD_FOLDER'], filename_item))
        dec.decrypt(filename)
        
        #copy = e.encrypt(UPLOAD_FOLDER+"/"+filename, message)
        #copy.save(os.path.join(app.config['UPLOAD_FOLDER'], filename[:-4] + "_copy.png"))
        return render_template("decrypt.html", orig=filename, encoded=filename)
    # Check if the file is one of the allowed types/extensions
    else:
        return "File bad"


@app.route('/view/<filename>')
def view(filename):
    print (filename)
    return render_template("view.html", orig=filename, encoded=filename)


@app.route('/upload/<filename>/', methods=['POST'])
def uploaded_image(filename):
    message = dec.decrypt(filename)
    print (message)
    return render_template("decode.html", message=message)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8080)

