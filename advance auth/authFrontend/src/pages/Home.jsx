import { useNavigate } from "react-router-dom";
import LogoutApi from "../authapi/LogoutApi";
import { useEffect, useState } from "react";
import getAllProducts from "../authapi/getProductsApi"
import "../index.css"


function Home() {
  const [products, setProducts] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isCart, setisCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    let data = await getAllProducts();
    setProducts(data);
    setFilteredProducts(data);
  }

  // addToCartHandler
  function addToCartHandler(product) {
    setCounter(counter + 1);
    setAddToCart([...addToCart, product]);
  }

  function filtering(type) {
    if (type === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category == type);
      setFilteredProducts(filtered);
    }
  }

  async function logoutHandler() {
    const res = await LogoutApi();
    if (res.ok) {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="navbar">
        <h2 style={{ color: "white" }}>ShoppingStore</h2>
        <span
          onClick={() => (!isCart ? setisCart(true) : setisCart(false))}
          style={{ color: "white" }}
        >
          {isCart ? (
            <i className="fa-regular fa-circle-right"></i>
          ) : (
            <>
              <i className="fa-solid fa-cart-shopping"></i>
              <span> {counter}</span>
            </>
          )}
        </span>
        <button onClick={logoutHandler}>Logout</button>
      </div>

      <div className="btns">
        <button onClick={() => filtering("all")} className="btn">
          All
        </button>
        <button
          onClick={() => filtering("men's clothing")}
          className="btn btnCategory"
        >
          Men's clothing
        </button>
        <button
          onClick={() => filtering("jewelery")}
          className="btn btnCategory"
        >
          Jewelery
        </button>
        <button
          onClick={() => filtering("electronics")}
          className="btn btnCategory"
        >
          Electronics
        </button>
        <button
          onClick={() => filtering("women's clothing")}
          className="btn btnCategory"
        >
          Women's clothing
        </button>
        <select
          onChange={(e) => filtering(e.target.value)}
          className="btn"
          id="selectCategory"
        >
          <option value="men's clothing">Men's clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
      </div>

      <div className="products">
        {isCart
          ? addToCart.map((product) => {
              return (
                <div className="product" key={product.id}>
                  <div className="productImg">
                    <img src={product.image} alt="" />
                  </div>
                  <div className="details">
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                  </div>
                </div>
              );
            })
          : filteredProducts.map((product) => {
              return (
                <div className="product" key={product.id}>
                  <div className="productImg">
                    <img src={product.image} alt="" />
                  </div>
                  <div className="details">
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                    <button
                      className="btn"
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to Cart <span></span>
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
      <footer style={{ color: `rgb(249, 79, 17)`, paddingBottom: `10px` }}>
        © 2026 ShoppingStore | built by Talha Mohsin
      </footer>
    </>
  );
}

export default Home;
