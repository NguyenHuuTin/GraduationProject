export const userLoginFetch = (email, pass) => {
    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", pass);
  return (dispatch) => {
    return fetch("http://localhost:57678/Login", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ formData }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) {
        } else {
            console.log(data.jwt)
          localStorage.setItem("token", data.jwt);
          dispatch(loginUser(data.user));
        }
      });
  };
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});

const initialState = {
  currentUser: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
