import slugify from "slugify";
// common/base-slug.entity.ts
import { BeforeInsert, BeforeUpdate, Column } from "typeorm";

export abstract class BaseSlugEntity {
  @Column({ unique: true })
  slug!: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (!this.slug && this.getSlugSource()) {
      this.slug = slugify(this.getSlugSource(), {
        locale: "vi",
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        replacement: "_",
        strict: true,
        trim: true,
      });
    }
  }

  // Child entity must define which field generates the slug
  abstract getSlugSource(): string;
}
