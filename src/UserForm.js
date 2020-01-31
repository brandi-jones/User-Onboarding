import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage, withFormik} from "formik";
import axios from "axios";
import UserList from "./UsersList.js";
import * as Yup from "yup";


const UserForm = props => {

    const [users, setUsers] = useState([]);

    const handleSubmit = (values, tools) => {
        axios.post('https://reqres.in/api/users', values)
        .then(response => {
            tools.resetForm();
            console.log(response);
            addNewUser(response.data);
        })
        .catch(error => {
            console.log("Error:", error);
        })
        .finally(() => {
            tools.setSubmitting(false);
            console.log("finally, users:", users);
        })

    }

    const addNewUser = data => {
        
        // const newUser = {
        //     name: data.name,
        //     email: data.email
        // }
        
        setUsers([
            ...users,
            data
        ])
    }

    return (
        <>
        <Formik 
            onSubmit={handleSubmit}
            initialValues={{name: '', email: '', password: '', checkbox: false}}
            validationSchema={validationSchema}
            render={props => {
                return (
                    <Form>
        
                        <Field name="name" type="text" placeholder="enter name" />
                        {props.touched.name && props.errors.name ? <p>{props.errors.name}</p> : null}

                        <Field name="email" type="email" placeholder="enter email" value={props.values.email}/>
                        {props.touched.email && props.errors.email ? <p>{props.errors.email}</p> : null}

                        <Field name="password" type="password" placeholder="enter password" />
                        {props.touched.password && props.errors.password ? <p>{props.errors.password}</p> : null}

                        <br></br>
                        <label htmlFor="checkbox">Agree to Terms and Conditions</label>
                        <Field name="checkbox" type="checkbox"/>
                        {props.touched.checkbox && props.errors.checkbox ? <p>{props.errors.checkbox}</p> : null}

                        <button name="submit" type="submit" disabled={props.isSubmitting}>
                            {props.isSubmitting ? 'Submitting' : 'Submit'}
                        </button>

                        
                    </Form>
                );


            }}
        />
        <UserList users={users} />
        </>
    );
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be 3 or more characters long")
        .required("Name is required"),
    email: Yup.string()
        .email("Email not valid")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be 6 or more characters long")
        .required("Password is required"),
    checkbox: Yup.boolean()
        .oneOf([true], 'Must Accept Terms and Conditions'),
})



export default UserForm;