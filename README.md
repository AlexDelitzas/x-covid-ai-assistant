# X-COVID AI Assistant

A Web Application to detect signs of COVID-19 presence from Chest X-Rays using Deep Learning

## Motivation

With shortages and delays in PCR tests, chest x-rays have become one of the fastest and most affordable ways for doctors to triage patients. In many hospitals, patients often have to wait six hours or more for a specialist to look at their x-rays. If an emergency room doctor could get an initial reading from an AI-based tool, it could dramatically shrink that wait time. Before the pandemic, health-care AI was already a booming area of research. Deep learning, in particular, has demonstrated impressive results for analyzing medical images to identify diseases like breast and lung cancer or glaucoma at least as accurately as human specialists.

## Acknowledgements

We would like to thank deeply the team behind [COVID-Net Open Source Initiative](https://github.com/lindawangg/COVID-Net). Our project is an attempt to incorporate COVID-Net into the heart of a web-based application that could be used by health care providers as a supportive tool on the examination process and patient triage.

## Demo

A live demo of the web application is currently running here: http://xcovid-ai-assistant.cf

## How to use

**Step 1**: Open the application via a web browser

<p align="center">
    <img src="https://raw.githubusercontent.com/AlexDelitzas/x-covid-ai-assistant/master/media/app1.png" width="90%">
</p>

**Step 2**: Upload the Chest X-Ray that you want to check. For testing purposes, you can use a sample image that we provide.

<p align="center">
    <img src="https://raw.githubusercontent.com/AlexDelitzas/x-covid-ai-assistant/master/media/app2.png" width="90%">
</p>

**Step 3**: Click the "Check" button and wait for the evaluation process to complete (usually this takes less than 10 seconds)
<p align="center">
    <img src="https://raw.githubusercontent.com/AlexDelitzas/x-covid-ai-assistant/master/media/app3.png" width="90%">
</p>

**Step 4**: The model's prediction is ready!

<p align="center">
    <img src="https://raw.githubusercontent.com/AlexDelitzas/x-covid-ai-assistant/master/media/app4.png" width="90%">
</p>

## Prerequisites

* Docker
* Docker-compose

## Deployment

### Step 1 - Download COVID-NET pretrained model

* Download all the files from this [link](https://bit.ly/CovidNet-CXR-Large)
* Add all these files in the folder *backend/src/cnn_model/*

  Your folder structure must look like this:
  
  ```bash
  ./backend/src/cnn_model/
  │  ├── savedModel/
  │  │   ├── saved_model.pb             
  │  │   └── variables/
  │  │   │   ├── variables.data-00000-of-00001  
  │  │   │   └── variables.index
  │  ├── model.meta       
  │  ├── model-8485.index   
  │  ├── checkpoint
  │  └── model-8485.data-00000-of-00001         
  ```

### Step 2 - Environment variables (optional)

Add a *.env* file in the root folder of the project and set the following variables:

| Environment variable | Description | 
| :-------------: | :-------------: |
| BASEURL | Base URL that is used for the requests |

### Step 3 - Run

Start:

    docker-compose -f docker-compose.yml up --build

Stop:

    Ctrl-C
    
**For detached mode**:

Start:

    docker-compose -f docker-compose.yml up -d --build

Stop:

    docker-compose down
    

