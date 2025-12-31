import { EntityManager } from "typeorm";
import { AddCategory, CategoryType, CategoryAllType } from "../../domain/models/category.models";
import { Category } from "../orm/entities/category";
import { CategoryRepoPort } from "../../application/port/category-repo.port";
import { wrapTransaction } from "../helper/transaction";
import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import { applyPaginationAndFilters } from "../helper/pagination.helper";
export const CategoryRepo: CategoryRepoPort = {
  createCategory: async (em: EntityManager, input: AddCategory) => {
    const categoryRepo = em.getRepository(Category);

    const newCategory = categoryRepo.create({
      category_name: input.category_name,
      description: input.description,
      image_url: input.image_url,
    });

    if (input.parent_category_id) {
      const parent = await categoryRepo.findOne({
        where: { category_id: input.parent_category_id },
        select: ["category_id"],
      });

      if (!parent) {
        throw new Error("Parent category does not exist");
      }

      newCategory.parentCategory = parent;
    }

    await categoryRepo.save(newCategory);
  },

  updateCategory: async (em: EntityManager, input: CategoryType) => {
    console.log(input)
    const categoryRepo = em.getRepository(Category);

    const existing = await categoryRepo.findOne({
      where: { category_id: input.category_id },
    });

    if (!existing) {
      throw new Error("Category not found");
    }

    if (input.parent_category_id) {
      if (input.parent_category_id === input.category_id) {
        throw new Error("Category cannot be its own parent");
      }

      const parent = await categoryRepo.findOne({
        where: { category_id: input.parent_category_id },
        select: ["category_id"],
      });

      if (!parent) {
        throw new Error("Parent category does not exist");
      }

      existing.parentCategory = parent;
    }

    existing.category_name = input.category_name;
    existing.description = input.description;
    existing.image_url = input.image_url;

    await categoryRepo.save(existing);
    return true;
  },

  deleteCategory: async (em: EntityManager, category_id: string) => {
    const u = await em.getRepository(Category).delete(category_id);
    return (u.affected ?? 0) > 0;
  },

  getAllCategories: async (em: EntityManager) => {

    const categories = await em
      .getRepository(Category)
      .createQueryBuilder("child")
      .leftJoin(Category, "parent", "parent.category_id = child.parentCategory")
      .select([
        "child.category_id AS category_id",
        "child.category_name AS category_name",
        "child.image_url AS image_url",
        "child.description AS description",
        "parent.category_id AS parent_category_id",
        "parent.category_name AS parent_category_name",
      ])
      .getRawMany<CategoryAllType>();
    return categories;
  },
  GetAllCategoryPage: async (
    em: EntityManager,
    data: pageParams
  ): Promise<PaginationResponse<CategoryAllType>> => {
    const qb = em
      .getRepository(Category)
      .createQueryBuilder("category")
      .leftJoin("category.parentCategory", "parent")
      .select([
        "category.category_id AS category_id",
        "category.category_name AS category_name",
        "category.image_url AS image_url",
        "category.description AS description",
        "parent.category_id AS parent_category_id",
        "parent.category_name AS parent_category_name",
      ]);

    return applyPaginationAndFilters<CategoryAllType>(qb, data);
  },
  wrapTransaction: wrapTransaction,
};
