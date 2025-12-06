// src/graphql/resolvers.js
const cartService = require('../services/cartService');

const checkAuth = (context) => {
    console.log('context', context);
    if (!context.user || !context.user.id) {
        throw new Error("UNAUTHENTICATED: Yêu cầu đăng nhập để truy cập Giỏ hàng.");
    }
    return context.user.id;
};

const resolvers = {
    Query: {
        getCart: (parent, args, context) => {
            const userId = checkAuth(context);
            return cartService.getCart(userId);
        },
    },

    Mutation: {
        addToCart: (parent, { productId, quantity }, context) => {
            const userId = checkAuth(context);
            return cartService.addToCart(userId, parseInt(productId), quantity);
        },

        updateCartItem: (parent, { itemId, newQuantity }, context) => {
            const userId = checkAuth(context);
            return cartService.updateCartItem(userId, parseInt(itemId), newQuantity);
        },

        removeCartItem: (parent, { itemId }, context) => {
            const userId = checkAuth(context);
            return cartService.removeCartItem(userId, parseInt(itemId));
        },

        setSelectedItems: (parent, { itemIds, selected }, context) => {
            const userId = checkAuth(context);
            const itemIntIds = itemIds.map(id => parseInt(id));
            return cartService.setSelectedItems(userId, itemIntIds, selected);
        },

        clearCart: (parent, args, context) => {
            const userId = checkAuth(context);
            return cartService.clearCart(userId);
        }
    },
};

module.exports = resolvers;