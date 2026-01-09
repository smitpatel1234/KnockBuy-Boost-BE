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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const address_1 = require("./address");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.OneToMany)(() => address_1.Address, (address) => address.user_id),
    __metadata("design:type", Array)
], User.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, type: "varchar", unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: false, type: "varchar", unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "profile_image", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "timestamp" }),
    __metadata("design:type", Date)
], User.prototype, "refresh_expires_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, type: "boolean" }),
    __metadata("design:type", Boolean)
], User.prototype, "refresh_is_revoked", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", Object)
], User.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "USER", enum: ["ADMIN", "USER"], type: "enum" }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false, type: "varchar", unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true, type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "wishlist_name", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
