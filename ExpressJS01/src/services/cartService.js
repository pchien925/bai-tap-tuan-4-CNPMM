// src/services/cartService.js
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');

// Hàm tìm hoặc tạo giỏ hàng cho người dùng
const findOrCreateCart = async (userId) => {
    let [cart] = await Cart.findOrCreate({
        where: { userId },
        defaults: { userId }
    });
    return cart;
};

// Hàm tính toán và trả về toàn bộ giỏ hàng
const getCartWithItems = async (userId) => {
    // 1. Dùng findOrCreateCart để đảm bảo giỏ hàng luôn có ID
    const cart = await findOrCreateCart(userId); 

    // 2. Load lại giỏ hàng cùng các item
    const cartWithItems = await Cart.findOne({
        where: { id: cart.id }, // Tìm theo ID đã có
        include: [{ 
            model: CartItem, 
            as: 'items',
            order: [['createdAt', 'ASC']]
        }]
    });

    // BỎ khối IF (!cart) cũ đi vì lúc này cartWithItems chắc chắn không null
    
    const items = cartWithItems.items || [];
    const totals = items.reduce((acc, item) => {
        const totalItemPrice = item.price * item.quantity;
        acc.subtotal += totalItemPrice;
        if (item.selected) {
            acc.selectedTotal += totalItemPrice;
        }
        acc.totalQuantity += item.quantity;
        return acc;
    }, { subtotal: 0, selectedTotal: 0, totalQuantity: 0 });

    return {
        // Sử dụng cartWithItems (luôn có ID)
        ...cartWithItems.toJSON(),
        items: items.map(item => item.toJSON()),
        ...totals,
        totalItems: items.length
    };
};
const addToCart = async (userId, productId, quantity) => {
    const cart = await findOrCreateCart(userId);
    const product = await Product.findByPk(productId); 

    if (!product) throw new Error(`Sản phẩm với ID ${productId} không tồn tại.`);
    if (quantity <= 0) throw new Error("Số lượng phải lớn hơn 0.");

    const existingItem = await CartItem.findOne({
        where: { cartId: cart.id, productId }
    });

    if (existingItem) {
        // Cập nhật số lượng
        await existingItem.increment('quantity', { by: quantity });
    } else {
        // Thêm mới
        await CartItem.create({
            cartId: cart.id,
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: quantity,
            selected: true 
        });
    }
    return getCartWithItems(userId);
};

const updateCartItem = async (userId, itemId, newQuantity) => {
    if (newQuantity <= 0) {
        // Nếu số lượng <= 0, ta xóa sản phẩm đó
        return removeCartItem(userId, itemId);
    }
    
    const cart = await findOrCreateCart(userId);
    const [updatedRows] = await CartItem.update(
        { quantity: newQuantity },
        { where: { id: itemId, cartId: cart.id } }
    );
    
    if (updatedRows === 0) throw new Error("Sản phẩm trong giỏ không tồn tại hoặc không thuộc giỏ hàng này.");

    return getCartWithItems(userId);
};

const removeCartItem = async (userId, itemId) => {
    const cart = await findOrCreateCart(userId);
    const deletedCount = await CartItem.destroy({
        where: { id: itemId, cartId: cart.id }
    });
    
    if (deletedCount === 0) throw new Error("Sản phẩm không tồn tại trong giỏ hàng.");
    
    return getCartWithItems(userId);
};

const setSelectedItems = async (userId, itemIds, selected) => {
    const cart = await findOrCreateCart(userId);
    
    // Cập nhật trạng thái 'selected' cho các item trong danh sách itemIds
    const [updatedRows] = await CartItem.update(
        { selected },
        { where: { id: itemIds, cartId: cart.id } }
    );

    if (updatedRows === 0) throw new Error("Không tìm thấy sản phẩm nào để cập nhật trạng thái.");

    return getCartWithItems(userId);
};

const clearCart = async (userId) => {
    const cart = await findOrCreateCart(userId);
    await CartItem.destroy({
        where: { cartId: cart.id }
    });
    return getCartWithItems(userId);
};

module.exports = {
    getCart: getCartWithItems,
    addToCart,
    updateCartItem,
    removeCartItem,
    setSelectedItems,
    clearCart
};