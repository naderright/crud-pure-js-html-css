const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const create = document.getElementById('create');
const deleteAll = document.getElementById('deleteAll');

let mood = 'create';
let keyUpdate ;
//get total Price
const getTotal = () => {

    if (price.value) {
        const totalPrice = +price.value + +taxes.value + +ads.value;
        total.style.backgroundColor = 'green';
        total.innerHTML = totalPrice;
    }else{
        total.style.backgroundColor = '#ff0000d6';
    }

};

// create product
let products;
if (localStorage.products != null) {
    products = JSON.parse(localStorage.products);
} else {
     products=[];
};



create.onclick = ()=>{
    
    const newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        count:count.value,
        category:category.value,
        total:total.innerHTML,
    };

  if (title.value && price.value && category.value) {
    if (mood === 'create') {
        if (newProduct.count > 1 ) {
            for (let i = 0; i < newProduct.count; i++) {
             products.push(newProduct);           
            }
         
        } else {
         products.push(newProduct);
        };

    } else {
        products[keyUpdate] = newProduct;
        mood = 'create';
        create.innerHTML = 'create'
        count.style.display = 'block';
    }
    clearData();

  } 
  
    // products.push(newProduct);
    localStorage.setItem('products',JSON.stringify(products) );
    showData();
    // console.log(products)
};


// clear date

const clearData = ()=>{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
};



const showData = ()=>{
    getTotal();
    let table =``;
      products.map((product,key)=>{
        return table +=`<tr>
        <td>${key+1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick='update(${key})' type="submit">update</button></td>
        <td><button onclick='deletePro(${key})' type="submit">delete</button></td>
    </tr>`
    });
    document.getElementById('showData').innerHTML = table;

};
showData();


//delet product 

const deletePro = (key)=>{
    products.splice(key,1);
    localStorage.products = JSON.stringify(products);
    showData();
} ;
//

products.length?deleteAll.innerHTML=`<button onclick='deleteAllPro()' type="submit">Delete All</button>`
:deleteAll.innerHTML= ' ';

const deleteAllPro = ()=>{
    localStorage.clear();
    products.splice(0);
    showData();
};

//update

const update = (key)=>{
         title.value = products[key].title;
         price.value = products[key].price;
         taxes.value = products[key].taxes;
         ads.value = products[key].ads;
         category.value = products[key].category;
         mood = 'update';
         count.style.display = 'none';
         create.innerHTML = 'Update';
         scroll({
             top:0,
             behavior:'smooth'
         });
         getTotal();

         keyUpdate = key;
}

//search 


let search = document.getElementById('search');
let searchMood = 'title';

const getSearch = (id)=>{
    search.focus();
    search.placeholder = 'Search By '+id;
    if (id == 'category') {
        searchMood = 'category';
    } else {
        searchMood = 'title';
    };
    search.value = '';
    showData();
};


const searchPro = ()=>{
    let serachValue ;
        if (searchMood === 'title') {
             serachValue = products.filter((product)=>{
                return product.title.toLowerCase().includes(search.value.toLowerCase());
            });
            // console.log(searchTitle);
        } else {
             serachValue = products.filter((product)=>{
                return product.category.toLowerCase().includes(search.value.toLowerCase());
            });
            // console.log(searchCategory);
        };

        let table =``;
      serachValue.map((product,key)=>{
        return table +=`<tr>
        <td>${key+1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick='update(${key})' type="submit">update</button></td>
        <td><button onclick='deletePro(${key})' type="submit">delete</button></td>
    </tr>`
    });
    document.getElementById('showData').innerHTML = table;
}

