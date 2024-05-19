import {InsterDataType} from '../../store/logic-slice/logic.slice';
import {CompanyLoginResponseType} from '../controllers/types';

//KEYS
const USER_INFO = 'USER_INFO';

const INSERT_DATA_SELECTED = 'INSERT_DATA_SELECTED';

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

/**------------------------INSERT DATA-------------------------------- */
export const setInsertDataInfo = (data: InsterDataType) => {
  localStorage.setItem(INSERT_DATA_SELECTED, JSON.stringify(data));
};

export const getInsertDataInfo = (): InsterDataType | null => {
  try {
    const jsonUser = localStorage.getItem(INSERT_DATA_SELECTED);

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

export const deleteInserDataInfo = () => {
  localStorage.removeItem(INSERT_DATA_SELECTED);
};
