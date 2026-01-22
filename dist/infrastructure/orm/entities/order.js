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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const address_1 = require("./address");
const discount_1 = require("./discount");
const order_items_1 = require("./order_items");
const user_1 = require("./user");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'address_id' }),
    (0, typeorm_1.ManyToOne)(() => address_1.Address, { nullable: true, onDelete: "SET NULL" }),
    __metadata("design:type", Object)
], Order.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending', length: 50, nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Order.prototype, "delivery_status", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'discount_id' }),
    (0, typeorm_1.ManyToOne)(() => discount_1.Discount, { nullable: true, onDelete: "SET NULL" }),
    __metadata("design:type", Object)
], Order.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], Order.prototype, "invoice_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Order.prototype, "order_date", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_items_1.OrderItems, oi => oi.order),
    __metadata("design:type", Array)
], Order.prototype, "order_items", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Order.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Order.prototype, "payment_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, precision: 12, scale: 2, type: 'decimal' }),
    __metadata("design:type", Number)
], Order.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, precision: 12, scale: 2, type: 'decimal' }),
    __metadata("design:type", Number)
], Order.prototype, "tax", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, precision: 12, scale: 2, type: 'decimal' }),
    __metadata("design:type", Number)
], Order.prototype, "total_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], Order.prototype, "isNew", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    (0, typeorm_1.ManyToOne)(() => user_1.User),
    __metadata("design:type", Object)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "deleted_at", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
