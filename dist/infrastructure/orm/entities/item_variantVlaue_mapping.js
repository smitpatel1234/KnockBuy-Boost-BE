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
exports.ItemVariantValueMapping = void 0;
const typeorm_1 = require("typeorm");
const item_1 = require("./item");
const variantValues_1 = require("./variantValues");
let ItemVariantValueMapping = class ItemVariantValueMapping {
};
exports.ItemVariantValueMapping = ItemVariantValueMapping;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ItemVariantValueMapping.prototype, "item_variantvalue_mapping_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_1.Item, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    __metadata("design:type", Object)
], ItemVariantValueMapping.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => variantValues_1.VariantValues, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'variantValue_id' }),
    __metadata("design:type", variantValues_1.VariantValues)
], ItemVariantValueMapping.prototype, "variantValue", void 0);
exports.ItemVariantValueMapping = ItemVariantValueMapping = __decorate([
    (0, typeorm_1.Entity)()
], ItemVariantValueMapping);
