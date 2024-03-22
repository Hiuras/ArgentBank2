import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices/loginSlice";
import { userReducer } from "./slices/userSlice";

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
  