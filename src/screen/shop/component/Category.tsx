import { useNavigation } from "@react-navigation/native";
import React from "react";
import FlatListSlide from "../../../components/slideList";
import { Space } from "../../../infrastructuer/theme/space.style";
import { goToScreenCategory } from "../../../service/Products/Product.action";
import { IMAGE_ADDRESS } from "../../../utils/adress.api";
import {
    ButtonCategory,
  CategoryBrand,
  CategoryImageBrand,
  CategoryTextBrand,
} from "../style/shop.style";
import {Color} from '../../../infrastructuer/theme/colors.style';

export default function CategoryComponent({data,search,onCallBack}) {
    const navigation = useNavigation();
    const handleCallback = (item) => onCallBack(item);
    function categoryItem({ item, index }) {
        return (
          <>
            <ButtonCategory
              onPress={() => {
                handleCallback(item);
              }}
            >
              <CategoryBrand style={{ backgroundColor:item.color? `${item.color}`:item.file_path == null?`${Color.brand.colorButton}`:null,alignItems:'center'}}>
                <CategoryImageBrand
                  source={
                    item.file_path != null
                      ? { uri: IMAGE_ADDRESS + item.file_path }
                      : require("../../../assets/image/stwo.png")
                  }
                />
              </CategoryBrand>
              <Space lineH={8} />
              <CategoryTextBrand>{item.name}</CategoryTextBrand>
            </ButtonCategory>
          </>
        );
      }
  return (
    <FlatListSlide
    data={data}
    renderItem={categoryItem}
    snap={10}
    height={120}
      isLoading={false}
    />
  );
}
