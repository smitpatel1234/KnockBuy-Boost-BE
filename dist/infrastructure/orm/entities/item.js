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
const variant_collection_1 = require("./variant_collection");
const base_slug_entity_1 = require("../commanEntity/base-slug.entity");
const category_1 = require("./category");
let Item = class Item extends base_slug_entity_1.BaseSlugEntity {
    getSlugSource() {
        return `${this.item_name}-${this.item_price}-${this.category || 'default'}-${this.item_id?.substring(0, 8) || ''}`;
    }
};
exports.Item = Item;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Item.prototype, "item_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, length: 255 }),
    __metadata("design:type", String)
], Item.prototype, "item_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Item.prototype, "item_price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_1.Category, (category) => category.items, { nullable: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Object)
], Item.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 3, scale: 2 }),
    __metadata("design:type", Number)
], Item.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Item.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Item.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => variant_collection_1.VariantCollection, vc => vc.item_id),
    __metadata("design:type", Array)
], Item.prototype, "variant_collections", void 0);
exports.Item = Item = __decorate([
    (0, typeorm_1.Entity)()
], Item);
