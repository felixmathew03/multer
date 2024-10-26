const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
let image;
async function getUser() {
    const res=await fetch(`http://localhost:3000/api/getuser/${id}`);
    const user=await res.json();
    image=user.image;
    document.getElementById("frm").innerHTML=`
    <label for="email">Email:</label>
            <input type="email" id="email" name="email" value=${user.email}>

            <label for="username">Username:</label>
            <input type="text" id="username" name="username" value=${user.username}>

            <label for="image">Profile Image:</label>
            <input type="file" id="image" name="file" >


            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" value=${user.phone}>

            <button type="submit">Submit</button>
    `;
}
getUser();
document.getElementById("frm").addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(document.getElementById("file"));
    const data=new FormData(e.target);
    
    // fetch("http://localhost:3000/api/edit",{
    //     method:"PUT",
    //     body:data
    // }).then(async(res)=>{
    //     const result=await res.json()
    //     alert(result.msg)
    //     window.location.href="../index.html"
    // }).catch((error)=>{
    //     console.log(error);
    // })
    
})