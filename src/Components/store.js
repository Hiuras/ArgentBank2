import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../Components/slices/loginSlice";
import { userReducer } from "../Components/slices/userSlice";

/*Store du Reducer*/
 const store = configureStore({
    reducer: {
      login: loginReducer,
      user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }),
  })

  export default store
  