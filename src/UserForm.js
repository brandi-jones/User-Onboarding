import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage, yupToFormErrors} from "formik";
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
            initialValues={{name: '', email: '', password: ''}}
            render={props => {
                return (
                    <Form>
                        <Field name="name" type="text" placeholder="enter name" />
                        
                        <Field name="email" type="email" placeholder="enter email" />

                        <Field name="password" type="password" placeholder="enter password" />

                        <br></br>
                        <label htmlFor="checkbox">Agree to Terms and Conditions</label>
                        <Field name="checkbox" type="checkbox" />

                        <button name="submit" type="submit" disabled={props.isSubmitting}>
                            {props.isSubmitting ? 'Submitting' : 'Submit'}
                        </button>

                        
                    </Form>
                );


                /* validationSchema: Yup.object().shape({
                        name: Yup.string()
                            .min(3)
                            .required(),
                        email: Yup.string()
                            .min(6)
                            .required(),
                        
                    }) */
            }}
        />
        <UserList users={users} />
        </>
    );
}

export default UserForm;