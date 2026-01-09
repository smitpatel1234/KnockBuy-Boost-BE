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
exports.Address = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let Address = class Address {
};
exports.Address = Address;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Address.prototype, "address_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, type: "varchar" }),
    __metadata("design:type", String)
], Address.prototype, "address_line1", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true, type: "varchar" }),
    __metadata("design:type", String)
], Address.prototype, "address_line2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, type: "varchar" }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, type: "varchar" }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Address.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "int" }),
    __metadata("design:type", Number)
], Address.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, type: "varchar" }),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    (0, typeorm_1.ManyToOne)(() => user_1.User),
    __metadata("design:type", Object)
], Address.prototype, "user_id", void 0);
exports.Address = Address = __decorate([
    (0, typeorm_1.Entity)()
], Address);
