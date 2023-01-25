import axios from "axios";

export default class ProductService {
  getAll() {
    return axios.get("http://localhost:8080/api/product/get-all");
  }

  getAllWithView() {
    return axios.get("http://localhost:8080/api/product-view/get-all");
  }

  getAllDiscounted() {
    return axios.get(
      "http://localhost:8080/api/product/get-discounted-products"
    );
  }

  addProduct(productDto) {
    return axios.post("http://localhost:8080/api/product/add", productDto);
  }

  deleteProduct(productId) {
    return axios.delete(
      "http://localhost:8080/api/product/delete?id=" + productId
    );
  }

  getProductById(productId) {
    return axios.get(
      "http://localhost:8080/api/product/get-product?id=" + productId
    );
  }

  getByNameLike(productDefinition) {
    return axios.get(
      "http://localhost:8080/api/product/get-by-name-like?name=" +
        productDefinition
    );
  }

  filterProductList(filterObject) {
    if (
      filterObject.size !== null &&
      filterObject.color === null &&
      filterObject.max === null
    ) {
      return this.filterTypologyAndSize(
        filterObject.typology,
        filterObject.size
      );
    } else if (
      filterObject.size === null &&
      filterObject.color !== null &&
      filterObject.max === null
    ) {
      return this.filterTypologyAndColor(
        filterObject.typology,
        filterObject.color
      );
    } else if (
      filterObject.size === null &&
      filterObject.color === null &&
      filterObject.max !== null
    ) {
      return this.filterTypologyAndPrice(
        filterObject.typology,
        filterObject.min,
        filterObject.max
      );
    } else if (
      filterObject.size !== null &&
      filterObject.color !== null &&
      filterObject.max === null
    ) {
      return this.filterTypologyAndSizeAndColor(
        filterObject.typology,
        filterObject.size,
        filterObject.color
      );
    } else if (
      filterObject.size !== null &&
      filterObject.color === null &&
      filterObject.max !== null
    ) {
      return this.filterTypologyAndSizeAndPrice(
        filterObject.typology,
        filterObject.size,
        filterObject.min,
        filterObject.max
      );
    } else if (
      filterObject.size === null &&
      filterObject.color !== null &&
      filterObject.max !== null
    ) {
      return this.filterTypologyAndColorAndPrice(
        filterObject.typology,
        filterObject.color,
        filterObject.min,
        filterObject.max
      );
    } else if (
      filterObject.size !== null &&
      filterObject.color !== null &&
      filterObject.max !== null
    ) {
      return this.filterTypologyAndSizeAndColorAndPrice(
        filterObject.typology,
        filterObject.size,
        filterObject.color,
        filterObject.min,
        filterObject.max
      );
    } else {
      return this.getProductByTypologyAndGender(
        filterObject.typology,
        filterObject.gender
      );
    }
  }

  filterTypologyAndColor(typology, color) {
    return axios.get(
      "http://localhost:8080/api/product/get-by-filter-typology-color?color=" +
        color +
        "&typology=" +
        typology
    );
  }

  filterTypologyAndColorAndPrice(typology, color, min, max) {
    console.log("girdi");

    return axios.get(
      "http://localhost:8080/api/product/get-by-filter-typology-color-price?color=" +
        color +
        "&max=" +
        max +
        "&min=" +
        min +
        "&typology=" +
        typology
    );
  }

  getProductByTypologyAndGender(typology, gender) {
    return axios.get(
      "http://localhost:8080/api/product/get-by-filter-typology-gender?gender=" +
        gender +
        "&typology=" +
        typology
    );
  }

  filterTypologyAndPrice(typology, min, max) {
    return axios.get(
      "http://localhost:8080/api/product/get-by-filter-typology-price?max=" +
        max +
        "&min=" +
        min +
        "&typology=" +
        typology
    );
  }

  filterTypologyAndSize(typology, size) {
    return axios.get(
      "http://localhost:8080/api/product/get-by-filter-typology-size?size=" +
        size +
        "&typology=" +
        typology
    );
  }

  filterTypologyAndSizeAndColor(typology, size, color) {
    return axios.get(
      "http://localhost:8080/api/product/get-by-filter-typology-size-color?color=" +
        color +
        "&size=" +
        size +
        "&typology=" +
        typology
    );
  }

  filterTypologyAndSizeAndColorAndPrice(typology, size, color, min, max) {
    return axios.get(
      "http://localhost:8080/api/product/get-by-filter-typology-size-color-price?color=" +
        color +
        "&max=" +
        max +
        "&min=" +
        min +
        "&size=" +
        size +
        "&typology=" +
        typology
    );
  }

  filterTypologyAndSizeAndPrice(typology, size, min, max) {
    return axios.get(
      "http://localhost:8080/api/product/get-by-filter-typology-size-price?max=" +
        max +
        "&min=" +
        min +
        "&size=" +
        size +
        "&typology=" +
        typology
    );
  }
}
