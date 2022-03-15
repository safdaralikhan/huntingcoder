import React , {useState} from 'react';
import styles from "../styles/contact.module.css"

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [desc, setDesc] = useState("");



  const handleChange=(e)=>{
    console.log("eee",e.target)
    e.preventDefault()
    if(e.target.name=="name"){
      setName(e.target.value)
    }
    else if(e.target.name=="phone"){
      setContact(e.target.value)
    }
    else if(e.target.name=="email"){
      setEmail(e.target.value)
    }

    else if(e.target.name=="desc"){
      setDesc(e.target.value)
    }





  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(name,email,contact,desc)
    const data = {name,email,contact,desc };

fetch('http://localhost:8080/api/postcontact', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.text())
.then(data => {
  alert("data post successfully")
  console.log('Success:', data);
  setContact("")
  setDesc("")
  setEmail("")
  setName("")
})
.catch((error) => {
  console.error('Error:', error);
});

  }

  return (
    <div classNameName={styles.container}>
    <h1>Contact Us</h1>

    <div>

    <form onSubmit={handleSubmit}>
    <div classNameName={styles.mb3}>
    <label htmlFor="name" classNameName={styles.formlabel}>Name</label>
    <input classNameName={styles.input} type="text" value={name} onChange={handleChange} className="form-control" name="name" id="name" aria-describedby="emailHelp" required/>

  </div>
  <div classNameName={styles.mb3}>
    <label htmlFor="email" classNameName={styles.formlabel}>Email address</label>
    <input classNameName={styles.input}  type="email" value={email} onChange={handleChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" required />

  </div>
  <div classNameName={styles.mb3}>
    <label htmlFor="phone" classNameName={styles.formlabel}>Contact</label>
    <input classNameName={styles.input}  type="number" value={contact} onChange={handleChange} className="form-control" id="phone" name='phone' aria-describedby="emailHelp"required />

  </div>
  <div classNameName={styles.mb3}>
    <label htmlFor="desc" classNameName={styles.formlabel}>Textarea</label>
    <textarea classNameName={styles.input}  value={desc} onChange={handleChange} className="form-control is-invalid" id="desc"  name="desc" placeholder="Required example textarea" required />

  </div>

  <button type="submit" classNameName={styles.btn} >Submit</button>
</form>
    </div>
    </div>
  );
}

export default Contact;
