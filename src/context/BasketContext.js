import React, { createContext, useState, useContext, useEffect } from 'react';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState(() => {
        const localBasket = localStorage.getItem('basket');
        return localBasket ? JSON.parse(localBasket) : [];
    });

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basketItems));
    }, [basketItems]);

    const addToBasket = (sneaker) => {
        setBasketItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === sneaker._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === sneaker._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...sneaker, quantity: 1 }];
        });
    };

    const removeFromBasket = (id) => {
        setBasketItems(prevItems => prevItems.filter(item => item._id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setBasketItems(prevItems =>
            prevItems.map(item =>
                item._id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <BasketContext.Provider
            value={{ basketItems, addToBasket, removeFromBasket, updateQuantity }}
        >
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => useContext(BasketContext);