// common/base-slug.entity.ts
import { BeforeInsert, BeforeUpdate, Column } from "typeorm";
import slugify from "slugify";

export abstract class BaseSlugEntity {
  @Column({ unique: true })
  slug!: string;

  // Child entity must define which field generates the slug
  abstract getSlugSource(): string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (!this.slug && this.getSlugSource()) {
      this.slug = slugify(this.getSlugSource(), {
        locale: "vi",
        replacement: "_",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true,
        trim: true,
      });
    }
  }
}
