// ProductContext.js
import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [isProductPublished, setIsProductPublished] = useState(false);

    return (
        <ProductContext.Provider value={{ isProductPublished, setIsProductPublished }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
};
