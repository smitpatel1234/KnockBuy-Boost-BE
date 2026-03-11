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
exports.Item = void 0;
const typeorm_1 = require("typeorm");
const base_slug_entity_1 = require("../commanEntity/base-slug.entity");
const category_1 = require("./category");
const image_1 = require("./image");
const item_description_1 = require("./item_description");
const review_1 = require("./review");
const variant_collection_1 = require("./variant_collection");
let Item = class Item extends base_slug_entity_1.BaseSlugEntity {
    getSlugSource() {
        const category = this.category;
        const categoryId = category?.category_id ?? '';
        return `${this.item_name}-${String(this.item_price)}-${categoryId}-${this.description.substring(0, 20)}-${crypto.randomUUID()}`;
    }
};
exports.Item = Item;
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    (0, typeorm_1.ManyToOne)(() => category_1.Category, (category) => category.items, { nullable: true, onDelete: "SET NULL" }),
    __metadata("design:type", Object)
], Item.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Item.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_1.Image, (image) => image.item),
    __metadata("design:type", Array)
], Item.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Item.prototype, "item_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], Item.prototype, "item_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Item.prototype, "item_price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_1.Review, (review) => review.item),
    __metadata("design:type", Array)
], Item.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => item_description_1.ItemDescription, (id) => id.item),
    __metadata("design:type", Object)
], Item.prototype, "rich_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Item.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'int' }),
    __metadata("design:type", Number)
], Item.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => variant_collection_1.VariantCollection, vc => vc.variant_collection_id),
    __metadata("design:type", Array)
], Item.prototype, "variant_collections", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    __metadata("design:type", Number)
], Item.prototype, "version", void 0);
exports.Item = Item = __decorate([
    (0, typeorm_1.Entity)()
], Item);
