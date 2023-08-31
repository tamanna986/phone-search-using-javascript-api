const handler = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    phoneDisplay(phones, isShowAll);
}

const phoneDisplay = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // to restore  empty value before another search
    phoneContainer.textContent = '';

    // checking lenghts for search items to show over 12 and enabling disabled button
    btnShow = document.getElementById('btn-show');
    if (phones.length > 12 && !isShowAll) {
        btnShow.classList.remove('hidden')

    }
    else {
        btnShow.classList.add('hidden')
    }

    //   showing minimal result upto 12 items
    if (!isShowAll) {
        phones = phones.slice(0, 12);
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
        <button onclick = "DetailBtn('${phone.slug}')" class="btn btn-primary">Details</button>
      </div>
    </div>`;
        phoneContainer.appendChild(div);

    });
    toggler(false);

}
handler();

// button search
const search = (isShowAll) => {
    toggler(true);
    const searchfield = document.getElementById('input-field');
    const searchText = searchfield.value;
    // searchfield.value = '';
    handler(searchText, isShowAll);

}


// function for spinner
const toggler = (isloading) => {
    spin = document.getElementById('spin');
    if (isloading) {
        spin.classList.remove('hidden');
    }
    else {
        spin.classList.add('hidden');
    }
}


// show btn er kaj
const showAll = () => {
    search(true);
}

const DetailBtn = async (id) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await (await res).json();
    // console.log('bkjdghfk', data)
    const phoneDetail = data.data;
    console.log('this is tesy', phoneDetail)
    modal(phoneDetail);

}

const modal = (phoneDetail) => {
    showDetailModal.showModal();

    const detailContainer = document.getElementById('detail-container');

    // to remove previous result
    detailContainer.textContent = '';
    const div = document.createElement('div');
    div.classList = `space-y-4`;
    div.innerHTML = `<div class="bg-gray-100 m-6 flex justify-center">
    <img class="p-20" src="${phoneDetail.image}" alt="">
    </div>
    <h1 class="text-3xl">${phoneDetail.name}</h1>
    <p class="text-gray-400">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p><span class = "font-bold">Storage</span>: ${phoneDetail?.mainFeatures?.storage}</p>
    <p><span class = "font-bold">Display Size</span>: ${phoneDetail?.mainFeatures?.displaySize}</p>
    <p><span class = "font-bold">Chipset</span>: ${phoneDetail?.mainFeatures?.chipSet}</p>
    <p><span class = "font-bold">Memory</span>: ${phoneDetail?.mainFeatures?.memory}</p>
    <p><span class = "font-bold">Slug</span>: ${phoneDetail?.slug}</p>
    <p><span class = "font-bold">Release data </span>: ${phoneDetail?.releaseDate}</p>
    <p><span class = "font-bold">Brand </span>: ${phoneDetail?.brand}
    </p>
    <p><span class = "font-bold">GPS </span>: ${phoneDetail?.others?.GPS}</p>`;
    
    
    
    
    detailContainer.appendChild(div);
   


    
     
    
}


handler();