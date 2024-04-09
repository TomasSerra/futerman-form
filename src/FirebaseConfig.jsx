import { initializeApp, firebase } from "firebase/app";
import 'firebase/database';

// Configura Firebase con la configuración de tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyDm9Y7WW-Ovh9k9FigCTn6tU6AjKifPjas",
    authDomain: "futerman-form.firebaseapp.com",
    databaseURL: "https://futerman-form-default-rtdb.firebaseio.com",
    projectId: "futerman-form",
    storageBucket: "futerman-form.appspot.com",
    messagingSenderId: "162031980761",
    appId: "1:162031980761:web:66686118d643348f8beec8"
  };

const app = initializeApp(firebaseConfig);

export default app;

