import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Item } from "./item";
import { VariantValues } from "./variantValues";

@Entity()
export class ItemVariantValueMapping {
  @JoinColumn({ name: "item_id" })
  @ManyToOne(() => Item, { nullable:false , onDelete:"CASCADE" })
  item!: Relation<Item>;

  @PrimaryGeneratedColumn("uuid")
  item_variantvalue_mapping_id!: string;

  @JoinColumn({ name: "variantValue_id" })
  @ManyToOne(() => VariantValues, { nullable:false , onDelete:"CASCADE"  })
  variantValue!: Relation<VariantValues>;

  
}
