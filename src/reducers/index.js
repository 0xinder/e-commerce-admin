import authReducer from './auth.reducers';
import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import pageReducer from './page.reducer';
import productReducer from './product.reducer';
const rootReducer=combineReducers({
    auth:authReducer,
    user:userReducer,
    category:categoryReducer,
    product:productReducer,
    order:orderReducer,
    page:pageReducer
});
export default rootReducer;