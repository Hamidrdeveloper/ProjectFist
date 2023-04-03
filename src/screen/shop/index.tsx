/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Card, Rating, SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import FlatListSlide from "../../components/slideList";
import 'intl';
import 'intl/locale-data/jsonp/en';
import {
  Background,
  Brand,
  ButtonAddTo,
  CardSuggest,
  CategoryBrand,
  CategoryImageBrand,
  CategoryTextBrand,
  FullImage,
  ImageAdvertisement,
  ImageAdvertisementShadow,
  ImageOffer,
  ImagePlus,
  ImageSuggest,
  ImageWhy,
  LabelButton,
  RowCenter,
  Scroll,
  SearchView,
  ButtonHeart,
  TextContact,
  TextPriceOffer,
  TextPriceThroughOffer,
  TextPriceUnitOffer,
  TextProductOffer,
  TextReviewAdvertisement,
  TextReviewOffer,
  TextReviewProducts,
  TextReviewStock,
  TextReviewSuggest,
  TitleMore,
  TitleStep,
  Touchable,
  ViewAdvertisement,
  ViewCenter,
  ViewItemWhy,
  ViewOffer,
  ViewProducts,
  ViewRowAdvertisement,
  ViewSuggest,
  ViewWhyCleafin,
  ButtonCategory,
  ImageSuggestCard,
} from "./style/shop.style";
import { Space } from "../../infrastructuer/theme/space.style";
import {
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
  SafeAreaView,
  PanResponder,
  ActivityIndicator,
} from "react-native";
import { Color } from "../../infrastructuer/theme/colors.style";
import { Text } from "react-native";
import { ProductContext } from "../../service/Products/Product.context";
import { OfferItem } from "./type";
import NumberFormat from "react-number-format";
import { IMAGE_ADDRESS } from "../../utils/adress.api";
import { BasketContext } from "../../service/Basket/Basket.context";
import { ProductVariation } from "../../service/Products/types";
import { TransitionView } from "../../components/transitionView";
import Storage from "../../utils/storeData/index";
import { KEY } from "../../utils/storeData/key";
import { CheckSaveProduct } from "../../components/checkSaveProduct/index";
import {
  goToScreenCategory,
  goToScreenDetails,
} from "../../service/Products/Product.action";
import { CommentContext } from "../../service/Comment/Comment.context";
import SearchPageScreen from "./searchScreen";
import { Animations } from "./animations";
import { PartnerContext } from "../../service/Partner/Partner.context";
import useDebounce from "./useDebounce";
import ImageLoading from "../../components/imageLoading";
import i18n from "../../core/i18n/config";
import { ProfileContext } from "../../service/Profile/Profile.context";
import AdvertisementComponent from "./component/Advertisement";
import CategoryComponent from "./component/Category";
const { width, height } = Dimensions.get('window');
const isTablet = (width >= 768 && height >= 768);
function ShopScreen({ navigation }) {
  const {
    productsItem,
    newProductsItem,
    categoriesItem,
    arrivalItem,
    footerImages,
    categoriesInformation,
    bestSellingItem,
    productByIdFn,
    relatedProductsFn,
    searchProductsFn,
    isProducts,
    mainPageSlider,
    newProductsFn,
  } = useContext(ProductContext);
  const { getAllCommentIdFn } = useContext(CommentContext);
  const { partnerSelectId } = useContext(PartnerContext);
  
  const { rolesUser } = useContext(ProfileContext);

  const { addToBasket } = useContext(BasketContext);
  const [search, setSearch] = useState("");
  const [nameCategory, setNameCategory] = useState("");

  const [openPartner, setOpenPartner] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedValue = useDebounce<string>(search,2000)
  useEffect(
    () => {
   
      if (search.length>1) {
        setNameCategory(search+" ")
        searchProductsFn(search, "","",1);
        
        setIsSearching(true);
      } else {
        setIsSearching(false);
      }
    },
    [debouncedValue] // Only call effect if debounced search term changes
  );
  const updateSearch = (text: React.SetStateAction<string>) => {
    // setSearch(text);
  };
  const [enableScroll, setEnableScroll] = useState(false);
  const handleArrivalScroll = useCallback(
    (event) => {
  
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

   
     
      if (event.nativeEvent.contentOffset.y > 293) {
        _toggleSubview();
      }
    },
    [newProductsFn, newProductsItem.page, newProductsItem.per_page]
  );
  const ratingCompleted = (rating: number) => {
    console.log("Rating is: " + rating);
  };
  function handleClickLink() {
    console.log("Don't know how to open URI: " + "www.google.com");
    Linking.openURL("https://nslag.com");
  }
  function brandItem() {
    return (
      <>
        <Brand source={require("../../assets/image/sampelimag.png")} />
      </>
    );
  }
  function Advertisement({ item }) {
    return (
      <>
        <ViewAdvertisement>
          <ImageAdvertisementShadow
            source={require("../../assets/image/shadowWith.png")}
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
 

  function offerItem({ item, index }: any) {
    let imageUrl;
    if (item?.productVariationFiles.length > 0) {
      imageUrl = item?.productVariationFiles[0].file;
    } else {
      imageUrl = item?.product?.file;
    }
    console.log(imageUrl);

    return (
      <View style={{ alignItems: "center", width: 190, height:  isTablet?360:300, }}>
        <Card
          containerStyle={{
            width: 180,
            height: isTablet?360:300,
            margin: 8,
            borderRadius: 8,
            padding: 5,
          }}
        >
          <TouchableOpacity
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
            <View>
              {/* <ImageOffer
                style={{
                  position: "absolute",
                  width: `80%`,
                  alignSelf: "center",
                  height: 80,
                }}
                resizeMode={"cenetr"}
                source={require("../../assets/image/box.png")}
              /> */}
              <ImageLoading
                Com={ImageOffer}
                def={require("../../assets/image/box.png")}
                resizeMode={"contain"}
                
                src={
                  imageUrl
                    ? {
                        uri: IMAGE_ADDRESS + imageUrl,
                      }
                    : require("../../assets/image/box.png")
                }
              />
            </View>
            <ViewOffer>
              <Rating
                imageSize={12}
                onFinishRating={ratingCompleted}
                defaultRating={1}
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
            {item?.sale_price.gross_value!=item?.sale_price.value?
            <NumberFormat
              value={parseInt(item?.sale_price.gross_value)}
              displayType={'text'}
           
              prefix={''}
            

              decimalScale={2}
              fixedDecimalScale={true}
              renderText={(value, props) => {
                return (
                  <TextPriceThroughOffer>
                    {new Intl.NumberFormat('de-DE', { style: 'currency', currency: item?.sale_price.iso3 }).format(value)}
                  </TextPriceThroughOffer>
                );
              }}
            />:null}
            <Space lineH={5} />
            <NumberFormat
              value={item?.sale_price.value}
              displayType={"text"}
           
              prefix={""}
              fixedDecimalScale={true}
              decimalScale={2}
              renderText={(value, props) => {
                return (
                  <TextPriceOffer>
                   {new Intl.NumberFormat('de-DE', { style: 'currency', currency: item?.sale_price.iso3 }).format(value)}
                  </TextPriceOffer>
                );
              }}
            />
            <Space lineH={5} />
            {/* <TextPriceUnitOffer>{`Price  unit : ${item?.sale_price?.unit_price}`}</TextPriceUnitOffer>
            <Space lineH={5} /> */}
          </TouchableOpacity>
        </Card>
        <ButtonAddTo onPress={() => addToBasket(item)}>
          <LabelButton>{i18n.t('Global.Addtobasket')}</LabelButton>
        </ButtonAddTo>
        <CheckSaveProduct item={item} />
      </View>
    );
  }
  function SuggestItem({ item, index }: any) {
    return (
      <>
        <CardSuggest>
          <TouchableOpacity
            onPress={() => {
              // goToScreenDetails(
              //   navigation,
              //   item,
              //   productByIdFn,
              //   getAllCommentIdFn,
              //   relatedProductsFn,
              // );
            }}
          >
            <ViewSuggest>
              {/* <ImageSuggestCard
                style={{
                  position: "absolute",
                  width: `80%`,
                  alignSelf: "center",
                  height: 80,
                }}
                resizeMode={"cenetr"}
                source={require("../../assets/image/box.png")}
              /> */}
              <ImageLoading
                Com={ImageSuggestCard}
                def={require("../../assets/image/box.png")}
                imageStyle={{ borderRadius: 15 }}
                src={{
                  uri: IMAGE_ADDRESS + item.file_path,
                }}
              />
              {/* <ViewCenter> */}
              <TextReviewSuggest>{item.title}</TextReviewSuggest>

              {/* <Rating
                  type="custom"
                  imageSize={12}
                  onFinishRating={ratingCompleted}
                  tintColor={Color.brand.suggestColor}
                  ratingCount={5}
                  readonly
                  startingValue={0}
                  ratingBackgroundColor="black"
                  style={{position: 'absolute', bottom: 12}}
                /> */}
              {/* </ViewCenter> */}
            </ViewSuggest>
          </TouchableOpacity>
        </CardSuggest>
      </>
    );
  }
  function renderItemForSecondList({ item, index }: any): any {
    let imageUrl;
    if (item?.productVariationFiles.length > 0) {
      imageUrl = item?.productVariationFiles[0].file;
    } else {
      imageUrl = item?.product?.file;
    }
    return (
      <ViewProducts>
        <Touchable
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
          <ViewSuggest>
             <ImageLoading
             Com={ImageSuggest}
             def={require("../../assets/image/box.png")}
             resizeMode={"contain"}
              src={{
                uri: IMAGE_ADDRESS + imageUrl,
              }}
            />
            <ViewCenter>
              <TextReviewProducts>{item.name}</TextReviewProducts>
              <Space lineH={10} />
              <RowCenter>
                <TextReviewStock>{`Just ${item.interval_order_quantity} in stock`}</TextReviewStock>
                <Space lineW={20} />
                <Space lineH={10} />
                <Touchable onPress={() => addToBasket(item)}>
                  <ImagePlus source={require("../../assets/image/plus.png")} />
                </Touchable>
              </RowCenter>
            </ViewCenter>
          </ViewSuggest>
        </Touchable>
      </ViewProducts>
    );
  }
  const keyExtractor = (item) => item.id;
  
  function renderItemNewestProducts({ item }) {
    let imageUrl;
    if (item?.productVariationFiles.length > 0) {
      imageUrl = item?.productVariationFiles[0].file;
    } else {
      imageUrl = item?.product?.file;
    }
    return (
      <View style={{ alignItems: "center", height:  isTablet?420:320 }}>
        <Card
          containerStyle={{
            width: isTablet?(Dimensions.get("screen").width - 50) / 3:(Dimensions.get("screen").width - 30) / 2,
            height: isTablet?400:300,
            margin: 8,
            borderRadius: 8,
            padding: 5,
          }}
        >
          <TouchableOpacity
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
          
             <ImageLoading
             Com={ImageOffer}
             def={require("../../assets/image/box.png")}
              resizeMode={"stretch"}
              src={{
                uri: IMAGE_ADDRESS + imageUrl,
              }}
            />
            <ViewOffer>
              <Rating
                imageSize={12}
                onFinishRating={ratingCompleted}
                style={{ paddingVertical: 10 }}
                ratingCount={5}
                readonly
                startingValue={0}
              />
              <TextReviewOffer>{`(${
                item?.review_count == null ? 0 : item?.review_count
              } view)`}</TextReviewOffer>
            </ViewOffer>
            <Space lineH={5} />
            <TextProductOffer>{item.name}</TextProductOffer>
            <Space lineH={5} />
            {item?.sale_price.gross_value!=item?.sale_price.value?
            <NumberFormat
              value={parseInt(item?.sale_price.gross_value)}
              displayType={'text'}
             
              prefix={''}
              fixedDecimalScale={true}
              decimalScale={2}
              renderText={(value, props) => {
                return (
                  <TextPriceThroughOffer>
{new Intl.NumberFormat('de-DE', { style: 'currency', currency: item?.sale_price.iso3 }).format(value)}</TextPriceThroughOffer>
                );
              }}
            />:null}
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
{new Intl.NumberFormat('de-DE', { style: 'currency', currency: item?.sale_price.iso3 }).format(value)}                  </TextPriceOffer>
                );
              }}
            />
            <Space lineH={5} />
            {/* <TextPriceUnitOffer>{`Price  unit : ${item?.sale_price.unit_price}`}</TextPriceUnitOffer>
            <Space lineH={5} /> */}
          </TouchableOpacity>
        </Card>
        <ButtonAddTo style={{ width: `80%` ,bottom:20}} onPress={() => addToBasket(item)}>
          <LabelButton>{i18n.t('Global.Addtobasket')}</LabelButton>
        </ButtonAddTo>
        <CheckSaveProduct item={item} />
      </View>
    );
  }
  function renderItemProducts({ item, index }) {
    return <FlatList data={item} renderItem={renderItemForSecondList} />;
  }
  const [bounceValue, setBounceValue] = useState(100);
  function _toggleSubview() {
    setOpenPartner(!openPartner);
  }
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleScrollBegin = () => {

    setScrollEnabled(false);
  };

  const handleScrollEnd = () => {


    setScrollEnabled(true);
  };
  const panResponder = PanResponder.create({
    onPanResponderGrant: () => {
      setScrollEnabled(true);
    },
    onPanResponderRelease: () => {
      setScrollEnabled(false);
    },
  });
  const callback = payload => {
    

    goToScreenCategory(navigation, payload, searchProductsFn);
    setIsSearching(true);
    setNameCategory(payload?.name);
}
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }}>
      <Background>
        {rolesUser != "partner" &&rolesUser=="user"? <Animations open={openPartner} /> : null}
        {!isSearching ? (
          <Scroll
          showsVerticalScrollIndicator={false}
            scrollEventThrottle={160}
            onScrollEndDrag={(event) => {
             
              handleArrivalScroll(event)
            }}
          >
            <Space lineH={35} />
            <SearchView
              placeholder={i18n.t('Global.SearchOnCleaning')}
              onChangeText={(e: any) => setSearch(e)}
              value={search}
              searchIcon={() => <Icon color={"gry"} size={30} name="search1" />}
            />
            <Space lineH={25} />
            <AdvertisementComponent data={mainPageSlider}/>
            
            <Space lineH={25} />
            <CategoryComponent data={categoriesItem} onCallBack={callback}/>
            <Space lineH={25} />
            <TitleStep>{i18n.t('Global.Offers')}</TitleStep>
            <Space lineH={25} />
            <FlatListSlide
              data={productsItem}
              renderItem={offerItem}
              snap={5}
              height={ isTablet?370:310}
              isLoading={isProducts}
            />
            <Space lineH={25} />
            <TitleStep>{i18n.t('Global.WhyCleafin')}</TitleStep>
            <Space lineH={25} />
            <ViewWhyCleafin>
              <ViewItemWhy
                onPress={() => {
                  handleClickLink();
                }}
              >
                <ImageWhy source={require("../../assets/image/car.png")} />
                <TextContact>{i18n.t('Global.Easytouse')}</TextContact>
              </ViewItemWhy>
              <ViewItemWhy
                onPress={() => {
                  handleClickLink();
                }}
              >
                <ImageWhy source={require("../../assets/image/phone.png")} />
                <TextContact>{i18n.t('Global.contactus')}</TextContact>
              </ViewItemWhy>
              <ViewItemWhy
                onPress={() => {
                  handleClickLink();
                }}
              >
                <ImageWhy source={require("../../assets/image/private.png")} />
                <TextContact>{i18n.t('Global.Onlinesupport')}</TextContact>
              </ViewItemWhy>
            </ViewWhyCleafin>
            <Space lineH={45} />
            <TitleStep>{i18n.t('Global.NewarrivalProducts')}</TitleStep>
            <Space lineH={25} />
            <FlatListSlide
              data={arrivalItem}
              renderItem={offerItem}
              snap={5}
              height={ isTablet?370:335}
            />
            <Space lineH={25} />
            <FlatListSlide
              data={footerImages}
              renderItem={SuggestItem}
              snap={5}
              height={isTablet?height * 0.2:110}
            />
            <Space lineH={45} />
            {/* <TitleStep>{'Best selling Products'}</TitleStep> */}
            {/* <Space lineH={25} />
          <FlatListSlide
            data={bestSellingItem}
            renderItem={renderItemProducts}
            snap={5}
            height={380}
          /> */}
{/*
            <FlatListSlide
              data={categoriesInformation}
              renderItem={Advertisement}
              snap={0}
              height={80}
            />
*/}

            <TitleStep>{i18n.t('Global.NewestProducts')}</TitleStep>
            <Space lineH={25} />
            <View style={{height:3200}}>
{isTablet?
            <FlatList
            showsVerticalScrollIndicator={false}
              data={newProductsItem?.currentData}
              nestedScrollEnabled={true}
              renderItem={(value) => renderItemNewestProducts(value)}
              numColumns={3}
              initialNumToRender={10}
              windowSize={10}
 
              keyExtractor={keyExtractor}
              onEndReached={()=>{newProductsFn(newProductsItem?.page + 1, newProductsItem?.per_page)}}
              onEndReachedThreshold={0.1}
              ListFooterComponent={()=>{return(
                <>
                <ActivityIndicator color={Color.brand.colorButton}/>
                </>
              )}}
            />:   <FlatList
            showsVerticalScrollIndicator={false}
              data={newProductsItem?.currentData}
              nestedScrollEnabled={true}
              renderItem={(value) => renderItemNewestProducts(value)}
              numColumns={2}
              initialNumToRender={10}
              windowSize={10}
 
              keyExtractor={keyExtractor}
              onEndReached={()=>{newProductsFn(newProductsItem?.page + 1, newProductsItem?.per_page)}}
              onEndReachedThreshold={0.1}
              ListFooterComponent={()=>{return(
                <>
                <ActivityIndicator color={Color.brand.colorButton}/>
                </>
              )}}
            />}
            </View>
            <Space lineH={13} />
          </Scroll>
        ) : (
          <SearchPageScreen
            value={search}
            navigation={navigation}
            nameCategory={nameCategory}
            onChange={(value) => updateSearch(value)}
            onShow={() => {
              setIsSearching(false);
            }}
          />
        )}
      </Background>
    </SafeAreaView>
  );
}

export default ShopScreen;
