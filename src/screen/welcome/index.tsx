import React from 'react';
import {useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {ItemWelcomeComponent} from '../../components/coustom/itemWelcome/itemWelcome.component';
import {AppIntroSlider} from '../../components/introSlide/index';
import {Color} from '../../infrastructuer/theme/colors.style';
import {BackgroundView} from '../../css/main.style'
const windowWidth = Dimensions.get('window').width;
import i18n from '../../core/i18n/config';

import {slides} from './model';
const WelcomeScreen = ({navigation}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [indexPage, setIndexPage] = useState(0);
const slides = [
    {
      key: 'one',
      title: i18n.t("Slider.HomePageT"),
      text: i18n.t("Slider.HomePageD"),
      textButton:i18n.t("Global.Next"),
      image:require('../../assets/image/buying-with-card.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: i18n.t("Slider.ProductPageT"),
      text:i18n.t("Slider.ProductPageD"),
      textButton:i18n.t("Global.Next"),
      image:require('../../assets/image/item_2.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title:i18n.t("Slider.CartPageT"),
      text: i18n.t("Slider.CartPageD"),
      textButton:i18n.t("Global.Letsshopping"),
      image:require('../../assets/image/item_3.png'),
      backgroundColor: '#22bcb5',
    }
  ];
  const _onDone = () => {};
  const onNext = () => {
    if (slideIndex == slides.length - 1) {
      navigation.replace("Bottom_SCREEN");
    } else {
      setIndexPage(slideIndex + 1);
    }
  };
  const _renderItem = data => {
    console.log(data);

    return (
      <>
        <View
          style={{
            width: windowWidth,
            height: `100%`,
            backgroundColor: `${Color.brand.primary}`,
          }}>
          <ItemWelcomeComponent
            circleImage={slides[data].image}
            title={slides[data].title}
            text={slides[data].text}
            textButton={slides[data].textButton}
            onButton={onNext}
          />
        </View>
      </>
    );
  };
  const renderPaginationCostume = i => {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
    return (
      <>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {slides.map((t, index) => {
            if (index != slides.length) {
              return (
                <View
                  style={{
                    backgroundColor:
                      index == i
                        ? Color.brand.colorButton
                        : `rgba(224, 0, 132,0.5)`,
                    marginLeft: 3,
                    borderRadius: index == i ? 35 : 12,
                    height: 12,
                    width: index == i ? 35 : 12,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: index == i ? 0.8 : 0,
                    shadowRadius: index == i ? 2 : 0,
                    elevation: index == i ? 5 : 0,
                  }}
                />
              );
            }
          })}
        </View>
      </>
    );
  };
  return (
    <BackgroundView>
      <AppIntroSlider
        style={{width: `100%`, height: `100%`}}
        onSlideChange={newIndex => {
          console.log('newIndex', newIndex);
          setSlideIndex(newIndex);
        }}
        renderPagination={renderPaginationCostume}
        renderItem={({index}) => _renderItem(index)}
        data={slides}
        onDone={_onDone}
        goNextIndex={indexPage}
        doneLabel={i18n.t("Global.Login")}
      />
    </BackgroundView>
  );
};

export {WelcomeScreen};
