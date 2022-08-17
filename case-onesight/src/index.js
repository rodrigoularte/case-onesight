import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBlSTCWmpf67JoUbDWpiTbMsuimmJngWfI",
  authDomain: "case-onesight.firebaseapp.com",
  projectId: "case-onesight",
  storageBucket: "case-onesight.appspot.com",
  messagingSenderId: "863556114439",
  appId: "1:863556114439:web:572428af98a1c1229ff2a2"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)