import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { validateEmail, validateMobile, validatePassword, validateUsername } from "../utils/utils";
import axios from "axios";

function Signup() {

    // useState     Form State
    let [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        mobile : "",
        username : "",
        password : "",
        role : "ROLE_USER"
    });

    // useState     Validation Error State
    let [errorData, setErrorData] = useState({});
    
    // Loading State
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;

        // console.log(value);

        setFormData((prevData) => ({
            ...prevData,
            [name] : value,
        }));

        setErrorData((prevData) => ({
            ...prevData,
            [name] : "",
        }))

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const newErrors = {};


        if(!formData.firstName || formData.firstName.length < 3) {
            newErrors.firstName = "First name must be atleast 3 characters"
        }

        if(!formData.lastName || formData.lastName.length < 3) {
            newErrors.lastName = "Last name must be atleast 3 characters"
        }

        if(!validateEmail(formData.email)) {
            newErrors.email = "Enter a valid Email";
        }

        if(!validateMobile(formData.mobile)) {
            newErrors.mobile = "Enter a valid Mobile";
        }

        if(!validateUsername(formData.username)) {
            newErrors.username = "Enter a valid Username";
        }

        if(!validatePassword(formData.password)) {
            newErrors.password = "Enter a valid Password";
        }

        setErrorData(newErrors);

        // Stop submission if validation fails
        if(Object.keys(newErrors).length > 0) {
            return;
        }

        const userData = {
            firstName : formData.firstName.trim(),
            lastName : formData.lastName.trim(),
            email : formData.email.trim(),
            phone : formData.mobile,
            credential : {
                username : formData.username.trim(),
                password : formData.password,
                roleBasedAuthority : formData.role
            }
        };

        setLoading(true)

        try {

            const response = await axios.post("http://localhost:8050/api/users", userData);

            console.log(response);

            if(response.status === 201) {
                toast.success("User Registered Successfully");
                setTimeout(() => {
                    navigate("/login")
                },5000)
            }
        } catch(e) {
            if(e.response && e.response.status === 500) {
                toast.error("User Registration Failure")
            } else if(!e.response) {
                toast.error("Network Error: Unable to reach server")
            } else {
                toast.error("Un Expected Error Occured");
            }
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow border-0 rounded-4 p-4 p-md-5">
                        
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark"> Create Account </h2>
                            <p className="text-muted"> Please fill in the details to sign up </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label fw-semibold"> First Name </label>
                                    <input type="text" name="firstName" id="firstName" placeholder="First Name"
                                        value={formData.firstName}
                                        className= {`form-control ${errorData.firstName ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback"> {errorData.firstName} </div>
                                </div>
                                

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label fw-semibold"> Last Name </label>
                                    <input type="text" name="lastName" id="lastName" placeholder="Last Name"
                                        value={formData.lastName}
                                        className= {`form-control ${errorData.lastName ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback"> {errorData.lastName} </div>
                                </div>

                            </div>


                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"> Email Address </label>
                                    <input type="email" name="email" id="email" placeholder="Email Address"
                                        value={formData.email}
                                        className= {`form-control ${errorData.email ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback"> {errorData.email} </div>
                                </div>
                                

                                <div className="mb-3">
                                    <label htmlFor="mobile"> Mobile Number </label>
                                    <input type="number" name="mobile" id="mobile" placeholder="Mobile Number"
                                        value={formData.mobile}
                                        className= {`form-control ${errorData.mobile ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback"> {errorData.mobile} </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username"> Username </label>
                                    <input type="text" name="username" id="username" placeholder="Username"
                                        value={formData.username}
                                        className= {`form-control ${errorData.username ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback"> {errorData.username} </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password"> Password </label>
                                    <input type="password" name="password" id="password" placeholder="Password"
                                        value={formData.password}
                                        className= {`form-control ${errorData.password ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback"> {errorData.password} </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label"> Role </label>
                                    <select name="role" id="role" className="form-select"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="ROLE_USER"> USER </option>
                                        <option value="ROLE_ADMIN"> ADMIN </option>
                                    </select>
                                </div>

                                {/* In the place of d-grid, in button tag directly we can take w-100 */}
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary btn-lg rounded-3 fw-semibold"
                                        disabled = {loading}> 
                                    
                                    {loading? "Registering..." : "Sign Up" } 

                                    </button>
                                </div>

                                <div className="text-center">
                                    <p className="text-muted mb-0"> Already have an account? 
                                        <Link to="/login" className="text-decoration-none fw-semibold"> 
                                            Login Here
                                        </Link>
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

export default Signup;
