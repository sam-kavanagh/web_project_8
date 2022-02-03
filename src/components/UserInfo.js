class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return { 
      userName: this._userNameElement.textContent, 
      userDescription: this._userDescriptionElement.textContent, 
    }; 
  } 

  setUserInfo(data) { 
    this._userNameElement.textContent = data.Name; 
    this._userDescriptionElement.textContent = data.Description; 
  }
}

export default UserInfo;
