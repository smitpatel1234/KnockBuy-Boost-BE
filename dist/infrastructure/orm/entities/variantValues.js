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
exports.VariantValues = void 0;
const typeorm_1 = require("typeorm");
const variantPropertys_1 = require("./variantPropertys");
let VariantValues = class VariantValues {
};
exports.VariantValues = VariantValues;
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], VariantValues.prototype, "variant_value", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'variant_property_id', referencedColumnName: 'variantProperty_id' }),
    (0, typeorm_1.ManyToOne)(() => variantPropertys_1.VariantPropertys, vp => vp.variant_property_values, { nullable: false, onDelete: "CASCADE" }),
    __metadata("design:type", variantPropertys_1.VariantPropertys)
], VariantValues.prototype, "variantProperty", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VariantValues.prototype, "variantValue_id", void 0);
exports.VariantValues = VariantValues = __decorate([
    (0, typeorm_1.Entity)()
], VariantValues);
