import { useNavigation } from "@react-navigation/native";
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "../../components/toast";
import httpCommon from "../../utils/http-common";
import { PartnerContext } from "../Partner/Partner.context";
import {
  singUpAc,
  singInAc,
  forgetPasswordAc,
  languageAc,
  countriesAc,
  linkForgetPasswordAc,
  legalsAc,
  deleteAccountAc,
  userDeactiveAc,
  userLegalsAc,
} from "./Auth.action";
import { SignUpModel } from "./model";
import { LinkForgetPassword } from "./types";
import Storage from "../../utils/storeData";

interface IAuthContext {
  isLoginOpen: boolean;
  isRegister: boolean;
  legals: Array<any>;
  showLegals: boolean;
  isLegals: boolean;
  isForgotPasswordOpen: boolean;
  linkForgetPasswordFn: (value: LinkForgetPassword) => void;
  setLoginOpen: (toggle: boolean) => void;
  setRegisterOpen: (toggle: boolean) => void;
  setForgotPasswordOpen: (toggle: boolean) => void;
  singUpFn: () => void;
  singInFn: () => void;
  forgetPasswordFn: (email:string) => void;
  countriesFn: () => void;
  languageFn: () => void;
  legalsFn: (value: any) => void;
  userLegalsFn: () => void;
  activeForm: (value: boolean) => void;
  deleteAccountFn: (val: any) => void;
  userDeactiveFn():() => void;
  language: any;
  countries: any;
  isForm: boolean;
  isLoginApi: boolean;
  isRegisterOpen: boolean;
  isShowError: boolean;
  messageError: string;
  checkEmail: number;
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const [showLegals, isLegals] = useState(false);

  const [isRegister, setRegister] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [legals, setLegals] = useState({ key: "test" });

  const [language, setLanguage] = useState([]);
  const [isForm, setForm] = useState(false);
  const [isShowError, setIsShowError] = useState(false);
    const [checkEmail, setCheckEmail] = useState(0);

  const [messageError, setMessageError] = useState(null);
  const { partnerIdFn } = useContext(PartnerContext);
  const [isLoginApi, setLoginApi] = useState(false);
  function activeForm(value: boolean) {
    setForm(value);
  }
  function userDeactiveFn() {

    return userDeactiveAc().then((is) => {
      console.log("is", is);

      return is;
    });
  }

 function deleteAccountFn(val: object) {

  
   const object ={
     email:val
   }
    return deleteAccountAc(object).then((is) => {
      console.log("is", is);

      return true;
    });
  }
  function singUpFn() {
    setRegister(true);
    setRegisterOpen(false);
   return singUpAc().then((is) => {
      setRegister(false);
      

      setRegisterOpen(is);
      return is;
    });
  }
  function legalsFn(value: object) {
    return legalsAc(value).then((is) => {
      console.log("is", is);

      return true;
    });
  }
  function userLegalsFn() {
    userLegalsAc().then((is) => {
      console.log("is", is);

      if (Array.isArray(is)) {
        if (is.length > 0) {
          isLegals(true);
          Storage.removeDataAll();
          Storage.removeData("TOKEN");
          httpCommon.defaults.headers.common.Authorization = '';
        }
      } else {
        if (is != null) {
          isLegals(true);
      
        }
      }
      setLegals(is);
    });
  }

  function singInFn() {
    setLoginApi(true);
    setLoginOpen(false);
    setIsShowError(false);
    singInAc()
      .then((is) => {
        setLoginApi(false);

        if (!is.status) {
         
          
          setMessageError(is.message);
          setIsShowError(!is.status);
        } else {
          userLegalsFn();
          if (is?.sponsor) {
            partnerIdFn(is?.sponsor);
          }

          setLoginOpen(is.status);
        }
        
      })
      .catch(() => {});
    setIsShowError(false);
  }
  function linkForgetPasswordFn(value: LinkForgetPassword) {
    linkForgetPasswordAc(value).then((is) => {
      // setLoginOpen(is);
    });
  }
  function forgetPasswordFn(email:string) {

    return forgetPasswordAc(email).then((is) => {
      return is;
    });
  }
  function countriesFn() {
    countriesAc().then((is) => {
      let data = is.map((value) => {
        console.log("====================================");
        console.log("countriesFn", value.id + "" + value.name);
        console.log("====================================");
        return { label: value.name, value: value.id };
      });
      setCountries(data);
    });
  }
  function languageFn() {
    languageAc().then((is) => {
      let data = is.map((value) => {
        return { label: value.title, value: value.id };
      });
      setLanguage(data);
    });
  }
  return (
    <AuthContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        isForgotPasswordOpen,
        setLoginOpen,
        isRegister,
        setRegisterOpen,
        setForgotPasswordOpen,
        singUpFn,
        singInFn,
        forgetPasswordFn,
        countriesFn,
        languageFn,
        countries,
        language,
        linkForgetPasswordFn,
        isForm,
        activeForm,
        messageError,
        isShowError,
        isLoginApi,
        legals,
        isLegals,
        userDeactiveFn,
        showLegals,
        userLegalsFn,
        legalsFn,
        deleteAccountFn,
        checkEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
