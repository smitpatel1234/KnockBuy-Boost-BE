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
exports.Discount = void 0;
const typeorm_1 = require("typeorm");
let Discount = class Discount {
};
exports.Discount = Discount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Discount.prototype, "discount_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, length: 255 }),
    __metadata("design:type", String)
], Discount.prototype, "discount_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, length: 255 }),
    __metadata("design:type", String)
], Discount.prototype, "discount_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 2, scale: 2 }),
    __metadata("design:type", String)
], Discount.prototype, "discount_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 2, scale: 2 }),
    __metadata("design:type", Number)
], Discount.prototype, "discount_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Discount.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Discount.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Discount.prototype, "discount_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Discount.prototype, "active_flag", void 0);
exports.Discount = Discount = __decorate([
    (0, typeorm_1.Entity)()
], Discount);
