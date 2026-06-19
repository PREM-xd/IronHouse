import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import axios from "axios";

export const registerFCM = async () => {
  try {
    const permission =
      await Notification.requestPermission();

    if (permission !== "granted") {
      return;
    }

    const token = await getToken(
      messaging,
      {
        vapidKey:
          "BAnccXVP1-YKC1ayZDobM6ex_gCVg-4GVEWK5bRRxx_1nAn05AZAgqFS2VjzLP3IVeShfr43LzO0LbWzXYqdN1o",
      }
    );

    console.log("FCM TOKEN:", token);

    const jwt =
      localStorage.getItem("token");

    if (jwt && token) {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/fcm/save-token`,
        {
          token,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};