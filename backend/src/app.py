from flask import Flask, request

import json
import sys
import numpy as np
from keras import backend as K
import tensorflow as tf
from flask_cors import CORS
from keras.models import load_model

import numpy as np
import cv2
import base64
from PIL import Image
from io import BytesIO

import matplotlib.pyplot as plt

app = Flask(__name__)

CORS(app)


# def load_cnn_model():
# 	model = None
# 	print('[*] Model loaded')
#
# 	return model

@app.route('/')
def index():
	return "Flask server"

@app.route('/run_cnn', methods = ['POST'])
def postdata():

	data = request.get_json()

	imageDataURI = data.get('imageDataURI')

	header, encoded = imageDataURI.split(",", 1)
	img_bytes = base64.b64decode(encoded)
	img_init = Image.open(BytesIO(img_bytes))

	# img = cv2.cvtColor(np.array(img_init), cv2.COLOR_BGR2RGB)

	# img = cv2.resize(img, (224, 224))
	#
	# img = np.expand_dims(img, axis=0)

	weightspath = './cnn_model/'
	metaname = 'model.meta'
	ckptname = 'model-8485'

	mapping = {'normal': 0, 'pneumonia': 1, 'COVID-19': 2}
	inv_mapping = {0: 'normal', 1: 'pneumonia', 2: 'COVID-19'}

	sess = tf.compat.v1.Session()
	tf.compat.v1.get_default_graph()
	saver = tf.compat.v1.train.import_meta_graph(os.path.join(args.weightspath, args.metaname))
	saver.restore(sess, os.path.join(args.weightspath, args.ckptname))

	graph = tf.compat.v1.get_default_graph()

	image_tensor = graph.get_tensor_by_name("input_1:0")
	pred_tensor = graph.get_tensor_by_name("dense_3/Softmax:0")
# 	parser = argparse.ArgumentParser(description='COVID-Net Inference')
# parser.add_argument('--weightspath', default='C:/Users/Vasilis/Downloads/COVIDNet-CXR-Large/', type=str, help='Path to output folder')
# parser.add_argument('--metaname', default='model.meta', type=str, help='Name of ckpt meta file')
# parser.add_argument('--ckptname', default='model-8485', type=str, help='Name of model ckpts')
# parser.add_argument('--imagepath', default='C:/Users/Vasilis/Downloads/keras-covid-19/dataset/covid/ryct.2020200028.fig1a.jpeg', type=str, help='Full path to image to be inferenced')
	# plt.imsave('./image-tmp/original_resized.png', img)
	x = cv2.cvtColor(np.array(img_init), cv2.COLOR_BGR2RGB)
	h, w, c = x.shape
	x = x[int(h/6):, :]
	x = cv2.resize(x, (224, 224))
	x = x.astype('float32') / 255.0
	pred = sess.run(pred_tensor, feed_dict={image_tensor: np.expand_dims(x, axis=0)})

	print(pred)

	message = ''
	imageDataURI = ''
	return json.dumps({"notes": message, "activatedImageDataURI": imageDataURI})

if __name__ == "__main__":

    app.run(host='0.0.0.0', port=5000, debug=False)
