function ListCart() {
    this.mangCart = [];

    this.timViTri = function (ma) {
        var viTri = -1;
        this.mangCart.map(function (sp, index) {
            if (sp.id === ma) {
                viTri = index;
            }
        });
        return viTri;
    }

    this.checkID = function (ma) {
        var isExist = false;
        isExist = this.mangCart.some(function (sp) {
            return sp.id === ma.replaceAll(" ","");
        });
        if (isExist) {
            return false;
        }else{
            return true;
        }
    }

    this.addCart = function (sp) {
        this.mangCart.push(sp);
    }

    this.removeCard = function (ma) {
        var viTri = this.timViTri(ma);
        if (viTri > -1) {
            this.mangCart.splice(viTri, 1);
        }
    }

    this.clearCard = function () {
            this.mangCart = [];
    }

    this.updateAmount = function (sp) {
        var viTri = this.timViTri(sp.id);
        if (viTri > -1) {
            this.mangCart[viTri] = sp;
        }
    }
    
}