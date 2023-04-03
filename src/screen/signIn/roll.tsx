import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';
import { LoadingButton } from '../../components/buttonLoading';
import i18n from '../../core/i18n/config';
import { Color } from '../../infrastructuer/theme/colors.style';
import { Space } from '../../infrastructuer/theme/space.style';
import { AuthContext } from '../../service/Auth/Auth.context';
import { ProductContext } from '../../service/Products/Product.context';
import Storage from '../../utils/storeData';

const ModalWithCheckBox = () => {
  const { t: mainT } = useTranslation();
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [listRole, setListRole] = useState([]);
  const { clearDataFn } = useContext(ProductContext);

  const {legals,showLegals,isLegals,legalsFn} =useContext(AuthContext);
 
  const pages = [
   {
      title: mainT('Footer.Menus.ReturnPolicy'),
      link: '/legals/returns_and_replacements',
      flag:true,
      key:"",
    },
    {
      title: mainT('Footer.Menus.Terms'),
      link: '/legals/term_conditions',
      flag:true,
    },
     {
      title: mainT('Footer.Menus.LegalDisclosure'),
      link: '/legals/legal_disclosure',
      flag:true,
    },
    {
      title: mainT('Footer.Menus.PrivacyPolicy'),
      link: '/legals/privacy_policy',
      flag:true,
    },
    {
      title: mainT('Footer.Menus.ReturnForms'),
      link: '/legals/return_forms',
      flag:true,
    },
    {
      title: mainT('Footer.Menus.DeliveryPolicy'),
      link: '/legals/delivery_policy',
      flag:true,
    },
     {
      title: mainT('Footer.Menus.PaymentPolicy'),
      link: '/legals/payment_policy',
      flag:true,
    },
]

const handleNotAccept = () => {
  Storage.removeDataAll();
  Storage.removeData('TOKEN');
  isLegals(false);

};
const handleAccept = () => {
  legalsFn(legals).then((res)=>{
    isLegals(false);
    setTimeout(() => {
      clearDataFn();
      navigation.replace('Bottom_SCREEN');
    }, 1500);
  
  });
  

};
   const handleAcceptTerms = (index) => {
   const change = listRole.map((res,i)=>{
      if(index==i){
        return {...res,flag:!res?.flag};
      }else{
        return res;
      }
    })
    setListRole(change)
};
useEffect(() => {
  console.log("objectKeys",legals);
  if(legals!=null){

 
  const objectKeys = Object?.keys(legals)?.map((res)=>{
    return {key:res,flag:false}
  });

  if(objectKeys.length==0){
    
    navigation.replace('Bottom_SCREEN');

  }
  setListRole(objectKeys)
}
}, [legals]);
const memoizedPages = useMemo(() => pages, [pages]);
const renderItem = (item,index ) => (
  <View style={{ paddingLeft: 8, justifyContent: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
      <CheckBox
      onPress={()=>handleAcceptTerms(index)}
      checked={item?.flag}/>
      <Text>{mainT('Policy.Text')} </Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://cleafin.shop' +`/legals/${item?.key}`)}>
        <Text style={{ color: Color.brand.blue }}>{item?.key}</Text>
      </TouchableOpacity>
    </View>
  </View>
);
  return (
    <Modal animationType="fade" transparent visible={showLegals}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>{mainT('Policy.Accept')}</Text>
          </View>
          
          {listRole?.map((res,index)=>{
            return renderItem(res,index)
          })}
          <View style={{position:'absolute',bottom:15,width:`100%`,alignItems:"center"}}>
          <Button
              disabled={listRole?.some((legal) => !legal.flag)}
            
            title={mainT('Global.Submit')}
            onPress={handleAcceptTerms}
            buttonStyle={{height:50,borderRadius:10,width:332,alignSelf:'center',backgroundColor:Color.brand.colorButton}}
           style={{height:50,borderRadius:20,width:332}}
           onPressIn={handleAccept}
           
          />
          <Space lineH={15}/>
          <Button
             
            
              title={mainT('Global.NoCancle')}
            onPress={handleAcceptTerms}
            buttonStyle={{height:50,borderRadius:10,width:332,alignSelf:'center',backgroundColor:Color.brand.colorButton}}
           style={{height:50,borderRadius:20,width:332}}
           onPressIn={handleNotAccept}
          />
         </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
   
  },
  modal: {
    width: '90%',
    height:500,
    backgroundColor: '#fff',
    borderRadius: 15,

    marginBottom: 1,
  },
  modalHeader: {
    backgroundColor: Color.brand.colorButton,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,

  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  modalBody: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
  },
  modalFooter: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ModalWithCheckBox;
