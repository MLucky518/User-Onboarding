import React,{useState,useEffect}from 'react'
import{withFormik,Form,Field} from "formik";
import * as Yup from "yup";

 function UserForm({ errors, touched, values, status }) {
    return (
        <Form>

        {touched.username && errors.username && <p className = "errorMessage">{"Cannot leave Username field blank!"}</p>}
         <Field type = "text" name = "username" placeholder = "enter Username" value = {values.username}/>

        {touched.password && errors.password && <p className = "errorMessage">{"please enter a password (min 6 characters)"}</p>}
         <Field type = "password" name = "password" placeholder = "enter password" value = {values.password}/>

         <Field type = "text" name = "email" placeholder = "enter email" value = {values.email}/> <br/>

         <label htmlFor = "terms"> Do you agree to our terms and conditions?
            <Field type = "checkbox" name = "terms" value = {values.checkbox}    />
         </label> <br/>

         <input type = "submit"/>

        </Form>

    )
}

const FormikLoginForm = withFormik({

    mapPropsToValues({ username, password,email }) {
      return {
        username: username || "",
        password: password || "",
        email: email || ""
      };
    },

    handleSubmit(values){
        console.log("submitting",values);
    },

    validationSchema: Yup.object().shape({
        
        username:Yup.string()
            .required(),
        
        password:Yup.string()
            .required()
            .min(6),

        email:Yup.string()
            .required()
            .email(),

        terms:Yup.bool()
        


    })

   
    })(UserForm);


export default FormikLoginForm;
