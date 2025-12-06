// src/graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # =======================
  # 1. TYPES (Cấu trúc dữ liệu)
  # =======================
  type CartItem {
    id: ID!                
    productId: ID!         
    productName: String!   
    price: Float!          
    quantity: Int!         
    selected: Boolean!     
    createdAt: String!
    updatedAt: String!
  }

  type Cart {
    id: ID!               
    userId: ID!           
    items: [CartItem!]!   
    totalItems: Int!      
    totalQuantity: Int!   
    subtotal: Float!      # Tổng tiền của tất cả sản phẩm
    selectedTotal: Float! # Tổng tiền của các sản phẩm được CHỌN
  }

  # =======================
  # 2. QUERY (Lấy dữ liệu)
  # =======================
  type Query {
    "Lấy thông tin chi tiết của giỏ hàng hiện tại (yêu cầu đăng nhập)"
    getCart: Cart
  }

  # =======================
  # 3. MUTATION (Thay đổi dữ liệu)
  # =======================
  type Mutation {
    "Thêm sản phẩm vào giỏ hàng hoặc cập nhật số lượng"
    addToCart(
      productId: ID!
      quantity: Int!
    ): Cart

    "Cập nhật số lượng mới của một sản phẩm (CartItem)"
    updateCartItem(
      itemId: ID!
      newQuantity: Int! 
    ): Cart

    "Xóa một sản phẩm (CartItem) khỏi giỏ hàng"
    removeCartItem(
      itemId: ID!
    ): Cart

    "Chọn hoặc bỏ chọn một hoặc nhiều sản phẩm để thanh toán"
    setSelectedItems(
      itemIds: [ID!]! # Danh sách ID của CartItem cần thay đổi
      selected: Boolean! # Trạng thái cần đặt (true = chọn, false = bỏ chọn)
    ): Cart

    "Xóa toàn bộ giỏ hàng"
    clearCart: Cart
  }
`;

module.exports = typeDefs;