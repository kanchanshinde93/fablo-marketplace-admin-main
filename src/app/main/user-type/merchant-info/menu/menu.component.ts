import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, Navigation } from '@angular/router';
import { AdminServiceService } from 'app/Services/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://your-url.com';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });

  private tempData = [];
  private tempData1 = [];
  private tempData2 = [];
  public kitchenSinkRows: any;
  public kitchenSinkRows1: any;
  public kitchenSinkRows2: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  private exportCSVData: [] | any;
  outletData: any;

  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  cols = [{ name: 'name' }, { name: 'minSelection' }, { name: 'maxSelection' }, { name: 'Actions' }];
  modalRef: NgbModalRef;
  addCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
  addProductForm: FormGroup;
  editProductForm: FormGroup;
  addCustomizationForm: FormGroup;
  editCustomizationForm: FormGroup;
  addVariantForm: FormGroup;
  editVariantForm: FormGroup;
  editAddonForm: FormGroup;
  addAddonForm: FormGroup;
  editAddonProductForm: FormGroup;
  Submitted: Boolean = false;
  rows: any;
  rows1: any;
  rows2: any;
  data = [];
  filteredData1 = [];
  filteredData = [];
  filteredData2 = [];
  formula: string = 'CustomizationList';
  loading:Boolean = false;
  categoryList: any;
  showSubcat: Boolean = false
  showProd: Boolean = false;
  categoryData: any;
  subCategoryList: any;
  productList: any;
  subCategoryData: any;
  productById: any;
  product: any;
  isAvailable: any;
  customizationById: any;
  customizationList: any;
  viewVariation: any;
  variant: any;
  custom: any;
  editVariation: any;
  editVariantByid: any;
  outletAddon: any;
  productAddon: any;
  outletAddonList: any;
  ediAddons: any;
  producAddonList: any;
  addonCategory: any;
  editAddonProduct: any;
  unLink: any;
  link: any;
  editCatgory: any;
  selectedImage: any;
  imageURL = [];
  prodBySub: any;
  productEdit: any;
  vegCheck: any;
  nonVegCheck: any;
  checkveg: any;
  newImage: any;
  previousImage: any;
  deleteCategoryByID: any;
  deleteProductById:any;
  constructor(private modalService: NgbModal, private router: Router, private toastr: ToastrService, private fb: FormBuilder, private adminService: AdminServiceService) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.outlet) {
      this.outletData = nav.extras.state.outlet;
    }
    else {
      this.router.navigate(["/outletInfo/outlet"]);
    }
  }

  public contentHeader: object

  ngOnInit(): void {
    this.allCategory();
    // add product category form
    this.addCategoryForm = this.fb.group({
      categoryName: new FormControl('', [Validators.required])
    });

    // edit category form
    this.editCategoryForm = this.fb.group({
      categoryName: new FormControl('', [Validators.required])
    });

    // add product form
    this.addProductForm = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      productImage: new FormControl('', [Validators.required]),
      productPrice: new FormControl('', [Validators.required]),
      productDesc: new FormControl('', [Validators.required]),
      isVeg: new FormControl('')
    });

    // edit product form
    this.editProductForm = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      productImage: new FormControl(''),
      productPrice: new FormControl('', [Validators.required]),
      productDesc: new FormControl('', [Validators.required]),
      isVeg: new FormControl('')
    });

    // add variation in customization form
    this.addCustomizationForm = this.fb.group({
      variationName: new FormControl('', [Validators.required])
    });

    // edit customization form
    this.editCustomizationForm = this.fb.group({
      variationName: new FormControl('', [Validators.required]),
      minSelection: new FormControl('', [Validators.required]),
      maxSelection: new FormControl('', [Validators.required])
    });

    // add variant form
    this.addVariantForm = this.fb.group({
      variantName: new FormControl('', [Validators.required]),
      variantPrice: new FormControl('', [Validators.required])
    });

    // edit variant form
    this.editVariantForm = this.fb.group({
      variantName: new FormControl('', [Validators.required]),
      variantPrice: new FormControl('', [Validators.required])
    });

    // edit addon category form
    this.editAddonForm = this.fb.group({
      categoryName: new FormControl('', [Validators.required]),
      minSelection: new FormControl('', [Validators.required]),
      maxSelection: new FormControl('', [Validators.required])
    });

    // add addon category form
    this.addAddonForm = this.fb.group({
      categoryName: new FormControl('', [Validators.required]),
      minSelection: new FormControl('', [Validators.required]),
      maxSelection: new FormControl('', [Validators.required])
    });

    // edit addon product form
    this.editAddonProductForm = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      productPrice: new FormControl('', [Validators.required])
    })
    this.contentHeader = {
      headerTitle: 'Menu',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/dashboard/home'
          },
          // {
          //   name: 'Users',
          //   isLink: true,
          //   link: '/userType/users'
          // },
          // {
          //   name: 'Merchant',
          //   isLink: true,
          //   link: '/userType/merchant'
          // },
          {
            name: 'Outlet',
            isLink: true,
            link: '/outletInfo/outlet'
          },
          // {
          //   name: 'Outlet Details',
          //   isLink: true,
          //   link: '/outletInfo/outletDetails'
          // },
          {
            name: 'Menu',
            isLink: false
          }
        ]
      }
    }
  }

  get addCategory() {
    return this.addCategoryForm.controls;
  }

  get eCategory() {
    return this.editCategoryForm.controls;
  }

  get aproduct() {
    return this.addProductForm.controls;
  }

  get eproduct() {
    return this.editProductForm.controls;
  }
  get avariation() {
    return this.addCustomizationForm.controls;
  }

  get evariation() {
    return this.editCustomizationForm.controls;
  }

  get avariant() {
    return this.addVariantForm.controls;
  }

  get evariant() {
    return this.editVariantForm.controls;
  }

  get eAddonC() {
    return this.editAddonForm.controls;
  }

  get aAddonC() {
    return this.addAddonForm.controls;
  }

  get eAddonP() {
    return this.editAddonProductForm.controls;
  }

  // open add product category / subcategory Modal
  openAddCategoryModal(data: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'md'
    });
  }

  // open edit category / subcategory Modal
  openEditCategoryModal(data: any, category: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'md'
    });
    this.editCatgory = category;
    this.editCategoryForm.patchValue({
      categoryName: category.categoryName
    })
  }

  // opne add product Modal
  openAddProductModal(data: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'lg'
    })
  }

  // open edit product Modal
  openEditProductModal(data: any, productEdit: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
    this.productEdit = productEdit;
    this.previousImage = productEdit.productImage 
   
    this.editProductForm.patchValue({
      productName: productEdit.productName,
      productDesc: productEdit.productDesc,
      productPrice: productEdit.productPrice,
      isVeg: productEdit.isVeg
    });
  }
  
  

  changeImage(event:any){
    this.newImage = event.target.files[0];
  }

  editProductFormSubmit(){
    this.Submitted = true;
    this.loading = true;
    if(this.editProductForm.invalid){
      return;
    }else{
      this.checkveg = JSON.parse(this.editProductForm.value.isVeg)
      const formData = new FormData();
      formData.append("productName", this.editProductForm.value.productName);
      formData.append("productPrice", this.editProductForm.value.productPrice);
      formData.append("productDesc", this.editProductForm.value.productDesc);
      formData.append("isVeg",this.checkveg);
      if (this.newImage == undefined) {
        formData.append("productImage", this.previousImage)
      }
      else {
        formData.append("productImage", this.newImage);
      }
      this.adminService.editProductById(this.productEdit.productId,formData).subscribe((res:any)=>{
        if(res.status){
          this.getProductBySubId(this.prodBySub);
          this.toastr.success(res.message,"Success!");
          this.loading = false;
          this.modalRef.close();
        }else{
          this.toastr.error(res.message,"error!");
          this.getProductBySubId(this.prodBySub);
        }
      })
    }
  }
  addCategoryFormSubmit() {
    this.Submitted = true;
    this.loading = true;
    if (this.addCategoryForm.invalid) {
      return;
    } else {
      const formData = {
        outletId: this.outletData.outletId,
        categoryName: this.addCategoryForm.value.categoryName,
        parentCategoryId: this.categoryData?.categoryId ?? ""
      }
      this.adminService.addCategory(formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message, "Success!");
          this.allCategory();
          this.subCategoryById();
          this.loading = false;
          this.Submitted = false;
          this.modalRef.close();
          this.addCategoryForm.reset();
        } else {
          this.toastr.error(res.message, "error!");
          this.allCategory();
          this.subCategoryById();
        }
      })
    }
  }

  editCategoryFormSubmit() {
    this.Submitted = true;
    this.loading = true;
    if (this.editCategoryForm.invalid) {
      return;
    } else {
      const formData = {
        categoryId: this.editCatgory.categoryId,
        categoryName: this.editCategoryForm.value.categoryName
      }
      this.adminService.editCategory(formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message, "Success!");
          this.loading = false;
          this.Submitted = false;
          this.modalRef.close();
          this.allCategory();
          this.subCategoryById();
        } else {
          this.toastr.error(res.message, "error!");
          this.subCategoryById();
          this.allCategory();
        }
      })
    }
  }

  SelectImage(event: any) {
    this.selectedImage = event.target.files[0]

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL.push(event.target.result);
      this.addProductForm.patchValue({
        fileSource: this.imageURL,
      });

    };
    reader.readAsDataURL(event.target.files[0]);
  }



  allCategory() {
    this.adminService.getAllCategory(this.outletData?.outletId).subscribe((data: any) => {
      this.categoryList = data.items;
    });
  }

  subCategory(category: any) {
    this.categoryData = category;
    if (this.categoryData.hasSubCategory) {
      this.subCategoryById();
      this.showProd = false;
    }

    if (this.categoryData.hasProduct) {
      this.getProductBySubId(this.categoryData);
      this.showSubcat = false;
    }

    if (!this.categoryData.hasSubCategory && !this.categoryData.hasProduct) {
      this.showSubcat = true;
      this.showProd = true;
      this.subCategoryById();
      this.getProductBySubId(this.categoryData);
    }

  }

  subCategoryById() {
    this.adminService.getSubCategory(this.categoryData?.categoryId).subscribe((data: any) => {
      this.subCategoryList = data.items;
    });
    this.showSubcat = true;
  }

  getProductBySubId(subCategory: any) {
    this.prodBySub = subCategory;
    this.productById = subCategory.categoryId;

    this.adminService.getProduct(this.productById).subscribe((data: any) => {
      this.productList = data.items;
    });
    this.showProd = true;

  }

  addProductFormSubmit() {
    this.Submitted = true;
    this.loading = true;
    if (this.addProductForm.invalid) {
      return
    } else {
      const formData = new FormData();
      formData.append('parentCategoryId', this.productById ?? this.categoryData.categoryId);
      formData.append('productName', this.addProductForm.value.productName);
      formData.append('productImage', this.selectedImage);
      formData.append('productPrice', this.addProductForm.value.productPrice);
      formData.append('isVeg', JSON.parse(this.addProductForm.value.isVeg));
      formData.append('productDesc', this.addProductForm.value.productDesc);

      this.adminService.addProduct(formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message, "Success!");
          this.modalRef.close();
          this.loading = false;
          this.Submitted = false;
          this.addProductForm.reset();
          this.imageURL.splice(0, this.imageURL.length);
          this.getProductBySubId(this.prodBySub);
        } else {
          this.toastr.error(res.message, "error!");
          this.getProductBySubId(this.prodBySub);
        }
      })
    }
  }

  // open view product details Modal
  modalProductView(data: any, product: any) {
    product.outletId = this.outletData.outletId
    this.modalService.open(data, {
      windowClass: 'modal right'
    });
    this.product = product;
  }

  // chnage stock status
  changeStockStatus(inStock: any) {
    this.isAvailable = inStock;

    this.adminService.chnageStockStatus(this.isAvailable.productId).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success(res.message, "Success!");
        this.getProductBySubId(this.prodBySub);
      } else {
        this.toastr.error(res.message, "error!");
        this.getProductBySubId(this.prodBySub);
      }
    })
  }
  // checked veg or non veg
  isVeg(veg: any) {
    if (veg) {
      return true;
    } else {
      return false;
    }
  }
  // checked stock or not
  inStock(available: any) {
    this.isAvailable = available.inStock
    if (this.isAvailable) {
      return true;
    }
    else {
      return false
    }
  }

  //  open customization list Modal
  modalCustomizationList(data: any, product: any) {
    this.modalService.open(data, {
      size: "lg",
      windowClass: 'modal left'
    });
    this.customizationById = product.productId;
    this.productCusomization();
  }

  productCusomization() {
    this.adminService.getCustomization(this.customizationById).subscribe((data: any) => {
      let cusomizationData = data.items

      this.customizationList = [];
      this.customizationList.push(cusomizationData);
      this.rows = this.customizationList;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.customizationList;
      this.filteredData = this.customizationList;
    });
  }

  //  opne view variation Modal
  modalViewVariation(data: any, custom: any) {
    this.custom = custom
    this.modalService.open(data, {
      size: "lg",
      windowClass: 'modal right'
    });

    for (this.variant of this.custom) { }
    console.log(this.variant);

  }

  // modal Open add customization
  modalAddCustomization(data: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
    });
  }

  // add  customization form submit
  addCustomizationFormSubmit() {
    this.Submitted = true;
    if (this.addCustomizationForm.invalid) {
      return;
    } else {
      const formData = {
        productId: this.customizationById,
        variationName: this.addCustomizationForm.value.variationName
      }
      this.adminService.addCustomization(formData).subscribe((data: any) => {
        if (data.status) {
          this.toastr.success(data.message, "Success!");
          this.productCusomization();
          this.addCustomizationForm.reset();
          this.modalRef.close();
          this.Submitted = false;
        } else {
          this.toastr.error(data.message, "error!");
          this.productCusomization();
          this.Submitted = false;
        }
      })
    }
  }


  // open edit customization Modal
  modalEditCustomization(data: any, editVariation: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
    });
    this.editCustomizationForm.patchValue({
      variationName: editVariation.variationName,
      minSelection: editVariation.minSelection,
      maxSelection: editVariation.maxSelection
    })
    this.editVariation = editVariation.variationId;
  }

  editCustomizationFormSubmit() {
    this.Submitted = true;
    if (this.editCustomizationForm.invalid) {
      return;
    } else {
      const formData = {
        variationName: this.editCustomizationForm.value.variationName,
        minSelection: this.editCustomizationForm.value.minSelection,
        maxSelection: this.editCustomizationForm.value.maxSelection
      }

      this.adminService.editCustomization(this.editVariation, formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message, "Success!");
          this.productCusomization();
          this.modalRef.close();
          this.Submitted = false;
        } else {
          this.toastr.error(res.message, "error!");
          this.productCusomization();
          this.Submitted = false;
        }
      })

    }
  }

  // open add variation Modal
  modalAddVariation(data: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
    });
  }

  addVariantFormSubmit() {
    this.Submitted = true;
    if (this.addVariantForm.invalid) {
      return;
    }
    else {
      const formData = {
        variationId: this.variant.variationId,
        variantName: this.addVariantForm.value.variantName,
        variantPrice: this.addVariantForm.value.variantPrice
      }

      this.adminService.addVariant(formData).subscribe((res: any) => {
        if (res.status) {

          this.toastr.success(res.message, "Success!");
          this.modalRef.close();
          this.addCustomizationForm.reset();
          this.productCusomization();
          this.Submitted = false;
        } else {
          this.toastr.error(res.message, "error!");
          this.Submitted = false;
        }
      });
    }
  }

  // open edit variant Modal
  modalEditVariation(data: any, editVariant: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
    });
    this.editVariantForm.patchValue({
      variantName: editVariant.variantName,
      variantPrice: editVariant.displayPrice
    });
    this.editVariantByid = editVariant.variantId
  }


  editVariantFormSubmit() {
    this.Submitted = true;
    if (this.editVariantForm.invalid) {
      return
    } else {
      const formData = {
        variantId: this.editVariantByid,
        variantName: this.editVariantForm.value.variantName,
        variantPrice: this.editVariantForm.value.variantPrice
      }

      this.adminService.editVariantById(formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message, "Success!");
          this.productCusomization();
          this.modalRef.close();
          this.Submitted = false;
        } else {
          this.toastr.error(res.message, "error!");
          this.productCusomization();
          this.Submitted = false;
        }
      })
    }
  }

  // open all addons Modal
  modalAddons(data: any, product: any) {
    this.modalService.open(data, {
      size: "lg",
      windowClass: 'modal left'
    });
    this.outletAddon = product.outletId;
    this.productAddon = product;
    this.outletAddons();
    this.productAddons();
  }

  // get outlet addons
  outletAddons() {
    this.adminService.getOutletAddon(this.outletAddon).subscribe((data: any) => {
      this.outletAddonList = data.items;
      this.rows2 = data.items;
      this.tempData = this.rows2;
      this.kitchenSinkRows = this.outletAddonList;
      this.filteredData = this.outletAddonList;
    })
  }

  // get all produc addons
  productAddons() {
    this.adminService.getProductAddon(this.productAddon.productId).subscribe((data: any) => {
      this.producAddonList = data.items;
      this.rows1 = data.items;
      this.tempData1 = this.rows1;
      this.kitchenSinkRows1 = this.producAddonList;
      this.filteredData1 = this.producAddonList;
    });
  }

  // opne edit addon Modal
  openEditAddonModal(data: any, addonCat: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'md'
    });
    this.ediAddons = addonCat;
    this.editAddonForm.patchValue({
      categoryName: addonCat.categoryName,
      minSelection: addonCat.minSelection,
      maxSelection: addonCat.maxSelection
    });
  }

  // edit addon category form submit
  editAddonFormSubmit() {
    this.Submitted = true;

    if (this.editAddonForm.invalid) {
      return
    }
    else {
      const formData = {
        addOnCategoryId: this.ediAddons.addOnCategoryId,
        categoryName: this.editAddonForm.value.categoryName,
        minSelection: this.editAddonForm.value.minSelection,
        maxSelection: this.editAddonForm.value.maxSelection
      }

      this.adminService.editAddonCategory(formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message, "Success!");
          this.outletAddons();
          this.modalRef.close();
          this.Submitted = false;
        } else {
          this.toastr.error(res.message, "error!");
          this.outletAddon();
          this.Submitted = false;
        }
      })

    }
  }

  // open add addon category Modal
  openAddAddonModal(data: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
  }

  addAddonFormSubmit() {
    this.Submitted = true;
    if (this.addAddonForm.invalid) {
      return;
    } else {
      const formData = {
        outletId: this.outletData.outletId,
        categoryName: this.addAddonForm.value.categoryName,
        minSelection: this.addAddonForm.value.minSelection,
        maxSelection: this.addAddonForm.value.maxSelection
      }
      this.adminService.addAddonCategory(formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message, "Success!");
          this.outletAddons();
          this.modalRef.close();
          this.Submitted = false;
        } else {
          this.toastr.error();
          this.outletAddons();
          this.Submitted = false;
        }
      })
    }
  }

  // open view addon product Modal
  opneViewAddonProductModal(data: any, addonCategory: any) {
    this.modalRef = this.modalService.open(data, {
      size: "lg",
      windowClass: 'modal right'
    });
    this.addonCategory = addonCategory;
  }

  // open edit addon product Modal
  openEditAddonProductModal(data: any, editAddonProduct: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'md'
    });
    this.editAddonProduct = editAddonProduct;
    this.editAddonProductForm.patchValue({
      productName: editAddonProduct.productName,
      productPrice: editAddonProduct.productPrice
    });
  }

  // edit addon product form submit
  editAddonProductFormSubmit() {
    this.Submitted = true;
    if (this.editAddonProductForm.invalid) {
      return;
    } else {
      const formData = {
        addOnProductId: this.editAddonProduct.addOnProductId,
        productName: this.editAddonProductForm.value.productName,
        productPrice: this.editAddonProductForm.value.productPrice
      }

      this.adminService.editAddonProduct(formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message, "Success!");
          this.outletAddons();
          this.productAddons();
          this.modalRef.close();
        } else {
          this.toastr.error(res.message, "Success!");
          this.outletAddons();
          this.productAddons();
        }
      })
    }
  }

  // open link Modal
  openLinkModal(data: any, link: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'md'
    });
    console.log("link", link);
    this.link = link;

  }
  // open Unlink addon Modal
  openUnlinkAddonModal(data: any, unLink: any) {
    this.modalRef = this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'md'
    });
    console.log("unLink", unLink);
    this.unLink = unLink
  }

  // link addon to product
  linktoProduct() {
    const formData = {
      productId: this.productAddon.productId,
      addOnCategoryId: this.link.addOnCategoryId,
      operation: true
    }
    this.adminService.linkUnlinkAddon(formData).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success(res.message, "Success!");
        this.productAddons();
        this.modalRef.close();
      } else {
        this.toastr.error(res.message, "error!");
        this.productAddons();
      }
    })

  }

  // unlink addon from product
  unlinkFromProduct() {
    const formData = {
      productId: this.productAddon.productId,
      addOnCategoryId: this.unLink.addOnCategoryId,
      operation: false
    }

    this.adminService.linkUnlinkAddon(formData).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success(res.message, "Success!");
        this.productAddons();
        this.modalRef.close();
      } else {
        this.toastr.error(res.message, "error!");
        this.productAddons();
      }
    })
  }

  openDeletCategoryModal(data:any,category:any){
  this.modalRef = this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'md'
  });
  this.deleteCategoryByID = category
  console.log(this.deleteCategoryByID);
  }

  deleteCategories(){
    const formData = {
      categoryId:this.deleteCategoryByID.categoryId
    }
    // this.adminService.deleteCategory(formData).subscribe((res:any)=>{
    //   if(res.status){
    //     this.toastr.success(res.message,"Success!");
    //     this.allCategory();
    //     this.subCategoryById();
    //     this.modalRef.close();
    //   }else{
    //     this.toastr.error(res.message,"error!");
    //     this.allCategory();
    //     this.subCategoryById();
    //   }
    // });
  }

  // open deleteProduct Modal
  openDeletProductModal(data:any,product:any){
    this.modalRef = this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'md'
    });
    this.deleteProductById = product;
  }

  deleteProduct(){
    const formData = {
      productId:this.deleteProductById.productId
    }
    // this.adminService.deleteCategory(formData).subscribe((res:any)=>{
    //   if(res.items){
    //     this.toastr.success(res.message,"Success!");
    //     this.getProductBySubId(this.prodBySub);
    //     this.modalRef.close();
    //   }else{
    //     this.toastr.error(res.message,"error!");
    //   }
    // });
  }
  // modal delete variant
  modalDeleteVariant(data) {
    this.modalService.open(data, {
      centered: true
    });
  }

  filterUpdate(event: any) {
    let val = event.target.value.toLowerCase();
    let colsAmt = this.cols.length;
    let keys = Object.keys([0]);

    this.data = this.filteredData.filter(function (item: any): | any {
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]]?.toString().toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
    this.kitchenSinkRows = this.data;
    this.table.offset = 0;

  }
  onSelect({ selected }: any) {
    this.exportCSVData = selected;
  }

  downloadCSV(event: any) {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: '',
      useBom: true,
      noDownload: false,
      headers: ['name', 'tradeName', 'phone', 'email'],
    }



    if (this.exportCSVData == undefined) {
      const fileInfo = new ngxCsv(this.tempData, this.formula, options);


    } else {
      const fileInfo = new ngxCsv(this.exportCSVData, this.formula, options);

      this.exportCSVData = undefined;


    }

  }
  onActivate(event: any) {

  }
}