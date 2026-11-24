import { useForm } from "react-hook-form";
import { validateUsername, validatePassword } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify/unstyled";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Login() {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    let navigate = useNavigate();

    async function onSubmit(data) {         // Directly getting the data

        // const {username, password} = data;

        const authRequest = {
            username: data.username,
            password: data.password
        }

        try {

            const response = await axios.post("http://localhost:8059/api/authenticate", authRequest);

            console.log(response.data);

            const { data, status } = response;

            const decodedToken = jwtDecode(data.jwtToken);
            console.log(decodedToken);

            const username = decodedToken.sub;

            const response1 = await axios.get(`http://localhost:8050/api/users/username/${username}`);

            console.log(response1.data);

            localStorage.setItem("accessToken", data.jwtToken);
            localStorage.setItem("user", JSON.stringify(response1.data));

            reset();

            toast.success("Login Successfull");

            setTimeout(() => {
                navigate("/addProduct")
            },4500);

        } catch (e) {

        }

    }

    return (
        <div className="container py-5">

            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow border-0 rounded-4 p-4 p-md-4">
                        <div className="text-center mb-4">
                            <h1 className="fw-bold text-dark"> Login Form </h1>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label"> Username </label>
                                <input type="text" name="username" id="username" placeholder="Username"
                                className= {`form-control ${errors.username? "is-invalid" : ""}`}
                                    {...register("username", {
                                        required: "Username is required",
                                        validate: (value) => validateUsername(value) || "Username must be more than 3 characters."
                                    })}
                                />
                                <div className="invalid-feedback"> {errors.username && errors.username.message} </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label"> Password </label>
                                <input type="password" name="password" id="password" placeholder="Password"
                                className={`form-control ${errors.password? "is-invalid" : ""}`}
                                    {...register("password", {
                                        required: "Password is required",
                                        validate: (value) => validatePassword(value) || "Password must be atleast 8 characters are required"

                                        //    validate : (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must be atleast 8 characters are required" 
                                    })}
                                />
                                <div className="invalid-feedback"> {errors.password && errors.password.message} </div>
                                
                            </div>

                            <div className="d-grid mb-3">
                                <button type="submit" disabled={isSubmitting}
                                className="btn btn-primary btn-lg rounded fw-semibold">
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-muted"> Don't have an Account? 
                                    <Link to="/register" className="text-decoration-none fw-semibold"> Register </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    )
}
export default Login;