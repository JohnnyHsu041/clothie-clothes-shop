# clothie：簡約風服飾網站

[Demo](https://clothie-3717b.web.app/)
<br>
<br>
<img width="480" alt="clothie首頁" src="https://user-images.githubusercontent.com/87815117/210706234-335db89e-2dd7-4f9e-b50f-f8d8919efb49.png">

## 使用技術
* `React`: 建立前端架構
* `React-router`: 建立Single Page Application
* `Redux`: 管理全域狀態
* `Stylus`: 規劃網站切版以及響應式網頁(RWD)設計
* `Express.js`: 建立後端架構 (Source code: https://github.com/JohnnyHsu041/clothie-clothes-shop-backend)
* `MongoDB`: 儲存資料庫資料
* `TypeScript`: 加入型別，預防預期外錯誤
* `firebase`: website hosting
* `Heroku`: server hosting

## 功能

### 產品瀏覽

<img width="640" alt="產品瀏覽" src="https://user-images.githubusercontent.com/87815117/212315585-6d1f3830-7fc1-4a42-986b-cdf3b0ec45dc.gif">
<strong>產品圖片使用image lazy loading來優化網站效能：</strong>
<br/>
<br/>
圖片路經預先儲存至data-src屬性

```
// src/components/product/ProductItem.tsx

<img 
    src="/images/placeholder.jpeg" 
    data-src={
        process.env.REACT_APP_BACKEND + props.image
    }
    alt="product_image"
    className="product-image"
/>
```

viewport瀏覽至產品時，將data-src圖片路徑替換至src：

```
// src/hooks/useImageLazyLoading.ts

const useImageLazyLoading = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries, owner) => {
            for (let entry of entries) {
                if (entry.isIntersecting) {
                
                    // replace placeholder to product image               
                    const img = entry.target as HTMLImageElement;
                    img.src = img.dataset.src as string;

                    // remove the listener
                    owner.unobserve(img);
                }
            }
        });

        const productImages = document.querySelectorAll(".product-image");
        productImages.forEach((productImage) => observer.observe(productImage));
    }, []);
};
```

### 會員註冊＆登入

<img width="640" alt="會員註冊＆登入" src="https://user-images.githubusercontent.com/87815117/212247425-dc0b1137-228e-4f46-93f8-615abd757eae.gif">
<strong>使用custom hook，保存使用者輸入的狀態及確認輸入的有效性：</strong>
<br/>
<br/>

```
// src/hooks/useFormValidity.ts

/* ... */

const formInfoHandler = (state: formInfo, action: formInfoAction) => {
    switch (action.type) {
        
        // check if the inputs are avaliable for submission
        case "INPUT_CHANGE":
            let formIsValid = true;

            for (let inputId in state.inputInfoObject) {
                if (!state.inputInfoObject[inputId]) continue;

                if (inputId === action.id) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid =
                        formIsValid && state.inputInfoObject[inputId]!.isValid;
                }
            }

            return {
                ...state,
                inputInfoObject: {
                    ...state.inputInfoObject,
                    [action.id]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                formIsValid,
            };
        
        // save user input when switching to signin/ signup form
        case "SET_FORM":
            return {
                inputInfoObject: action.inputInfoObject,
                formIsValid: action.formIsValid,
            };

        default:
            return state;
    }
};

/* ... */

const useFormValidity: FormValidity = (initObj, initFormValidity) => {
    const [formInfo, dispatch] = useReducer(formInfoHandler, {
        inputInfoObject: initObj,
        formIsValid: initFormValidity,
    });

    const changeHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({ type: "INPUT_CHANGE", id, value, isValid });
        },
        []
    );

    const setForm = useCallback(
        (inputObj: InputInfo, formValidity: boolean) => {
            dispatch({
                type: "SET_FORM",
                inputInfoObject: inputObj,
                formIsValid: formValidity,
            });
        },
        []
    );

    const { inputInfoObject, formIsValid } = formInfo;

    return [inputInfoObject, formIsValid, changeHandler, setForm];
};
```
<strong>使用custom hook確認登入狀態，以執行自動登入/登出：</strong>
```
// src/hooks/useAuthCheck.ts

let logoutTimer: NodeJS.Timeout;

const useAuthCheck = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const tokenExpirationDate = useSelector(
        (state: RootState) => state.auth.tokenExpirationDate
    );
    const dispatch = useDispatch();

    // checking for auto login
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData")!);

        if (
            storedUserData &&
            storedUserData.token &&
            new Date(storedUserData.expiration) > new Date()
        ) {
            dispatch(
                AuthActions.login({
                    userId: storedUserData.userId,
                    token: storedUserData.token,
                    expiration: new Date(storedUserData.expiration),
                })
            );
        } else {
            dispatch(AuthActions.logout());
        }
    }, [dispatch]);

    // set logout timer
    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                new Date(tokenExpirationDate).getTime() - new Date().getTime();

            logoutTimer = setTimeout(
                dispatch.bind(null, AuthActions.logout()),
                remainingTime
            );
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, tokenExpirationDate, dispatch]);
};
```

### 商品購物車(須先登入會員)

<img width="640" alt="商品購物車" src="https://user-images.githubusercontent.com/87815117/212249553-4427f75a-10ec-453c-9a49-3699099dfc7f.gif">
<strong>使用redux更新購物車產品數量：</strong>
<br/>
<br/>

```
// src/redux/cart-slice.ts

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    
        /* ... */
        
        changeAmount(state, action) {
            const storedData = JSON.parse(
                localStorage.getItem("clothie-cart")!
            );
            const storedProduct = storedData.products.find(
                (product: Product) => product.id === action.payload.id
            );
            const changedAmount =
                action.payload.amount - storedProduct.size[action.payload.size];

            state.amountOfCartProducts += changedAmount;

            storedProduct.size[action.payload.size] = action.payload.amount;
            storedProduct.amount += changedAmount;
            storedProduct.total = storedProduct.price * storedProduct.amount;

            localStorage.setItem(
                "clothie-cart",
                JSON.stringify({
                    products: [...storedData.products],
                    amountOfProducts: state.amountOfCartProducts,
                    totalAmount:
                        storedData.totalAmount +
                        storedProduct.price * changedAmount,
                })
            );
        },
        
        /* ... */
        
    },
});
```


### 訂單建立

<br>
<img width="640" alt="訂單建立" src="https://user-images.githubusercontent.com/87815117/212445771-f980dada-24df-4930-a4a4-6943f2f65c7d.gif">
<strong>使用custom hook儲存步驟狀態：</strong>
<br/>
<br/>

```
// src/hooks/useMultiSteps.ts

const useMultiSteps: MultiStepsFunc = (initStep, totalSteps) => {
    const [currentStep, setCurrentStep] = useState(initStep);
    const [isFirstStep, setIsFirstStep] = useState(true);
    const [isLastStep, setIsLastStep] = useState(false);

    const nextStep = useCallback(() => {
        if (currentStep >= totalSteps) return;
        setCurrentStep((prev) => prev + 1);
    }, [currentStep, totalSteps]);

    const prevStep = useCallback(() => {
        if (currentStep <= initStep) return;
        setCurrentStep((prev) => prev - 1);
    }, [currentStep, initStep]);

    useEffect(() => {
        if (currentStep === initStep) {
            setIsFirstStep(true);
            setIsLastStep(false);
        } else if (currentStep === totalSteps) {
            setIsLastStep(true);
            setIsFirstStep(false);
        } else {
            setIsFirstStep(false);
            setIsLastStep(false);
        }
    }, [currentStep, initStep, totalSteps]);

    return [currentStep, isFirstStep, isLastStep, nextStep, prevStep];
};
```
<strong>使用與會員登入相同的方法來保存訂單資料的狀態（請見功能：會員註冊/登入）：</strong>
<br/>
<br/>

```
// src/hooks/useFormValidity.ts
```

### 會員中心（密碼修改/訂單管理)

<br>
<img width="640" alt="會員密碼修改" src="https://user-images.githubusercontent.com/87815117/212447100-cd12f3a9-f812-4150-a64d-af0b446a1636.gif">

## 使用方法

`npm install`

## 本地端架設

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
