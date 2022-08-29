var spService = new ManagerServive();
var dssp = new ListProduct();
var dscart = new ListCart();
var checkAmount = 0;

//getElementById("tenID")
function getELE(id) {
    return document.getElementById(id);
}

function setLocalStorage() {
    localStorage.setItem("DSSPM", JSON.stringify(dscart.mangCart));
}

function getLocalStorage() {
    if (localStorage.getItem("DSSPM") != undefined) {
        dscart.mangCart = JSON.parse(localStorage.getItem("DSSPM"));
    }
    showCart(dscart.mangCart);
}

getLocalStorage();

function getProductList() {
    spService.getPhoneList().then(function (result) {
        // print product
        showProduct(result.data);
        dssp.mangSP = result.data;
    }).catch(function (error) {
        console.log(error);
    })
}

getProductList();

function showProduct(mangSP) {
    var content = "";
    mangSP.map(function (sp) {
        content += `
            <div class="productItem col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <div class="card">
                    <div class="card-body p-2">
                        <img src="${sp.img}" class="card-img-top" alt="...">
                        <h5 class="card-title my-2 text-center">${sp.name}</h5>
                        <div class="d-flex justify-content-around align-items-center">
                            <h4 class="my-2 text-danger">$${sp.price}</h4>
                            <div class="bt-change">
                                ${btnBuy(sp.id)}
                            </div>
                        </div>
                        <div class="card-info">
                            <p class="card-text text-muted pt-2 mb-1 small">${sp.desc}</p>
                            <div class="d-inline-block small">
                            <span class="d-block">Màn hình: ${sp.screen}</span>
                            <span class="d-block">Camera sau: ${sp.backCamera}</span>
                            <span class="d-block">Camera trước: ${sp.frontCamera}</span>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
        `
    });
    getELE("listProducts").innerHTML = content;

}

function timKiemTheoLoai() {
    var tuKhoa = getELE("loaiSP").value;
    var mangSP = dssp.timKiem(tuKhoa.trim());
    showProduct(mangSP);
}

getELE("loaiSP").onclick = timKiemTheoLoai;

function showCart(mangCart) {
    var content = "";
    var totalMoney = 0;
    var totalAmount = 0;
    mangCart.map(function (sp) {
        content += `
            <div class="list-group-item-action border-bottom p-3" aria-current="true">
                <div class="row text-center align-items-center">
                    <div class="col">
                        <img class="img-fluid" src="${sp.img}" alt="hinh anh">
                    </div>
                    <div class="col">${sp.name}</div>
                    <div class="col amountCard">
                        ${btnAmount(sp.id, sp.amount)}
                    </div>
                    <div class="col">$${sp.tottalPrice}</div>
                    <div class="col">
                        <button class="btn shadow-none" onclick="removeCardItem('${sp.id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
        totalMoney += sp.tottalPrice;
        totalAmount += sp.amount;
    });
    checkAmount = totalAmount;
    // console.log(totalAmount);
    getELE("showCart").innerHTML = content;
    getELE("tongTien").innerHTML = "Tổng tiền: $" + totalMoney;
    if (totalAmount > 0) {
        getELE("amountCart").innerHTML = totalAmount;
        getELE("amountCart").style.cssText = `display: block!important;`;
    }
    else {
        getELE("amountCart").style.display = "none";
    }
}

function addCartItem(id) {
    if (dscart.checkID(id)) {
        var viTri = dssp.timViTri(id);
        var sp = new Cart(id, dssp.mangSP[viTri].img, dssp.mangSP[viTri].name, 1, dssp.mangSP[viTri].price);
        sp.calTottalPrice();
        dscart.addCart(sp);
        showCart(dscart.mangCart);
        setLocalStorage();
    }
    updateAmountItem(id, 0);
}

function removeCardItem(id) {
    var selectorbtn = document.getElementsByClassName("bt-change");
    for (var el of selectorbtn) {
        var idItem = el.children[0].value;
        if (idItem == id) {
            el.innerHTML = btnBuy(id);
        }
    }
    dscart.removeCard(id);
    showCart(dscart.mangCart);
    setLocalStorage();
}

function clearCardItem() {
    var selectorbtn = document.getElementsByClassName("bt-change");
    for (var el of selectorbtn) {
        var idItem = el.children[0].value;
        el.innerHTML = btnBuy(idItem);
    }
    checkAmount = 0;
    dscart.clearCard();
    showCart(dscart.mangCart);
    setLocalStorage();

}

function updateAmountItem(id, value) {
    var viTri = dscart.timViTri(id);
    var total = dscart.mangCart[viTri].amount + Number(value);
    if (total > 0) {
        var sp = new Cart(id, dscart.mangCart[viTri].img, dscart.mangCart[viTri].name, total, dscart.mangCart[viTri].price);
        sp.calTottalPrice();
        dscart.updateAmount(sp);
    }
    else {
        dscart.removeCard(id);
    }
    var selectorbtn = document.getElementsByClassName("bt-change");
    for (var el of selectorbtn) {
        var idItem = el.children[0].value;
        if (idItem == id) {
            if (total > 0) {
                el.innerHTML = btnAmount(id, total);
            }
            else {
                el.innerHTML = btnBuy(id);
            }
        }
    }
    showCart(dscart.mangCart);
    setLocalStorage();
}

function btnAmount(id, amount) {
    return `<button class="btn btn-outline-info shadow-none" value="${id}" onclick="updateAmountItem('${id}', '-1')"><i class="fa-solid fa-angle-left"></i></button>
            <span>${amount}</span>    
            <button class="btn btn-outline-info shadow-none" onclick="updateAmountItem('${id}', '1')"><i class="fa-solid fa-angle-right"></i></button>`;
}

function btnBuy(id) {
    return `<button class="btn btn-warning" value="${id}" onclick="addCartItem('${id}')">Mua ngay</button>`;
}

function contentOder(mangCart) {
    var content = "";
    var ctProduce = "";
    var ctPrice = "";
    var moneyOder = 0;
    mangCart.map(function (sp, index) {
        ctProduce += `<span>${sp.amount} x ${sp.name} </span>`;
        ctPrice += index == 0 ? `<span>$${sp.tottalPrice}</span>` : `+<span>$${sp.tottalPrice}</span>`;
        moneyOder += sp.tottalPrice;
    });
    content = `
        <div class="d-flex justify-content-between py-2">
            <div class="d-flex flex-column justify-content-between h6">
                ${ctProduce} 
            </div>
            <div class="d-flex flex-column h6">
                ${ctPrice}
            </div>
            </div> 
            <p class="font-weight-bold border-top border-danger h5 py-2">Thanh toán</p>
            <div class="d-flex justify-content-between">
                <span class="h5">Tổng tiền</span>
                <span id="moneyOder" class="h5">$${moneyOder}</span>
        </div>
    `;
    getELE("contentOder").innerHTML = content;
}

function showOder(level) {
    if (level) {
        if (checkAmount > 0) {
            contentOder(dscart.mangCart);
            $('#Modal1').modal('hide'); // document.querySelector("#Modal1 .close").click();
            $('#Modal2').modal('show');
        }
    }
    else {
        $('#Modal2').modal('hide');
        $('#Modal1').modal('show');
    }
}

function showInfoOder() {
    clearCardItem();
    getELE("idOder").innerHTML = getRndInteger(100, 999);
    getELE("moneyPay").innerHTML = getELE("moneyOder").innerHTML;
    $('#Modal2').modal('hide');
    $('#Modal3').modal('show');
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




