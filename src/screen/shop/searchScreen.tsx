import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native";
import { Card, Rating } from "react-native-elements";
import { ArrowLeft, Filter, Heart, Search, Swap } from "react-native-iconly";
import NumberFormat from "react-number-format";
import { CheckSaveProduct } from "../../components/checkSaveProduct";
import LineH from "../../components/lineH";
import LineW from "../../components/lineW";
import Indicator from "../../components/lodging/indicator";
import { HandleEvent, Padding } from "../../css/main.style";
import { Color } from "../../infrastructuer/theme/colors.style";
import { Space } from "../../infrastructuer/theme/space.style";
import { BasketContext } from "../../service/Basket/Basket.context";
import { CommentContext } from "../../service/Comment/Comment.context";
import { goToScreenDetails } from "../../service/Products/Product.action";
import { ProductContext } from "../../service/Products/Product.context";
import { IMAGE_ADDRESS } from "../../utils/adress.api";
import {
  Background,
  ButtonAddTo,
  ButtonCategoryAddTo,
  ImageOffer,
  LabelButton,
  SearchView,
  TextPriceOffer,
  TextPriceThroughOffer,
  TextPriceUnitOffer,
  TextProductOffer,
  TextReviewOffer,
  ViewOffer,
} from "../shop/style/shop.style";
import styled from "styled-components";
import ImageLoading from "../../components/imageLoading";
import i18n from "../../core/i18n/config";
import useDebounce from "./useDebounce";
import "intl";
import "intl/locale-data/jsonp/en";
import  Icon  from "react-native-vector-icons/AntDesign";
const widthFull = Dimensions.get("screen").width;
const { width, height } = Dimensions.get('window');
const isTablet = (width >= 768 && height >= 768);
const TextTopFilter = styled(Text)`
  font-size: 14;
`;

export default function SearchPageScreen({
  value,
  onChange,
  onShow,
  navigation,
  nameCategory = "",
}) {
  const {
    categoryProductsItem,
    categoryLode,
    productByIdFn,
    relatedProductsFn,
    nameCategorySelect,
    searchProductsFn,
    clearSearch,
    searchProductsPageFn,
  } = useContext(ProductContext);
  const { addToBasket } = useContext(BasketContext);
  const { getAllCommentIdFn } = useContext(CommentContext);
  const [search, setSearch] = useState("");
  useEffect(
    () => {
      setSearch(value);
    },
    [value] // Only call effect if debounced search term changes
  );
  const debouncedValue = useDebounce<string>(search, 3000);
  useEffect(
    () => {
      if (search.length>1) {
        searchProductsFn(search, "", "", 1);
      } else {
      }
    },
    [debouncedValue] // Only call effect if debounced search term changes
  );
  const [dataCategory, setDataCategory] = useState([
    { data: { flag: false } },
    { data: { flag: false } },
    { data: { flag: false } },
    { data: { flag: false } },
    { data: { flag: false } },
  ]);

  function _onPressHeart(index) {
    let value = [...dataCategory];
    value[index].data.flag = !value[index].data.flag;
    setDataCategory([]);
    setDataCategory(value);
  }
  function CategoryProductItem({ item }) {
    let imageUrl;
    if (item?.productVariationFiles.length > 0) {
      imageUrl = item?.productVariationFiles[0].file;
    } else {
      imageUrl = item?.product?.file;
    }
    return (
      <>
        <View style={{ width: isTablet ?(widthFull-20) / 3:widthFull / 2 ,borderRightWidth:isTablet? 1:0,borderColor:Color.brand.gryLight,}}>
          <Pressable
            onPress={() => {
              productByIdFn(item?.product?.id, navigation);

              goToScreenDetails(
                navigation,
                item,
                productByIdFn,
                getAllCommentIdFn,
                relatedProductsFn
              );
            }}
          >
            <View
              style={{
                width: `100%`,
                height: 310,
                borderRadius: 8,
                padding: 5,

              }}
            >
              <ImageLoading
                Com={ImageOffer}
                def={require("../../assets/image/box.png")}
                src={{ uri: IMAGE_ADDRESS + imageUrl }}
              />
              <ViewOffer style={{width:`90%`}}>
                <Rating
                  imageSize={12}
                  ratingCount={5}
                  readonly
                  startingValue={0}
                  style={{ paddingVertical: 10 }}
                />
                <TextReviewOffer>{`(${
                  item?.review_count == null ? 0 : item?.review_count
                } view)`}</TextReviewOffer>
              </ViewOffer>
              <Space lineH={5} />
              <TextProductOffer>{item.name}</TextProductOffer>
              <Space lineH={5} />
              <NumberFormat
                value={item?.sale_price.value}
                displayType={"text"}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={""}
                renderText={(value, props) => {
                  return (
                    <TextPriceOffer>
                      {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: item?.sale_price.iso3,
                      }).format(value)}
                    </TextPriceOffer>
                  );
                }}
              />
              <Space lineH={5} />
              {item?.sale_price.gross_value != item?.sale_price.value ? (
                <NumberFormat
                  value={parseInt(item?.sale_price.gross_value)}
                  displayType={"text"}
                  prefix={""}
                  fixedDecimalScale={true}
                  decimalScale={2}
                  renderText={(value, props) => {
                    return (
                      <TextPriceThroughOffer>
                        {new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: item?.sale_price.iso3,
                        }).format(value)}
                      </TextPriceThroughOffer>
                    );
                  }}
                />
              ) : null}
              {/* <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <NumberFormat
                  value={parseInt(item?.sale_price.value)}
                  displayType={'text'}
                   ={true}
                  prefix={''}
                  renderText={(value, props) => {
                    return (
                      <TextPriceThroughOffer>
                        {value + ' ' + '€'}
                      </TextPriceThroughOffer>
                    );
                  }}
                />
                <ViewOffer
                  style={{
                    backgroundColor: Color.brand.red,
                    width: 35,
                    height: 21,
                    borderBottomRightRadius: 4,
                    borderTopRightRadius: 4,
                    borderTopLeftRadius: 4,
                    left: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: Color.brand.white, fontSize: 12}}>
                    {'30%'}
                  </Text>
                </ViewOffer>
              </View> */}

              <Space lineH={5} />
              {/* <TextPriceUnitOffer>{'Price  unit : 3,522'}</TextPriceUnitOffer>
              <Space lineH={5} /> */}
            </View>
          </Pressable>
          <LineW />

          <View style={{ position: "absolute", right: 10 }}>
            <CheckSaveProduct item={item} />
          </View>

          <ButtonCategoryAddTo
            onPress={() => {
              addToBasket(item);
            }}
style={{width:isTablet?`95%`:`80%`,alignSelf:"center"}}
          >
            <LabelButton>{i18n.t("Global.Addtobasket")}</LabelButton>
          </ButtonCategoryAddTo>
        </View>
      </>
    );
  }
  const backTop = Dimensions.get("screen").height / 2 - 20;
  return (
    <Background>
      <ScrollView>
        <Space lineH={35} />
        <SearchView
          placeholder={i18n.t("Global.SearchOnCleaning")}
          onChangeText={(e) => setSearch(e)}
          onClear={() => {
            setSearch("");
          }}
          value={search}
          searchIcon={() => (
            <ArrowLeft
              size={"large"}
              set="light"
              primaryColor={Color.brand.textGrey}
              onPress={() => {
                setSearch("");
                clearSearch();
                onShow();
                onChange("");
              }}
            />
          )}
        />
        <Padding>
          <View style={{ flexDirection: "row" }}>
            {/* <Filter
              size={'medium'}
              onPress={() => {
                navigation.navigate('FilterScreen');
              }}
              primaryColor={Color.brand.black}
            />
            <Space lineW={10} /> */}
            {/* <HandleEvent
              onPress={() => {
                navigation.navigate('FilterScreen');
              }}>
              <TextTopFilter>{'Filter'}</TextTopFilter>
            </HandleEvent> */}
            {/* <Space lineW={30} /> */}
            <Swap
              size={"medium"}
              onPress={() => {
                navigation.navigate("SortScreen");
              }}
              set="light"
              primaryColor={Color.brand.black}
            />
            <Space lineW={10} />
            <HandleEvent
              onPress={() => {
                navigation.navigate("SortScreen");
              }}
            >
              <TextTopFilter>{nameCategorySelect}</TextTopFilter>
            </HandleEvent>
          </View>
          <Space lineH={30} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: Color.brand.textGry, fontSize: 16 }}>
              {nameCategory}
            </Text>
            <Text style={{ color: Color.brand.textGry, fontSize: 16 }}>
              {`${i18n.t("Global.Products")}`}
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 90,
              alignSelf: "center",
            }}
          >
{!isTablet?
            <LineH />
:null}

          </View>
          <View style={{ height: Dimensions.get("screen").height }}>
{isTablet?
            <FlatList
              keyExtractor={(index) => index}
              data={categoryProductsItem?.currentData}
              renderItem={CategoryProductItem}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              numColumns={3}
              initialNumToRender={10}
              windowSize={10}
              onEndReached={() => {
                searchProductsPageFn(
                  categoryProductsItem?.text,
                  categoryProductsItem?.Id,
                  "",
                  categoryProductsItem?.page + 1
                );
              }}
              onEndReachedThreshold={0.2}
              ListFooterComponent={() => {
                return (
                  <>
                    <ActivityIndicator color={Color.brand.colorButton}/>
                  </>
                );
              }}
            />
:   <FlatList
              keyExtractor={(index) => index}
              data={categoryProductsItem?.currentData}
              renderItem={CategoryProductItem}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              numColumns={2}
              initialNumToRender={10}
              windowSize={10}
              onEndReached={() => {
                searchProductsPageFn(
                  categoryProductsItem?.text,
                  categoryProductsItem?.Id,
                  "",
                  categoryProductsItem?.page + 1
                );
              }}
              onEndReachedThreshold={0.2}
              ListFooterComponent={() => {
                return (
                  <>
                    <ActivityIndicator color={Color.brand.colorButton}/>
                  </>
                );
              }}
            />}
          </View>
          {/* {[1,2,3,4,5,6,7,8,9,10,11].map(()=>{
            return
        })} */}
        </Padding>
        
      </ScrollView>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "#fff",
          position: "absolute",
          top: backTop,
          right: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          alignItems:'center',
          justifyContent:'center'
        }}
        onPress={()=>{ 
          setSearch("");
          clearSearch();
          onShow();
          onChange("");}}
      >
        <Icon name={"back"} color={"#000"} size={25}/>
      </TouchableOpacity>
    </Background>
  );
}
