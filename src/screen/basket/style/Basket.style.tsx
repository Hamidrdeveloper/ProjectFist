import {Image, Text,Dimensions} from 'react-native';
import {View} from 'react-native';
import styled from 'styled-components';
import {Color} from '../../../infrastructuer/theme/colors.style';
const { width, height } = Dimensions.get('window');
const isTablet = (width >= 768 && height >= 768);
export const ViewPlus = styled(View).attrs(props => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: `100%`,
  paddingLeft:isTablet?0:20,
 justifyContent: 'center',
}))``;
export const ItemBasket = styled(View).attrs(props => ({
  width: `100%`,
  height: isTablet?350:200,
  flexDirection: 'row',
}))``;
export const Delete = styled(Image).attrs(props => ({
  resizeMode: 'stretch',
}))`
    bottom: ${isTablet?0:10};
  width:${isTablet?30:20};
  height: ${isTablet?30:20};
`;
export const Plus = styled(Image).attrs(props => ({
  resizeMode: 'stretch',
}))`
  bottom: ${isTablet?0:10};
  width:${isTablet?30:20};
  height: ${isTablet?30:20};
`;
export const NumberPlus = styled(Text).attrs(props => ({}))`
  font-size: 20;
  top: 5;
  color: ${Color.brand.black};
  text-align-vertical: center;
  height: 100%;
  
`;
export const TextDetailBasketBlack = styled(Text).attrs(props => ({}))`
  font-size: 18;
  color: ${Color.brand.black};
  width: 100%;
`;
export const TextDetailBasket = styled(Text).attrs(props => ({}))`
  font-size: 18;
  color: ${Color.brand.textGrey};
  width: 100%;
`;
export const TextPriceBasketAbsolute = styled(Text).attrs(props => ({}))`
  font-size: 23;
  color: ${Color.brand.black};
  right: 15;
`;
export const TextPriceBasket = styled(Text).attrs(props => ({}))`
  font-size: 23;
  width: 100%;
  color: ${Color.brand.black};
`;
