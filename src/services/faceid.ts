import * as faceapi from 'face-api.js';

const loadModals = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
};

const loadLabeledImages = async () => {
    //This needs to be implemented
    //Need to call images from storage and add them into a database
};

export {
    loadModals,
};