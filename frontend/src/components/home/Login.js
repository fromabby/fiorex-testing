import React, { Fragment, useState, useEffect, } from 'react'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/authActions'
import { useNavigate } from "react-router-dom";
import Metadata from "../layout/Metadata";

const Login = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated, error, loading, user } = useSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState('false')
    const [showConfirm, setShowConfirm] = useState('false')

    const showPasswordToggle = () => setShowPassword(!showPassword)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isAuthenticated) {
            alert.success("Logged in successfully.")
            if(user.role === 'Admin' || user.role === 'Staff') {
                navigate('/admin/dashboard')
            }
            else {
                navigate('/products')
            }
        }
    }, [dispatch, navigate, alert, error, isAuthenticated])

    const submitHandler = e => {
        e.preventDefault()

        dispatch(login({email, password}))
    }

    return (
        <div>
        
                <Fragment>
                    

                    <div className="row wrapper">
                    <Metadata title={'Log-in'}/>
                        <div className="col-10 col-lg-5">
                        <div className = "loginBox">
                        
                        <form className="shadow-lg" onSubmit = {submitHandler}>
                        <img class="user" src="../../images/user icon.svg" height="100px" width="100px"/>
                        <hr/>
                            <h1 className="mb-3">LOG-IN</h1>
                            <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                required
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                            </div>
                
                            <div className="form-group">
                            
                            <label htmlFor="password_field">Password</label>
                            <div className="input-group">
                            <input
                                required
                                type={showPassword ? "password" : "showPass"}
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange = {(e) => setPassword(e.target.value)}
                            />
                            <div className="input-group-addon">
                            <div  id = "showPass" onClick={showPasswordToggle}>
                                            <span className="fa-sm">
                                                <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                                            </span>
                                        </div>
                            </div>
                            </div>
                            
                            </div>

                            <Link to ="/password/forgot" className="float-right mb-4" id = "linkHover">Forgot Password?</Link>
                
                            <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            >
                            LOGIN
                            </button>

                            <Link to="/register" className="float-center mt-3" id = "linkHover">New User? Sign-Up Now</Link>
                        </form>
                        </div>
                        </div>
                        </div>
                                </Fragment>

        
       
    </div>
    
    )
}

export default Login