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
exports.ItemDescription = void 0;
const typeorm_1 = require("typeorm");
const item_1 = require("./item");
let ItemDescription = class ItemDescription {
};
exports.ItemDescription = ItemDescription;
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], ItemDescription.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ItemDescription.prototype, "description_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], ItemDescription.prototype, "how_its_made", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], ItemDescription.prototype, "how_to_use", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: "item_id" }),
    (0, typeorm_1.OneToOne)(() => item_1.Item, { onDelete: "CASCADE" }),
    __metadata("design:type", Object)
], ItemDescription.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItemDescription.prototype, "item_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "json" }),
    __metadata("design:type", Object)
], ItemDescription.prototype, "key_features", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "json" }),
    __metadata("design:type", Array)
], ItemDescription.prototype, "specifications", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], ItemDescription.prototype, "updated_at", void 0);
exports.ItemDescription = ItemDescription = __decorate([
    (0, typeorm_1.Entity)()
], ItemDescription);
