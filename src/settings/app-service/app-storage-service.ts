import {CompanyLoginResponseType} from '../controllers/types';

//KEYS
const USER_INFO = 'USER_INFO';

/***----------------------------USER INFO------------------------- */
export const setUserInfo = (user_info: CompanyLoginResponseType) => {
  localStorage.setItem(USER_INFO, JSON.stringify(user_info));
};

export const getUserInfo = (): CompanyLoginResponseType | null => {
  try {
    const jsonUser = localStorage.getItem(USER_INFO);

    if (!jsonUser) {
      throw new Error();
    }
    const userObject = JSON.parse(jsonUser);
    if (!userObject) {
      throw new Error();
    }
    return userObject;
  } catch (error) {
    return null;
  }
};

export const deleteUserInfo = () => {
  localStorage.removeItem(USER_INFO);
};
