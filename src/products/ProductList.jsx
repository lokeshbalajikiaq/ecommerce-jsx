import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {

        try {

            const response = await axios.get("http://localhost:8051/products/image");
            setProducts(response.data);

        } catch (e) {
            console.log("Error Fetching Products", e);
        }

    }

    return (
        <div className="container py-5">
            <div className="row">

                <div className="col-lg-3 mb-4">
                    Filters
                </div>

                <div className="col-lg-9">
                    <div className="row">
                        {
                            products.length > 0 ? (
                                products.map((product, index) => (
                                    <div className="col-md-6 col-xl-4 mb-4" key={product.id || index}>

                                        <Link to= {`/viewProduct/${product.id}`} className="text-decoration-none">
                                            <div className="card h-100 shadow border-0 rounded-4 p-4 p-md-4">
                                                <img src={product.imageData} alt={product.name} className="card-img-top" style={{ height: "220px", objectFit: "cover" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title"> 
                                                        {product.name.length > 60? product.name.substring(0,60)+"..." : product.name} 
                                                    </h5>
                                                    <p className="card-text">
                                                        {product.description.length > 100? product.description.substring(0,100)+"..." : product.description} 
                                                    </p>
                                                    <p className="card-text fw-bold"> {product.price} </p>
                                                    <p className="card-text fw-bold"> {product.stock} </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )
                                :
                                (<> </>)
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ProductList;