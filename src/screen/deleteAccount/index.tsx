/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {BackgroundView, Padding} from '../../css/main.style';
import HeaderScComponent from '../../components/header2';
import {TextInputSign} from '../signUp/style/signUp.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {Text, ScrollView, Button, View, Platform, Modal, Image,TouchableOpacity,Linking} from 'react-native';
import {Color} from '../../infrastructuer/theme/colors.style';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
  useController,
} from 'react-hook-form';
import {ContactGroupsContext} from '../../service/Address/types';
import {ControlledInput, ControlledInputPhone} from '../../components/textInputController';
import {AddressContext} from '../../service/Address/Address.context';
import {useContext} from 'react';
import {TOKEN} from '../../utils/main';
import DropdownAlert from 'react-native-dropdownalert';
import CheckBox from '../../components/checkBox';
import LineW from '../../components/lineW';
import {LoadingButton} from '../../components/buttonLoading';
import ControlledCheckBox from '../../components/controlledCheckBox';
import styled from 'styled-components';
import PickerController from '../../components/pickerController';
import {AuthContext} from '../../service/Auth/Auth.context';
import i18n from '../../core/i18n/config';
import Mailer from 'react-native-mail';
import {validateEmail} from '../../utils/regular';

const ViewLoading = styled(View)`
  height: 50;
  margin-top: 15;
  width: 100%;
`;
type FormValues = {
  first_name: string;
  last_name: string;
  name: string;
  company_name: string;
  phone: string;
  cart_title: string;
};
export default function DeleteAccountForm({navigation}) {
  const {...methods} = useForm();
  const {addAddressFn, isAddToData, isAddToDataLodging, getAddressSelect} =
    useContext(AddressContext);
  const {countries,deleteAccountFn} = useContext(AuthContext);

  let dropDownAlertRef = useRef();
  const [loading, isLoading] = useState<Boolean>(false);

  const [formError, setError] = useState<Boolean>(false);

  function onSubmit(data: FormValues) {
    console.log(data)
    if(validateEmail(data?.email)){


  isLoading(true)
   deleteAccountFn(data?.email).then((res)=>{
if (res) {
        dropDownAlertRef.alertWithType(
          'success',
          i18n.t("Global.RequestDelete"),
        );
      }
      isLoading(false)

   })
 }else{
   dropDownAlertRef.alertWithType(
          'error',
          i18n.t("Global.CheckEmail"),
        );
      }
 
  }
  
  const onError: SubmitErrorHandler<FormValues> = errors => {
    dropDownAlertRef.alertWithType(
      'error',
      i18n.t("Global.Allfields"),
    );

    return console.log('errors', errors);
  };

  return (
    <>
      <BackgroundView>
        <ScrollView>
          <HeaderScComponent navigation={navigation} title={i18n.t("Global.deleteAccount")} />

          <Padding>
          <Text style={{fontSize:18}}>
            {i18n.t("Global.deleteFile")}
          </Text>
           <Space lineH={10} />
            <Text style={{fontSize:16}}>
            {i18n.t("Global.PhoneNumberS")}
            <TouchableOpacity onPress={()=>{  Linking.openURL(`tel:+41618537100`);}}>
              <Text style={{color:Color.brand.blue}}>
            {"+41618537100"}

          </Text>
           </TouchableOpacity>
          </Text>
                     <Space lineH={10} />

            <Text style={{fontSize:16}}>
            {i18n.t("Global.email")+" : "}
             <TouchableOpacity onPress={()=>{  Linking.openURL(`mailto:nesrin.bicik@cleafin.com?subject=SendMail&body=Description') }
      title="delete my account`);}}>
             <Text style={{color:Color.brand.blue}}>
            {"nesrin.bicik@cleafin.com"}
          </Text>
             </TouchableOpacity>
          </Text>
                     <Space lineH={10} />

            <Text>
            {i18n.t("Global.AddressS")}
             <Text style={{color:Color.brand.colorButton}}>
            {"Nesil AG, Nesrin & Mustafa Bicik, Kanzleistrasse 3a, 4313 Möhlin, Switzerland."}
          </Text>
          </Text>
            <Space lineH={10} />

          <Text style={{color:Color.brand.colorButton}}>
            {i18n.t("Global.NoteS")}
          </Text>
           {/* <FormProvider {...methods}>
             
             
              
              <ControlledInput
                name="email"
                label={i18n.t("Global.email")}
                maxLength={40}
                placeholderTextColor={'#F9F9F9'}
                 rules={{required: 'Email is required!'}}
                setFormError={setError}
              />
             
              <ControlledInput
                name="address1"
                label={i18n.t("Global.deleteFile")}
                placeholderTextColor={'#F9F9F9'}
                setFormError={setError}
                style={{
                  height: 130,
                  textAlignVertical: 'auto',
                  paddingTop: 0,
                  paddingBottom: 0,
                  alignSelf: 'flex-start',
                }}
              />
            </FormProvider>*/}
            {/*<ViewLoading>
              <LoadingButton
                isActive={loading}
                title={i18n.t("Global.Submit")}
                onNext={methods.handleSubmit(onSubmit, onError)}
                onClose={() => {}}
              />
            </ViewLoading>
            <Space lineH={80} />*/}
          </Padding>
        </ScrollView>
        <DropdownAlert
          titleNumOfLines={3}
          renderImage={props => {
            return (
              <Image
              resizeMode='center'
                style={{width: 50, height: 30,tintColor:Color.brand.white}}
                source={require('../../assets/image/cleafin_logo.png')}
              />
            );
          }}
          ref={ref => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
        />
      </BackgroundView>
    </>
  );
}
