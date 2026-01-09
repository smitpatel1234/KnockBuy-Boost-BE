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
exports.Delivery = void 0;
const typeorm_1 = require("typeorm");
const order_1 = require("./order");
let Delivery = class Delivery {
};
exports.Delivery = Delivery;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Delivery.prototype, "delivery_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, type: 'varchar' }),
    __metadata("design:type", String)
], Delivery.prototype, "delivery_state", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    (0, typeorm_1.OneToOne)(() => order_1.Order),
    __metadata("design:type", order_1.Order)
], Delivery.prototype, "order", void 0);
exports.Delivery = Delivery = __decorate([
    (0, typeorm_1.Entity)()
], Delivery);
