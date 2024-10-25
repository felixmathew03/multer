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

            <div class="pro">
                <img src="http://localhost:3000/api/image/${user.image.filename}" alt="" id="pro">
            </div>

            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" value=${user.phone}>

            <button type="submit">Submit</button>
    `;
}
getUser();