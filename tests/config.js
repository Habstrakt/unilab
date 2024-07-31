const config = {
  baseURL: "http://10.25.1.88:8005",
  credentials: {
    username: "test3_ttt",
    password: "uni_987572*msa"
  },
  selectors: {
    loginForm: {
      usernameInput: "#id_username",
      passwordInput: "#id_password",
      submitButton: "#login-form-content-main > form > button"
    },
    header: ".header",
    oldPassword: "#id_old_password",
    newPassword: "#id_new_password1",
    confirmNewPassword: "#id_new_password2",
    userMenu: "#user-menu",
    changePasswordLink: "#user-menu-block > ul > li:nth-child(1) > a"
  },
  expectedTexts: {
    changePasswordHeader: "Изменение своего пароля"
  }
};

module.exports = config;