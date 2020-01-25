import React,{useState,useEffect}from 'react'
import{withFormik,Form,Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

 function UserForm({ errors, touched, values, status }) {
console.log(status);
    const [user, setUser] = useState([]);
    useEffect(() => {
      status && setUser(user => [...user, status]);
    }, [status])
 
    

    return (
        <div>
        <Form>

        {touched.username && errors.username && <p className = "errorMessage">{"Cannot leave Username field blank!"}</p>}
         <Field type = "text" name = "username" placeholder = "enter Username" value = {values.username}/>

        {touched.password && errors.password && <p className = "errorMessage">{"please enter a password (min 6 characters)"}</p>}
         <Field type = "password" name = "password" placeholder = "enter password" value = {values.password}/>

         {touched.email && errors.email&& <p className = "errorMessage">{"please enter a valid email"}</p>}
         <Field type = "text" name = "email" placeholder = "enter email" value = {values.email}/> <br/>

       
         <label htmlFor = "terms"> Do you agree to our terms and conditions?
            <Field type = "checkbox" name = "terms" value = {values.checkbox}    />
         </label> <br/>

         <button type = "submit">submit</button>

        </Form>

        {user.map(user => (
        <div key={user.id}>
          <h1> {user.username}</h1>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>

         
        </div>
      ))}
        </div>
        

    )
 
    
}

const FormikLoginForm = withFormik({

    mapPropsToValues({ username, password,email,terms }) {
      return {
        username: username || "",
        password: password || "",
        email: email || "",
        terms:false
      };
    },
    
    validationSchema: Yup.object().shape({
        
        username:Yup.string()
            .required(),
        
        password:Yup.string()
            .required()
            .min(6),   // can also add custom error messages here in the validation schema instead of above

        email:Yup.string()
            .required()
            .email(),

        terms:Yup.boolean()
        .oneOf([true], 'Must Accept Terms and Conditions')
       
        


    }),

    handleSubmit(values, { setStatus, resetForm,setErrors, setSubmitting }){
        console.log("submitting",values);
       

            axios
    
            .post("https://reqres.in/api/users",values)
    
            .then(res =>{
                console.log(res);
                setStatus(res.data);
                setSubmitting(false)
                resetForm();
            })
   
            .catch(err =>{
                console.log(err.response);
                setSubmitting(false);
            })

           
       
    },

  

   
    })(UserForm);


export default FormikLoginForm;
