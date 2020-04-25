from flask import Flask, request

import json
import sys
import numpy as np
import tensorflow as tf
from flask_cors import CORS

import numpy as np
import cv2
import base64
from PIL import Image
from io import BytesIO
import os

# import matplotlib.pyplot as plt
# from lime import lime_image
# from lime import lime_base
# from lime.wrappers.scikit_image import SegmentationAlgorithm
# from skimage.segmentation import mark_boundaries

app = Flask(__name__)

CORS(app)

global sess
global graph
global image_tensor
global pred_tensor

my_path = os.path.abspath(os.path.dirname(__file__))

weightspath = 'cnn_model/'
metaname = 'model.meta'
ckptname = 'model-8485'

sess = tf.compat.v1.Session()
tf.compat.v1.get_default_graph()
saver = tf.train.import_meta_graph(os.path.join(my_path, weightspath, metaname))
saver.restore(sess, os.path.join(my_path, weightspath, ckptname))

graph = tf.compat.v1.get_default_graph()

image_tensor = graph.get_tensor_by_name("input_1:0")
pred_tensor = graph.get_tensor_by_name("dense_3/Softmax:0")

# def predict_proba(X):
#
#     out = sess.run(pred_tensor, feed_dict={image_tensor: X})
#     return out
#
# def explain_image_with_lime(input_image, label):
# 	print('I am here')
# 	# plt.rcParams['figure.figsize'] = [10, 5]
#
# 	explainer = lime_image.LimeImageExplainer()
# 	explanation = explainer.explain_instance(input_image, predict_proba, top_labels=2, hide_color=None, num_samples=100)
#
# 	# fig = plt.figure(figsize=[11.3, 8.8])
# 	# plt.subplot(121)
# 	# plt.imshow(input_image)
#
# 	# plt.subplot(122)
# 	temp, mask = explanation.get_image_and_mask(label, positive_only=False, num_features=20, hide_rest=False)
# 	# plt.imshow(mark_boundaries(temp, mask))
#
#
# 	output_path_lime = './image-tmp/lime_output.png'
# 	plt.imsave(output_path_lime, mark_boundaries(temp, mask))
#
# 	with open(output_path_lime, "rb") as imageFile:
# 		imageDataURI = str(base64.b64encode(imageFile.read()))
# 		imageDataURI = imageDataURI[2:]
# 		imageDataURI = 'data:image/png;base64,' + str(imageDataURI[:-1])
#
# 	# plt.show()
#
# 	return imageDataURI

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


	mapping = {'normal': 0, 'pneumonia': 1, 'COVID-19': 2}
	inv_mapping = {0: 'normal', 1: 'pneumonia', 2: 'COVID-19'}


	x = cv2.cvtColor(np.array(img_init), cv2.COLOR_BGR2RGB)
	h, w, c = x.shape
	x = x[int(h/6):, :]
	x = cv2.resize(x, (224, 224))
	x = x.astype('float32') / 255.0
	model_out = sess.run(pred_tensor, feed_dict={image_tensor: np.expand_dims(x, axis=0)})
	mapping = {'normal': 0, 'pneumonia': 1, 'COVID-19': 2}
	inv_mapping = {0: 'normal', 1: 'pneumonia', 2: 'COVID-19'}

	label = np.argmax(model_out, axis=1)[0]
	label_name = inv_mapping[label]

	# imageDataURI = explain_image_with_lime(x, label)
	print(model_out)

	if label_name == 'COVID-19':
		message = 'There are potential signs of COVID-19 on the Chest X-Ray. It is advised that the patient receives further examination.'
	elif label_name == 'normal':
		message = 'There are no potential signs of COVID-19 on the Chest X-Ray. Please make sure to further confirm the results.'
	else:
		message = 'There are potential signs of pneumonia on the Chest X-Ray. It is advised that the patient receives further examination.'

	return json.dumps({"notes": message})#, "activatedImageDataURI": imageDataURI})

if __name__ == "__main__":

    app.run(host='0.0.0.0', port=5000, debug=True)
