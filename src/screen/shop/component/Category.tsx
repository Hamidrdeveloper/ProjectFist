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
              <CategoryBrand style={{ backgroundColor: `${item.color}` }}>
                <CategoryImageBrand
                  source={
                    item.file_path != null
                      ? { uri: IMAGE_ADDRESS + item.file_path }
                      : require("../../../assets/image/cleafin_logo_star.png")
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
    snap={5}
    height={85}
      isLoading={false}
    />
  );
}
