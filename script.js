//1. fetch 20 random users on page load
//2. filter user by gender
//3. filter user by name

const apiUrl = "https://randomuser.me/api/?";
const listElm = document.querySelector("#user-list");
let usrArgs = [];

const displayUsers = users => {
    console.log(users)
    document.getElementById("user-count").innerText = users.length;
    let str = "";

    users.map((user) => {

        str += `
        <div class = "col-md-6 col-lg-3 py-2">

            <div class="card " style="width: 18rem;">
                <img src="${user.picture.large}" class="card-img-top" alt="...">
                <h4 class="text-center py-3">
                    ${user.name.title} ${user.name.first} ${user.name.last} 
                </h4>
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>


                    <div>
                    <span class="fw-bold">Phone: </span> ${user.cell}
                </div>

                <div>
                    <span class="fw-bold">Email: </span> ${user.email}
                </div>

                <div>
                    <span class="fw-bold">City: </span> ${user.location.city}, ${user.location.country}
                </div>

                </div>

            </div>
        </div>
        `
    })

    listElm.innerHTML = str
};
const fetchUser = (params = "results=20") => {
    //fetch from api
    fetch(apiUrl + params).then((response)=>response.json())
    .then((data) => {
        
        usrArgs  = data.results;
        displayUsers(usrArgs);
    }).catch((error) => console.log(error));
}
fetchUser();


//for dropdown menu change
const handleOnChange = e => {
    const params = `results=20&gender=${e.value}`;
    fetchUser(params);
}

const handleOnSearch = e => {
    const str = e.value.toLowerCase();
    const filteredArgs = usrArgs.filter(item => {
        const userFullName = (item.name.first + " " + item.name.last).toLowerCase();
        if (userFullName.includes(str)){
            return item;
        }
    })

    displayUsers(filteredArgs);
    // console.log(e.value);
};




