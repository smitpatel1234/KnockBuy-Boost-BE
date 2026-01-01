"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const item_1 = require("./item");
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Category.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Category.prototype, "category_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category, (category) => category.childCategories, {
        nullable: true,
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "parent_category_id" }),
    __metadata("design:type", Object)
], Category.prototype, "parentCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_1.Item, (Item) => Item.category),
    __metadata("design:type", Array)
], Category.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Category, (category) => category.parentCategory),
    __metadata("design:type", Array)
], Category.prototype, "childCategories", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Category.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
