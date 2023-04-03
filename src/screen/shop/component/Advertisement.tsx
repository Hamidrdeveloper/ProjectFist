import React from "react";
import FlatListSlide from "../../../components/slideList";
import { IMAGE_ADDRESS } from "../../../utils/adress.api";
import {
  ImageAdvertisement,
  ImageAdvertisementShadow,
  ViewAdvertisement,
  ViewRowAdvertisement,
} from "../style/shop.style";
import {Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');
const isTablet = (width >= 768 && height >= 768);
export default function AdvertisementComponent({ data }:any) {
  function AdvertisementItem({ item }:any) {
    return (
      <>
        <ViewAdvertisement>
          <ImageAdvertisementShadow
            source={require("../../../assets/image/shadowWith.png")}
          />
          <ViewRowAdvertisement>
            <ImageAdvertisement
              imageStyle={{ borderRadius: 20 }}
              source={{ uri: IMAGE_ADDRESS + item.file_path }}
            />
            {/* <TextReviewAdvertisement>
                  {'Damit Ihre Fenster stets streifenfreie Sicht ermöglichen'}
                </TextReviewAdvertisement> */}
          </ViewRowAdvertisement>
        </ViewAdvertisement>
      </>
    );
  }
  return (
    <FlatListSlide
      data={data}
      renderItem={AdvertisementItem}
      snap={0}
      height={isTablet?350:210}
      isLoading={false}
    />
  );
}
