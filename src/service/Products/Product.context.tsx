import React, {createContext, ReactElement, useMemo, useState} from 'react';
import {ProductsArrivalModel, ProductsModel} from './model';
import * as Ac from './Product.action';
import {ProductItem} from './types';
import * as Type from './types';
import { useThrottle } from '../../utils/useThrottle';
interface IProductContext {
  isProducts: boolean;
  productsItem: ProductItem;
  nameCategorySelect: string;
  setNameCategorySelect: any;
  productsFn: () => void;
  widgetsFn: () => void;
  categoriesItem: any;
  attributeType: undefined;
  categoriesTreeItem: any;
  productByID: Type.ProductVariation;
  categoriesFn: () => void;
  categoriesTreeFn: () => void;
  arrivalItem: any;
  arrivalFn: () => void;
  cardBottomArrivalItem: any;
  mainPageSlider: any;
  cardBottomArrivalFn: () => void;
  bestSellingFn: () => void;
  bestSellingItem: any;
  productByIdFn: (productId: number, navigation: any) => void;
  newProductsFn: () => void;
  clearDataFn: () => void;
  newProductsItem: any;
  productByAttributesFn: (productId: number) => any;
  relatedProductsFn: (id) => void;
  relatedProductsItem: any;
  footerImages: any;
  categoriesInformation: any;
  searchProductsFn: (
    text?: string,
    categoryId?: number | Array<number>,
    sort?: string,
    page?:any
  ) => void;
  categoryProductsItem: Array<any>;
  categoryLode: boolean;
}
export const ProductContext = createContext<IProductContext>(
  {} as IProductContext,
);
export default function ProductContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isProducts, setProducts] = useState(false);
  const [categoryLode, setCategoryLode] = useState(false);
  const [productsItem, setProductsItem] = useState<ProductItem>(null);
  const [categoriesItem, setCategoriesItem] = useState<any>();
  const [productByID, setProductByID] = useState<Type.ProductVariation>();
  const [arrivalItem, setArrivalFnItem] = useState<ProductItem>();
  const [cardBottomArrivalItem, setCardArrivalFnItem] = useState<ProductItem>();
  const [bestSellingItem, setBestSellingFnItem] = useState<ProductItem>();
  const [newProductsItem, setNewProductsItem] = useState<ProductItem|undefined|any>({currentData:[],page:1,per_page:5});
  const [relatedProductsItem, setRelatedProductsItem] = useState<ProductItem>();
  const [categoryProductsItem, setCategoryProductsItem] = useState<any>({currentData:[],page:1,per_page:10,Id:0,text:''});
  const [categoriesTreeItem, setCategoriesTreeItem] = useState<any>();
  const [attributeType, setAttributeType] = useState<any>([]);
  const [nameCategorySelect, setNameCategorySelect] = useState<any>('Default');
  const [categoriesInformation, setCategoriesInformation] = useState<any>();
  const [footerImages, setFooterImages] = useState<any>();
  const [mainPageSlider, setMainPageSlider] = useState<any>();

  // We can access navigation object via context
  const clearDataFn=()=>{

    
  }
  const productsFn = useMemo(
    () => async () => {
      setProducts(true);
      const dataPost = { ...ProductsModel, productCategoryIds: '' ,page:1,per_page:5};

      const res = await Ac.productsAc(dataPost);
      setProductsItem(res);
      setProducts(false);
    },
    []
  );
  
  const newProductsFn = useMemo(
    () => async (newPage:number=1, newPerPage:number=5) => {
      const dataPost = { ...ProductsArrivalModel, productCategoryIds: '' ,page:newPage,per_page:newPerPage};
      const res = await Ac.productsAc(dataPost);
      console.log("dataPostT",dataPost);
      if(Array.isArray(res)&&Array.isArray(newProductsItem?. currentData)){
      setNewProductsItem((prevData) => ({
        ...prevData,
        currentData: [...prevData?.currentData, ...res],
        page: newPage,
        per_page: newPerPage
      }))
  
      }
    },
    [setNewProductsItem]
  );
  const categoriesFn = useMemo(
    () => async () => {
      const res = await Ac.categoriesAc();
      setCategoriesItem(res);
    },
    []
  );
  const categoriesTreeFn = useMemo(
    () => async () => {
      const res = await Ac.categoriesTreeAc();
      setCategoriesTreeItem(res);
    },
    []
  );
  const arrivalFn = useMemo(
    () => async () => {
      const dataPost = { ...ProductsArrivalModel, productCategoryIds: '30' ,page:1,per_page:5};
      const res = await Ac.productsAc(dataPost);
      setArrivalFnItem(res);
    },
    []
  );
  const cardBottomArrivalFn = useMemo(
    () => async () => {
      const dataPost = { ...ProductsArrivalModel, productCategoryIds: '29' ,page:1,per_page:5};
      const res = await Ac.productsAc(dataPost);
      setCardArrivalFnItem(res);
    },
    []
  );
  const bestSellingFn = useMemo(
    () => async () => {
      const dataPost = { ...ProductsArrivalModel, productCategoryIds: '28' ,page:1,per_page:5};
      const res = await Ac.productsAc(dataPost);
      const n = 3;
      const result = new Array(Math.ceil(res.length / n))
        .fill()
        .map(_ => res.splice(0, n));
      console.log('=====>check', result);

      setBestSellingFnItem(result);
    },
    []
  );
  
  function filterAttributes(data: any, id = 0) {
    const box = [];
    const boxFull = [];
    let array = [];
    data?.map(data => {
      array.push(data.attributes);
    });
    console.log('filterAttributes', array);
    array.map(value => {
      return value.map(child => {
        console.log('attribute', child);
        if (id == 0) {
          box.push({
            id: child.id,
            name: child?.attributeType?.name,
            label: child.value,
            value: child.product_variation_id,
            product_variation_id: child.product_variation_id,
            attribute_type_id: child.attribute_type_id,
            selectable: true,
          });
        } else {
          box.push({
            id: child.id,
            name: child?.attributeType?.name,
            label: child.value,
            value: child.product_variation_id,
            product_variation_id: child.product_variation_id,
            attribute_type_id: child.attribute_type_id,
            selectable: id === child.product_variation_id ? true : false,
          });
        }
      });
    });

    let uniqueValues = new Set(box.map(v => v.attribute_type_id));

    uniqueValues.forEach(unique => {
      let check = [];
      box.map(value => {
        if (value.attribute_type_id === unique) {
          check.push(value);
        }
      });
      boxFull.push(check);
    });
    console.log('setAttributeType', boxFull);
    let filter = boxFull.filter(x => x.length > 1);
    console.log('setAttributeType', filter);

    setAttributeType(filter);
  }
  function productByAttributesFn(productId: number) {
    return Ac.productByAttributeIdAc(productId).then(res => {
      console.log('productByAttributesFn', res);
      filterAttributes(productByID, productId);

      return res;
    });
  }
  function productByIdFn(productId: number) {
    setProductByID(null);

    Ac.productByIdAc(productId).then(res => {
      filterAttributes(res);
      setProductByID(res);
    });
  }
  function relatedProductsFn(categoryId: number) {
    let dataPost = ProductsArrivalModel;
    dataPost.page = 1;
    dataPost.per_page = 2;
    dataPost.productCategoryIds = categoryId.toString();
    Ac.productsAc(dataPost).then(res => {
      setRelatedProductsItem(res);
    });
  }
  const  widgetsFn= useThrottle(() => {
   
      console.log("Button clicked!");
    Ac.widgetsAc().then(res => {
      res.map(x => {
        if (x.slug == 'footer-images') {
          setFooterImages(x.widgetFiles);
        }
        if (x.slug == 'categories-information') {
          setCategoriesInformation(x.widgetFiles);
        }
        if (x.slug == 'main-page-slider') {
          setMainPageSlider(x.widgetFiles);
        }
      });
    });
  

  }, 5000);
  const searchProductsPageFn = useMemo(
    () => async (
      text?: string,
      categoryId?: number | Array<number>,
      sort?: string,
      newPage?:any
    ) => {

   
    const dataPost = { ...ProductsArrivalModel,search:text,page:newPage};
    const res = await Ac.productsSearchAc(dataPost);
      setCategoryProductsItem((prevData) => ({
        ...prevData,
        currentData: [...prevData?.currentData, ...res],
        page: newPage,
        per_page: 10,
        Id:categoryId,
        text:text,
      }))
     
 
  
      
    },
    [setCategoryProductsItem]
  );
  const clearSearch = ()=>{
    setCategoryProductsItem({currentData:[],page:1,per_page:10,Id:0,text:""});

  }
  const searchProductsFn = useMemo(
    () => async (
      text?: string,
      categoryId?: number | Array<number>,
      sort?: string,
      newPage?:any
    ) => {
      setCategoryProductsItem({currentData:[],page:1,per_page:10,Id:0,text:""});
    setCategoryLode(true);

    const dataPost = { ...ProductsArrivalModel,page:newPage,search:text};
    const res = await Ac.productsSearchAc(dataPost);
      setCategoryLode(false);
      setCategoryProductsItem((prevData) => ({
        ...prevData,
        currentData: [...prevData?.currentData, ...res],
        page: newPage,
        per_page: 10,
        Id:categoryId,
        text:text,
      }))
     
 
  
      
    },
    [setCategoryProductsItem]
  );

  return (
    <ProductContext.Provider
      value={{
        isProducts,
        productsFn,
        productsItem,
        categoriesFn,
        categoriesItem,
        arrivalItem,
        arrivalFn,
        productByIdFn,
        attributeType,
        productByID,
        widgetsFn,
        productByAttributesFn,
        cardBottomArrivalFn,
        cardBottomArrivalItem,
        bestSellingFn,
        bestSellingItem,
        newProductsFn,
        newProductsItem,
        relatedProductsFn,
        relatedProductsItem,
        searchProductsFn,
        categoriesTreeFn,
        categoriesTreeItem,
        categoryProductsItem,
        categoryLode,
        nameCategorySelect,
        setNameCategorySelect,
        footerImages,
        categoriesInformation,
        mainPageSlider,
        searchProductsPageFn,
        clearSearch,
        clearDataFn
      }}>
      {children}
    </ProductContext.Provider>
  );
}
function child(child: any, arg1: (Attribute: any) => void): any {
  throw new Error('Function not implemented.');
}
