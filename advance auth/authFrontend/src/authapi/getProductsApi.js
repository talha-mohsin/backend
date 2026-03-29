async function getAllProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const result = await res.json();
    return result;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

export default getAllProducts;
