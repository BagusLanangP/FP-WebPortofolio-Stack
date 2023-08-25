// Dark Theme
var icon = document.getElementById("checkbox");

checkbox.onclick = function(){
  document.body.classList.toggle("dark-theme")
}


// Scroll Efek
window.addEventListener("scroll", muncul);

// fungsi untuk memberikan efek elemen muncul ketika scroll
function muncul() {
  // menangkap setiap tag dengan class elemen
  let elements = document.querySelectorAll(".elemen");
  //perulangan untuk setiap tag dengan class elemen
  for (let i = 0; i < elements.length; i++) {
    //   mengambil ukuran tinggi layar
    let tinggiLayar = window.innerHeight;
    //menangkap ukuran elemen dan posisinya relatif terhadap viewport
    let jarakAtasElemen = elements[i].getBoundingClientRect().top;
    // menentukan ukuran scroll untuk memunculkan elemen
    let ukuranScroll = 150;
    // jika jarak atas elemen kurang dari tinggi layar dikurangi ukuran scroll maka tambahkan class tampil di setiap tag dengan class elemen
    if (jarakAtasElemen < tinggiLayar - ukuranScroll) {
      elements[i].classList.add("tampil");
    }
    // jika tidak maka hapus class tampil
    else {
      elements[i].classList.remove("tampil");
    }
  }
}



const UsrImg = document.getElementById('UsrImg');
const commentsContainer = document.getElementById('comments');
const nextCommentBtn = document.getElementById('nextCommentBtn');
let currentIndex = 0;
let IndexNow = 0;
let ProfileImg = [];
let commentsData = [];

const fetchImg = async () => {
    const endpoint = "https://randomuser.me/api/?results=24";
    const response = await fetch(endpoint);
    const data = await response.json();
    ProfileImg = data.results;
    fetchComments(); // Fetch comments after fetching images
};

const fetchComments = async () => {
    const endpoint = "https://dummyjson.com/comments";
    const response = await fetch(endpoint);
    const data = await response.json();
    commentsData = data.comments;
    showPict();
};

const showPict = () => {
    if (IndexNow < ProfileImg.length) {
        const pict = ProfileImg[IndexNow];
        const imgHtml = `
            <div class="UsrImg">
                <img src="${pict.picture.large}" class="card-img-top"/>
            </div>
        `;
        UsrImg.innerHTML = imgHtml;
        IndexNow++;
    } else {
        UsrImg.innerHTML = 'No more comments.';
        nextCommentBtn.disabled = true;
    }
};



const showComment = () => {
    if (currentIndex < commentsData.length) {
        const comment = commentsData[currentIndex];
        const commentHTML = `
            <div class="comment">
                <h5 class="card-title">${comment.user.username}</h5>
                <p class="card-text">${comment.body}</p>
            </div>
        `;
        commentsContainer.innerHTML = commentHTML;
        currentIndex++;
    } else {
        commentsContainer.innerHTML = 'No more comments.';
        nextCommentBtn.disabled = true;
    }
};

nextCommentBtn.addEventListener('click', () => {
    showPict();
    showComment();
});

fetchImg(); // Fetch images and then fetch comments



