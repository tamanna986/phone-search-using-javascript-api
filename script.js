const handler = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    phoneDisplay(phones, isShowAll);
}

const phoneDisplay = (phones,isShowAll) =>{
   const phoneContainer = document.getElementById('phone-container');
       // to restore  empty value before another search
       phoneContainer.textContent = '';

          // checking lenghts for search items to show over 12 and enabling disabled button
          btnShow = document.getElementById('btn-show');
          if(phones.length>12 && !isShowAll){
              btnShow.classList.remove('hidden')
              
          }
          else{
            btnShow.classList.add('hidden')
          }

        //   showing minimal result upto 12 items
        if(!isShowAll){
            phones = phones.slice(0,12);
        }
       

   phones.forEach(phone => {
    // console.log(phone);

    const div = document.createElement('div');
    div.classList = `card bg-base-100 shadow-xl`;
    div.innerHTML = `<div class = "bg-gray-100 m-4">
    <figure><img class = "m-12" src="${phone.image}" /></figure>
    </div>
    <div class="card-body items-center">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p class = "text-gray-500">There are many variations of passages of available, but the majority have suffered</p>
      <p class = "text-xl font-semibold">$999</p>
      <div class="card-actions justify-center">
        <button class="btn btn-primary">Details</button>
      </div>
    </div>`;
    phoneContainer.appendChild(div);

   });
   toggler(false);

}
handler();

// button search
const search = (isShowAll) =>{
    toggler(true);
    const searchfield = document.getElementById('input-field');
    const searchText = searchfield.value;
    // searchfield.value = '';
    handler(searchText, isShowAll);

}


// function for spinner
const toggler = (isloading) =>{
    spin = document.getElementById('spin');
    if(isloading){
        spin.classList.remove('hidden');
    }
    else{
        spin.classList.add('hidden');
    }
}


// show btn er kaj
const showAll = () =>{
    search(true);
}