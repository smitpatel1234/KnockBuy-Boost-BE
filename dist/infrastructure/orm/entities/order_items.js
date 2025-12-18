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
exports.OrderItems = void 0;
const typeorm_1 = require("typeorm");
const order_1 = require("./order");
const item_1 = require("./item");
let OrderItems = class OrderItems {
};
exports.OrderItems = OrderItems;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderItems.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_1.Order, o => o.order_items),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", order_1.Order)
], OrderItems.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_1.Item),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    __metadata("design:type", item_1.Item)
], OrderItems.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderItems.prototype, "item_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], OrderItems.prototype, "item_purchase_price", void 0);
exports.OrderItems = OrderItems = __decorate([
    (0, typeorm_1.Unique)(['order', 'item']),
    (0, typeorm_1.Entity)()
], OrderItems);
