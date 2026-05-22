// import { useState } from "react"

// function DataBinding() {
//     const [name,setName] = useState('')
//     const [email,setEmail] = useState('')

//     console.log(name);
//     console.log(email);
//     console.log('rander');

//     let obj = {
//         name1: name,
//         email1: email
//     }
//     console.log(obj);
    
    
//     return(
//         <div>
//             <h3>Two way Data Binding</h3>
//             <p>Name: {name}</p>
//             <p>Email: {email}</p>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//             <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)}/>
//             <button>Submit</button>
//         </div>
//     )
// }
// export default DataBinding;