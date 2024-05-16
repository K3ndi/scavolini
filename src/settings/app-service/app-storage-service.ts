// //THE MMKV WILL BE STORED HERE
// // import {MMKV} from 'react-native-mmkv';
// import {CompanyLoginResponseType} from '../controllers/types';

// //KEYS
// const USER_INFO = 'USER_INFO';

// export const appStorage = new MMKV();

// /***----------------------------USER INFO------------------------- */
// export const setUserInfo = (user_info: CompanyLoginResponseType) => {
//   appStorage.set(USER_INFO, JSON.stringify(user_info));
// };

// export const getUserInfo = (): CompanyLoginResponseType | null => {
//   try {
//     const jsonUser = appStorage.getString(USER_INFO);
//     if (!jsonUser) {
//       throw new Error();
//     }
//     const userObject = JSON.parse(jsonUser);
//     if (!userObject) {
//       throw new Error();
//     }
//     return userObject;
//   } catch (error) {
//     return null;
//   }
// };

// export const deleteUserInfo = () => {
//   appStorage.delete(USER_INFO);
// };
const test = 12
export {test}
