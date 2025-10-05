import { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard.jsx";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} !right-5 z-10 cursor-pointer`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="black"
        className="bg-white rounded-full shadow-md p-1 hover:bg-gray-100 transition"
        id="ok"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} !left-5 z-10 cursor-pointer`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="black"
        className="bg-white rounded-full shadow-md p-1 hover:bg-gray-100 transition"
        id="ok"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
  fetch(`${apiBase}/api/products`)
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, []);


  const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,        
  swipe: true, 
  draggable: true,
  accessibility: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 768,  settings: { slidesToShow: 2 } },
    { breakpoint: 480,  settings: { slidesToShow: 1 } },
  ],
};



  return (
    <div className="container mx-auto mt-5 px-6 py-12">
      <h1 className="text-center font-avenir font-light text-[45px] mb-8 tracking-wide">Product List</h1> <br />

      

      <Slider {...settings} className="product-slider">
        {products.map((product, index) => (
          <div key={index} className="px-3">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default App;
