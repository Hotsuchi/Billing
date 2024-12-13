let themeArr = [
    {
        text : 'rgba(0,0,0,1)',
        background : 'rgba(255,255,255,.9)',
        button : 'indigo',
    },
    {
        text : 'rgba(255,255,255,1)',
        background : 'rgba(11,33,66,1)',
        button : 'rgba(11,33,150,1)',
    },
    {
        text: 'rgba(255,255,255,1)',
        background: 'rgba(0,0,0,1)',
        button: 'rgba(11,33,150,1)',
    },
    {
        text: 'rgba(255,255,255,1)',
        background: 'rgba(4,93,93,1)',
        button: 'indigo',
    },
];
let body = document.querySelector('body');
let theme = document.querySelector('.theme');
let btn = document.getElementsByTagName('button');
let themeList = ()=>{
    (theme.style.right == '-5rem') ? theme.style.right='0':theme.style.right='-5rem';
    let newVal = '';
    themeArr.map((v,i)=>{
        newVal += `<div class="box" style='background:${v.background}' onclick='themeFun(${i})'><h2 style='color:${v.text}'>A</h2></div>`;
    })
    theme.innerHTML = newVal;
}
let themeFun = (val)=>{
    body.style=`background:${themeArr[val].background};
                color:${themeArr[val].text}`;
    
    for(i=0;i<btn.length;i++){
        btn[i].style=`background:${themeArr[val].button};
                      color:white`;
    }
}


let addProject = document.querySelector('.add-project');
let showAddProject = ()=>{addProject.style='left:0';}
let hideAddProject = ()=>{addProject.style='left:100%';}
//============ADD New Project=============
let projectFormSubmit = (e)=>{
    e.preventDefault();
    let ls = JSON.parse(localStorage.getItem('pro-list')) ?? [];                      
    ls.push({
        project_name : e.target.project_name.value,
        company_name : e.target.company_name.value || 'Tk furniture',
        category : e.target.category.value || 'Furniture',
        phone : e.target.phone_no.value || '8617787947',
        pay : e.target.pay.value || 0,
        item : [],
    });
    localStorage.setItem('pro-list',JSON.stringify(ls));
    e.target.reset();
    updateList();
    hideAddProject();
}
let projectForm = document.querySelector('#project-form');
projectForm.addEventListener('submit',projectFormSubmit);
//==========Project LIST Show=============
let list = document.querySelector('.list');
let updateList = ()=>{
    let ls = JSON.parse(localStorage.getItem('pro-list')) ?? [];       
    let newList = '';
    ls.map((v,i)=>{
        newList += `<li>
                       <p>${v.project_name}</p>
                       <span>
                           <i class="fa-regular fa-eye" onclick="billFun(${i})"></i>
                           <i class="fa-regular fa-pen-to-square" onclick="showAddItem()"></i>
                           <i class="fa-solid fa-trash-can" onclick="deleteList(${i})"></i>
                       </span>
                   </li>`;
    })
    list.innerHTML = newList;
}
updateList();
let deleteList = (val)=>{
    let ls = JSON.parse(localStorage.getItem('pro-list'));
    ls.splice(val,1);
    localStorage.setItem('pro-list',JSON.stringify(ls));
    alert('deleted');
    updateList();
}
//===========BILL Function============={
let bill = document.querySelector('.bill');
let billInfo = document.querySelector('.bill-info');
let tbody = document.querySelector('.tbody');
let tfoot = document.querySelector('.tfoot');
let billFun = (val)=>{
    let ls = JSON.parse(localStorage.getItem('pro-list'));
    bill.style = 'left:0';
    billInfo.innerHTML = `<h2>${ls[val].project_name}</h2>
                      <h4>${ls[val].company_name}</h4>
                      <h4>${ls[val].category}</h4>
                      <h4>${ls[val].phone}</h4>`;
    
    let total = 0;
    let newItems = '';
    ls[val].item.map((v,i)=>{
        total += (v.width*v.height)*v.rate*v.qty;
        newItems += `<tr>
                            <td>${v.item_name}</td>
                            <td>${v.rate}</td>
                            <td>${v.width}</td>
                            <td>${v.height}</td>
                            <td>${v.width * v.height}</td>
                            <td>${v.qty}</td>
                            <td>${(v.width*v.height)*v.rate*v.qty}/-</td>
                        </tr>`;
    })                 
    tbody.innerHTML = newItems;
    
    tfoot.innerHTML = `<tr>
                            <td colspan="2" rowspan="3">description</td>
                            <td colspan="2">total:</td>
                            <td colspan="3">${total}/-</td>
                        </tr> 
                        <tr>
                            <td colspan="2">pay:</td>
                            <td colspan ="3"> ${ls[val].pay}/-</td> 
                        </tr> 
                        <tr>
                            <td colspan="2">balance:</td> 
                            <td colspan ="3"> ${total-ls[val].pay}/-</td>
                        </tr> 
                        <tr>
                            <td colspan="7">
                                <button onclick="showAddItem(${val})">add</button>
                                <button onclick="window.print()">print</button>
                            </td> 
                        </tr>`;

}
let hideBill = ()=>{bill.style='left:100%';}
//==============ITEM FORM====================
let addItem = document.querySelector('.add-item');
let showAddItem = (val) => {
    let ls = JSON.parse(localStorage.getItem('pro-list'));
    addItem.style = 'left:0';
    addItem.innerHTML=`<h2>item form</h2>
                    <table border="2">
                        <tr>
                           <td>item name:</td>
                           <td colspan="3"><input type="text" class="item_name" required></td> 
                        </tr>
                        <tr>
                            <td>width:</td>
                            <td><input type="number" class="width" required></td>
                            <td>height:</td>
                            <td><input type="number" class="height" required></td>
                        </tr>
                        <tr>
                            <td>rate:</td>
                            <td><input type="number" class="rate" placeholder="300"></td>
                            <td>qty:</td>
                            <td><input type="number" class="qty" placeholder="1"></td>
                        </tr>
                        <tr>
                            <td colspan="4"><button onclick="addItemFun(${val})">add item</button></td>
                        </tr>
                    </table>
                <button style="margin-top: 2rem" onclick="hideAddItem()">back</button>`;
}
let hideAddItem = () => { addItem.style = 'left:100%'; }
//===============ITEM Add Function==============
let addItemFun = (val)=>{
    hideBill();
    let itemName = document.querySelector('.item_name');
    let width = document.querySelector('.width');
    let height = document.querySelector('.height');
    let rate = document.querySelector('.rate');
    let qty = document.querySelector('.qty');
    
    let ls = JSON.parse(localStorage.getItem('pro-list')) ?? [];  
    if( (itemName.value.length >= 1 && width.value.length >= 1 && height.value.length >= 1) ){
        ls[val].item.push({
            item_name: itemName.value,
            width: width.value,
            height: height.value,
            rate: rate.value || 300,
            qty: qty.value || 1,
        });
        
        localStorage.setItem('pro-list', JSON.stringify(ls));
        itemName.value = '';
        width.value = '';
        height.value = '';
        rate.value = '';
        qty.value = '';
        hideAddItem();
        billFun(val);
        alert('item added');
    }else{
        alert('plase inset value first');
    }
}




