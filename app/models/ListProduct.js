function ListProduct() {
    this.mangSP = [];

    this.themSP = function (sp) {
        this.mangSP.push(sp);
    }

    this.timViTri = function (ma) {
        var viTri = -1;
        this.mangSP.map(function (sp, index) {
            if (sp.id === ma) {
                viTri = index;
            }
        });
        return viTri;
    }

    this.xoaSP = function (ma) {
        var viTri = this.timViTri(ma);
        if (viTri > -1) {
            this.mangSP.splice(viTri, 1);
        }
    }

    this.capnhapSP = function (id, sp) {
        var viTri = this.timViTri(id);
        if (viTri > -1) {
            this.mangSP[viTri] = sp;
        }
    }

    this.timKiem = function (tuKhoa) {
        var mangTK = [];
        // var tuKhoaThuong = tuKhoa.toLowerCase();
        if (tuKhoa == "All") {
            return this.mangSP;
        } else {
            this.mangSP.map(function (sp) {
                var viTriTK = sp.type.toLowerCase().indexOf(tuKhoa.toLowerCase());
                //viTriTK !== -1
                if (viTriTK > -1) {
                    //tìm thấy
                    mangTK.push(sp)
                }
            });
            return mangTK;
        }
    }
}