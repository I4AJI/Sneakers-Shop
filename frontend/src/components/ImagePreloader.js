import React, { useEffect } from 'react';

const ImagePreloader = ({ products }) => {
    useEffect(() => {
        // Предзагрузка всех изображений продуктов
        products.forEach(product => {
            const img = new Image();
            img.src = product.image;
        });
    }, [products]);

    return null; // Этот компонент не отображает ничего
};

export default ImagePreloader;