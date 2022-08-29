var spService = new ManagerServive();
var dssp = new ListProduct();
var validation = new Validation();


function getPhone() {
    spService.getPhoneList().then(function (result) {
        dssp.mangSP = result.data;
        showPhone(result.data);
    }).catch(function (error) {
        console.log(error);
    });
}
getPhone();

function showPhone(mangPhone) {
    var content = "";
    mangPhone.map(function (phone) {
        content += `
            <tr>
                <td>${phone.id}</td>
                <td>${phone.name}</td>
                <td>${phone.price}</td>
                <td>
                <img style ="width: 200px; height: auto"; src="${phone.img}" alt="" />
                </td>
                <td>${phone.desc}</td>
                <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="phoneDetail('${phone.id}')">Xem</button>
                <button class="btn btn-danger" onclick="deletePhoneMain('${phone.id}')">Xóa</button>
                </td>
            </tr>
        `
    })
    document.querySelector("#tblDanhSachSP").innerHTML = content;
    console.log(dssp.mangSP);
}

function addPhoneMain() {
    var name = document.getElementById("TenSP").value;
    var price = document.getElementById("GiaSP").value;
    var screen = document.getElementById("ManHinh").value;
    var backCamera = document.getElementById("CamSau").value;
    var frontCamera = document.getElementById("CamTruoc").value;
    var img = document.getElementById("HinhSP").value;
    var desc = document.getElementById("moTaSP").value;
    var type = document.getElementById("loaiSP").value;
    if (checkValidation(name, price, screen, backCamera, frontCamera, img, desc)) {
        var sp = new ManagerSanpham(name, price, screen, backCamera, frontCamera, img, desc, type);
        dssp.themSP(sp);
        spService.addPhoneList(sp)
            .then(function (result) {
                getPhone();
                document.querySelector("#myModal .close").click();
            }).catch(function (error) {
                console.log(error);
            });
    }
}

function handleForm() {
    document.querySelector("#myModal .modal-footer").innerHTML = `
    <button class="btn btn-info" onclick="addPhoneMain()">Add</button>
    `
    var formELE = document.querySelectorAll("#myModal .form-control")
    for (let i = 0; i < formELE.length; i++) {
        formELE[i].value = "";
    }
    hideValidation();
}


document.querySelector("#btnThemSP").onclick = handleForm;

function deletePhoneMain(id) {
    dssp.xoaSP(id);
    spService.deletePhone(id).then(function (result) {
        getPhone();
    }).catch(function (error) {
        console.log(error)
    });
}

function phoneDetail(id) {
    hideValidation();
    spService.getPhoneDetail(id)
        .then(function (result) {
            document.getElementById("TenSP").value = result.data.name;
            document.getElementById("GiaSP").value = result.data.price;
            document.getElementById("ManHinh").value = result.data.screen;
            document.getElementById("CamSau").value = result.data.backCamera;
            document.getElementById("CamTruoc").value = result.data.frontCamera;
            document.getElementById("HinhSP").value = result.data.img;
            document.getElementById("moTaSP").value = result.data.desc;
            document.getElementById("loaiSP").value = result.data.type;

            document.querySelector("#myModal .modal-footer").innerHTML = `
        <button class="btn btn-info" onclick="updatePhoneMain('${result.data.id}')">Update</button>
        `
        }).catch(function (error) {
            console.log(error)
        })
}

function updatePhoneMain(id) {
    var name = document.getElementById("TenSP").value;
    var price = document.getElementById("GiaSP").value;
    var screen = document.getElementById("ManHinh").value;
    var backCamera = document.getElementById("CamSau").value;
    var frontCamera = document.getElementById("CamTruoc").value;
    var img = document.getElementById("HinhSP").value;
    var desc = document.getElementById("moTaSP").value;
    var type = document.getElementById("loaiSP").value;

    if (checkValidation(name, price, screen, backCamera, frontCamera, img, desc)) {
        var spUpdate = new ManagerSanpham(name, price, screen, backCamera, frontCamera, img, desc, type);
        dssp.capnhapSP(id, spUpdate);
        spService.updatePhone(id, spUpdate).then(function (result) {
            document.querySelector("#myModal .close").click();
            getPhone();
        }).catch(function (error) {
            console.log(error);
        });
    }
}

function checkValidation(name, price, screen, backCamera, frontCamera, img, desc) {
    var isValid = true;
    isValid &= validation.checkEmpty(name, "tbTenSP", "Tên sản phẩm không được để trống");
    isValid &= validation.checkEmpty(price, "tbGiaSP", "Giá sản phẩm không được để trống") && validation.checkNumber(price, "tbGiaSP", "Giá sản phẩm chỉ chứa ký tự số");
    isValid &= validation.checkEmpty(screen, "tbManHinh", "Kích thước màn hình không được để trống");
    isValid &= validation.checkEmpty(backCamera, "tbCamSau", "Thông số camera sau không được để trống");
    isValid &= validation.checkEmpty(frontCamera, "tbCamTruoc", "Thông số camera trước không được để trống");
    isValid &= validation.checkEmpty(img, "tbHinhSP", "Đường dẫn hình ảnh không được để trống") && validation.checkStyleURL(img, "tbHinhSP", "Cấu trúc đường dẫn không đúng");
    isValid &= validation.checkEmpty(desc, "tbmoTaSP", "Mô tả sản phẩm không được để trống");
    isValid &= validation.checkDropDown("loaiSP", "tbloaiSP", "Loại sản phẩm chưa được lựa chọn");
    return isValid;
}

function hideValidation() {
    var formELE = document.querySelectorAll("#myModal .sp-thongbao")
    for (let i = 0; i < formELE.length; i++) {
        formELE[i].style.display = "none";
    }
}