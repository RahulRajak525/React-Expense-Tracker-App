import { TaskTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

class apiUserService {
  BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
  static getInstance() {
    return new apiUserService();
  }

  signUp = async (data) => {
    const response = await fetch(
      this.BASE_URL + "signUp?key=AIzaSyDbDSlySR8WAR4IxsWoqAc35wNTfvi8Dos",
      {
        method: "POST",
        body: JSON.stringify({
          email: data.userEmail,
          password: data.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success("Account created successfully!");
      return data;
    } else {
      const data_1 = await response.json();
      let errorMessage = data_1.error.errors[0].message;
      toast.error(errorMessage);
      return;
    }
  };

  signIn = async (data) => {
    const response = await fetch(
      this.BASE_URL +
        "signInWithPassword?key=AIzaSyDbDSlySR8WAR4IxsWoqAc35wNTfvi8Dos",
      {
        method: "POST",
        body: JSON.stringify({
          email: data.userEmail,
          password: data.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success("Login successfully, Welcome to Expense Tracker!");
      return data;
    } else {
      const data_1 = await response.json();
      let errorMessage = data_1.error.errors[0].message;
      toast.error(errorMessage);
    }
  };

  updateProfile = async (data) => {
    const idToken = localStorage.getItem("idToken");
    const response = await fetch(
      this.BASE_URL + "update?key=AIzaSyDbDSlySR8WAR4IxsWoqAc35wNTfvi8Dos",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: data.displayName,
          photoUrl: data.photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success("Profile updated successfully");
      return data;
    }
  };
  getUserData = async () => {
    const idToken = localStorage.getItem("idToken");
    const response = await fetch(
      this.BASE_URL + "lookup?key=AIzaSyDbDSlySR8WAR4IxsWoqAc35wNTfvi8Dos",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data2 = await response.json();
      const errorMessage = data2.error.message;
      toast.error(errorMessage, "Please logout");
    }
  };
  resetPassword = async (data) => {
    const response = await fetch(
      this.BASE_URL + "sendOobCode?key=AIzaSyDbDSlySR8WAR4IxsWoqAc35wNTfvi8Dos",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: data.userEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success("A link is send to your email, please check!")
      return data;
    }
  };
}

export const ApiUserService = apiUserService.getInstance();
