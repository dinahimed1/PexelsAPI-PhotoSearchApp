
// stores all selectors we will be using
const apikey = "563492ad6f91700001000001fd3a7ab7f87140248c72e7efbdc2adbd";
const input = document.querySelector("input");
const search_btn = document.querySelector(".search_btn");
const showmore_btn = document.querySelector(".showmore");

let page_num = 1;
let search_text = "";
let search = false;


// an event listener to store the input you want to search
input.addEventListener("input",(event)=>{
    event.preventDefault();
    search_text=event.target.value;
})

// function that displays default photos when you load the page for the first time
// 'https://api.pexels.com/v1/curated' enables you to recieve photos by Pixels
// '&per_page=10' sets the page to load 10 photos at a time
async function CuratedPhotos(page_num){
    // fetch the data from api
    // when we fetch data from API by using the fetch() method it returns a promise
    // we use the 'await' keyword to handle this promise
    // when the promise gets resolved we save the data in the response variable
    const data = await fetch(`https://api.pexels.com/v1/curated?page=${page_num}&per_page=10`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,     // use the apikey you have generated
        },
    });
    const response = await data.json();   // convert the response to json 
    console.log(response);

    display_images(response);   // call the display_images method to display the images on page
}

// function that displays all the photos fetched from the API
function display_images(response){
    // use forEach loop to iterate on each item of array
    response.photos.forEach((image) => {
        const photo = document.createElement("div"); // create a div to define image
        photo.innerHTML = `<img src=${image.src.large}>
        <figcaption> Photo By: ${image.photographer} 📸 </figcaption>`;
        document.querySelector(".display_images").appendChild(photo); // appends div in main display images div
    });
}

// button search the images based on users input
search_btn.addEventListener("click",()=>{
    if(input.value === "") { // alerts if user input text is empty
        alert("Please enter the some text")
        return;
    } // else it calleds cleargallery() method to clear the curated photos
    cleargallery(); 
    search = true;
    SearchPhotos(search_text,page_num); 
})

// function calls to search photos related to user input   
// query parameter is topic you want to search photos
// page_num parameter 
async function SearchPhotos(query, page_num){
    // this endpoint enables you to search Pexels for any topic 
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}&per_page=10`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        },
    });
    const response = await data.json();
    console.log(response);
    // after fetching data, call display images method to show photos on page
    display_images(response);
}

// function that removes all images from main div and reinitializes page_num to 1
function cleargallery(){
    document.querySelector(".display_images").innerHTML = "";
    page_num = 1;
}

// show more button gets more images on the page when clicked
// if we are not searching for any specific thing, increment page_num by one
// else, SearchPhotos() method is called
showmore_btn.addEventListener("click", () => {
    if(!search){  
        page_num++;
        CuratedPhotos(page_num);
    }
    else{
        if(search_text.value === "")
        return;
        page_num++;
        SearchPhotos(search_text,page_num);
    }
})

// calls the CuratedPhotos() function to start at exact reloading of the page 
CuratedPhotos(page_num);

