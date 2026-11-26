import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

function CreateProduct() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            stock: "",
            image: null,
        }
    });

    const navigate = useNavigate();

    // useParams

    // const isEditMode = Boolean(useParams().id);

    // const [productId, setProductId] = useState(useParams().id);

    const { id } = useParams();

    const isEditMode = Boolean(id);
    console.log(isEditMode);

    useEffect(() => {
        if (isEditMode) {
            getSingleProduct();
        }
    }, [isEditMode, id])

    async function getSingleProduct() {
        try {
            const response = await axios.get(`http://localhost:8051/products/image/${id}`);
            const product = response.data;

            // Populate React Hook Form fields
            // Setting data to the useForm
            reset({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
            })
            console.log(product);

        } catch (e) {
            console.log("Failed to fetch product", e);
            toast.error("Failed to fetch Product");
        }
    }

    async function onSubmit(data) {

        if (isEditMode) {
            await editProduct(data);
        } else {
            await addProduct(data);
        }
    }

    async function addProduct(data) {
        const dataToSend = new FormData();

        dataToSend.append("name", data.name);
        dataToSend.append("description", data.description);
        dataToSend.append("price", data.price);
        dataToSend.append("stock", data.stock);
        dataToSend.append("status", "ACTIVE");
        if (data.image && data.image.length > 0) {
            dataToSend.append("image", data.image[0]);
        }

        try {

            const response = await axios.post("http://localhost:8051/products/image", dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            toast.success("Product Added Successfully")
            reset();
            setTimeout(() => {
                navigate("/products")
            }, 4500)

        } catch (e) {
            toast.error("Failed to add Product")
            console.log("Error adding Product: ", e)
        }
    }

    async function editProduct(data) {

        const productData = {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            status: "ACTIVE"
        };

        try {

            await axios.put(`http://localhost:8051/products/image/${id}`, productData);

            toast.success("Product Updated Successfully");

            setTimeout(() => {
                navigate("/products");
            }, 1500);
        } catch (e) {
            console.log("Error updating Product", e);
            toast.error("Failed to update Product");
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">

                    <div className="card shadow border-0 rounded-4 p-4 p-md-4">

                        <div className="text-center mb-4">
                            <h3 className="fw-bold text-dark">

                                {isEditMode ? "Edit Product" : "Add a New Product"}


                            </h3>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=" form-floating mb-4">
                                <input type="text" id="name" name="name"
                                    {...register("name", {
                                        required: "Product Name must contain more than 1 character.",
                                        minLength: {
                                            value: 2,
                                            message: "Product Name must contain more than 1 character",
                                        }
                                    })}
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                />
                                <label> Product Name </label>
                                <div className="invalid-feedback"> {errors.name && errors.name.message} </div>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea id="description" name="description"
                                    {...register("description", {
                                        required: "Product Description must contain more than i character",
                                        // minLength : {
                                        //     value : 2,
                                        //     message : "Product Description must contain more than 1 character.",
                                        // }
                                        validate: (value) => (value && value.trim().length >= 2) || "Product Description must contain more than 1 character"
                                    }
                                    )}
                                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                />
                                <label> Product Description </label>
                                <div className="invalid-feedback"> {errors.description && errors.description.message} </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="number" name="price" id="price"
                                    {...register("price", {
                                        required: "Product Price must be a valid non-negative number.",
                                        min: {
                                            value: 0,
                                            message: "Product Price must be a valid non-negative number"
                                        },
                                    })}
                                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                />
                                <label> Product Price </label>
                                <div className="invalid-feedback"> {errors.price && errors.price.message} </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="number" name="stock" id="stock"
                                    {...register("stock", {
                                        required: "Product Stock must be a valid non-negative number.",
                                        min: {
                                            value: 0,
                                            message: "Product Stock must be a valid non-negative number"
                                        },
                                    })}
                                    className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                                />
                                <label> Product Stock </label>
                                <div className="invalid-feedback"> {errors.stock && errors.stock.message} </div>
                            </div>

                            {/* accept = image/* */}

                            {
                                !isEditMode && (
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label text-muted"> Product Image </label>
                                        <input type="file" name="image" id="image" accept="image/*"
                                            className={`form-control ${errors.image ? "is-invalid" : ""}`}
                                            {...register("image", {
                                                required: "Please select a Product Image."
                                            })}
                                        />
                                        <div className="invalid-feedback"> {errors.image && errors.image.message} </div>
                                    </div>
                                )
                            }

                            <div className="">
                                <button type="submit" className="btn btn-primary btn-lg rounded fw-semibold w-100">
                                    {
                                        isEditMode ? "Edit a Product" : "Add a Product"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    )

}

export default CreateProduct;