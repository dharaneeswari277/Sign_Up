import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

    var firebaseConfig = {
            apiKey: "AIzaSyDegHRHsvjy1dYjklGXaK3E5DUlSlVWyG0",
            authDomain: "otp-app-c9630.firebaseapp.com",
            projectId: "otp-app-c9630",
            storageBucket: "otp-app-c9630.appspot.com",
            messagingSenderId: "640355470131",
            appId: "1:640355470131:web:3b414852e164905d99cc46"
          };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);