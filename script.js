// Template ini menggunakan REST Api The Meal DB
window.onload = function () {
  getKategori();
  getRandomFood();
  getFood("beef");
};
// Baca guide yang ada di
// https://docs.google.com/document/d/172svTmA86AyRK-wVwbIZMfo4JPGOL1-y9gJ4Na6EAg8/edit?usp=sharing

// Panduan disini hanya berupa arahan di bagian JavaScript
// maka dari itu, kamu harus membuat bagian HTML dan CSS sendiri

// Hint: Semua poin dapat dikerjakan dengan cara yang sama
//       pada saat sesi sebelumnya yang dapat kalian akses
//       di web PIBITI

// Note: Gunakan console.log() untuk melihat hasil dari data yang didapat
//       dari API untuk mengetahui pasti struktur data/objek yang didapat

// 1. Buatlah sebuah variabel bernama makananAcak
//    (hint: untuk menampung makanan acak yang didapat dari API)

let makananAcak;

// 2. Buatlah sebuah variabel bernama kategori berisi array kosong
//    (hint: untuk menampung kategori yang didapat dari API)
let kategori = [];

// 3. Buatlah sebuah variabel bernama makananKategori
//    (hint: untuk menampung makanan dari API berdasarkan kategori yang dipilih)
let makananKategori;

// 4. Buatlah sebuah fungsi yang memanggil API untuk mendapatkan makanan acak
//    - Gunakan fetch
//    - Gunakan async/await
//    - Masukkan hasil dari response ke variabel makananAcak
//    - Tampilkan makanan acak tersebut ke dalam DOM
async function getRandomFood() {
  let item = 0;
  let output = "";
  let rekomend1 = document.getElementById("best-food1");

  do {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    json_makananAcak = await response.json();
    makananAcak = json_makananAcak.meals;

    output += `
        <div class="card align-items-center border-0 k rounded mb-4" style="width: 20rem;" >

        <img src="${makananAcak[0]["strMealThumb"]}" style="width: 100%;border-bottom:0px solid black" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${makananAcak[0]["strMeal"]}</h5>
        </div>
        </div>
        `;
    item++;
  } while (item < 3);
  rekomend1.innerHTML = output;
}

// 5. Buatlah sebuah fungsi yang memanggil API untuk mendapatkan kategori makanan
//    - Gunakan fetch
//    - Gunakan async/await
//    - Masukkan hasil dari response ke variabel kategori
//    - Tampilkan kategori tersebut ke dalam DOM
async function getKategori() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  json_kategori = await response.json();
  kategori = json_kategori.categories;
  let ulKat = document.getElementById("list-kategori");
  let output = "";
  kategori.forEach((item) => {
    output += `
    <option value="${item.strCategory}">${item.strCategory}</option>
   `;
  });
  ulKat.innerHTML = output;
}

// 6. Buatlah sebuah fungsi yang memanggil API untuk mendapatkan makanan berdasarkan kategori
//    - Gunakan fetch
//    - Gunakan async/await
//    - Masukkan hasil dari response ke variabel makananKategori
//    - Tampilkan makanan tersebut ke dalam DOM
async function getFood(url) {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + url);
  json_food = await response.json();
  makananKategori = json_food.meals;
  let cardFood = document.querySelector("#list-food");
  let countFood = document.getElementById("count-food");

  countFood.innerHTML = "Show 1 - " + makananKategori.length + " Meal";
  let output = "";

  makananKategori.forEach((item) => {
    output += `
    <div  class="card-food card text-center col-md-3 align-items-center " style="width: 16rem; border-radius: 3%;">
    <img src="${item.strMealThumb}" class="card-img-top" alt="..." style="width: 100%; height: 200px" />
    <div class="card-body">
      <h5 class="card-title">${item.strMeal}</h5>
    </div>
    </div>

   `;
  });
  cardFood.innerHTML = output;
}

// 7. Buatlah sebuah event listener ketika <button> "Makanan Acak" diklik
//    - Panggil fungsi yang dibuat pada langkah 4
var btnRandom = document.querySelector(".btn-random");
btnRandom.addEventListener("click", function () {
  getRandomFood();
});

// 8. Buatlah sebuah event listener ketika <select> "Kategori" berubah
//    - Panggil fungsi yang dibuat pada langkah 5
var cbCat = document.querySelector("#list-kategori");
cbCat.addEventListener("change", function () {
  getFood(cbCat.value);
});
