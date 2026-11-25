import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewProduct() {

    // To get data from Path Variable
    const [productId, setProductId] = useState(useParams().id);

    const [product, setProduct] = useState({});

    useEffect(() => {
        getSingleProduct();
    }, []);

    async function getSingleProduct() {

        try {

            const response = await axios.get(`http://localhost:8051/products/image/${productId}`);
            setProduct(response.data);

        } catch (e) {
            console.log("Failed to fetch Product", e);
        }

    }


    return (
        <div className="container py-5">

            <div className="card border-0 rounded-4 shadow p-4 p-md-4">
                <div className="row">
                    <div className="col-md-3">
                        {
                            product.imageData
                                    &&
                            <img src={product.imageData} alt={product.name} className="card-img-top" style={{objectFit : "cover"}} />
                        }
                    </div>
                    <div className="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title"> { product.name  } </h5>

                            <p class="card-text"> { product.description } </p>
                            
                            <p className="card-text fw-semibold"> Product Price : { product.price } </p>

                            <div>
                                <button href="" className="btn btn-success btn-lg w-100"> Add To Cart </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ViewProduct;