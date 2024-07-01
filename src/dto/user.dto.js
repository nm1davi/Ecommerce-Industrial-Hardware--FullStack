export class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    this.role = user.role;
    this.age = user.age;
    this.cart = user.cart;
    this.document = user.document ? `http://localhost:8080/document/${user.document}`: null;
    this.pictureProduct = user.pictureProduct ? `http://localhost:8080/products/${user.pictureProduct}`: null;
    this.pictureProfile = user.pictureProfile ? `http://localhost:8080/profiles/${user.pictureProfile}`: null;
    this.last_connection = user.last_connection
  }
}