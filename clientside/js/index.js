async function getUsers() {
    const res=await fetch("http://localhost:3000/api/getusers");
    const users=await res.json();
    str=``;
    users.map((user)=>{
        str+=`
        <div class="card">
            <div class="image">
                <img src="http://localhost:3000/api/image/${user.imagename}" alt="">
            </div>
            <h1>${user.username}</h1>
            <p>${user.email}</p>
            <div class="buttons">
            <a href="./pages/edit.html?id=${user._id}"><img src="./img/edit_square_24dp_1306A7_FILL1_wght400_GRAD0_opsz24.png" alt=""></a>
           <img src="./img/delete_24dp_EA3323_FILL1_wght400_GRAD0_opsz24.png" alt="" onclick="deleteUser('${user._id}')"> 
        </div>
        </div>
        `
    })
    document.getElementById("cards").innerHTML=str;
}
getUsers();

async function deleteUser(id) {
    console.log(id);
    
    const res=await fetch(`http://localhost:3000/api/deleteuser/${id}`,
        {method:"DELETE"}
    )
    const result=await res.json();
    alert(result.msg)
    getUsers();
}