import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutContextProvider } from './context/WorkoutContext';
import { BrandContextProvider } from './context/BrandContext';
import { AuthContextProvider } from './context/AuthContext';
import { CategoryContextProvider} from './context/CategoryContext';
import { SubCategoryContextProvider } from './context/SubCategory';
import { ProductContextProvider } from './context/ProductContext';
import { ItemContextProvider } from './context/ItemContext';
import {CartContextProvider} from './context/CartContext';
import {CartItemContextProvider} from './context/CartItemContext'
import {StoreContextProvider} from './context/StoreContext';
import { StoreTransactionContextProvider } from './context/StoreTransactionContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <BrandContextProvider>
          <CategoryContextProvider>
              <SubCategoryContextProvider>
                <ProductContextProvider>
                  <ItemContextProvider>
                    <CartContextProvider>
                      <StoreContextProvider>
                        <StoreTransactionContextProvider>
                          <CartItemContextProvider>
                            <App />
                          </CartItemContextProvider>
                        </StoreTransactionContextProvider>
                      </StoreContextProvider>
                    </CartContextProvider>
                  </ItemContextProvider>
                </ProductContextProvider>
              </SubCategoryContextProvider>
          </CategoryContextProvider>
          </BrandContextProvider>
      </WorkoutContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);

