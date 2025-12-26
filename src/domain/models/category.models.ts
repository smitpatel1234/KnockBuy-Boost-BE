
export interface AddCategory {
    category_name: string
    parent_category_id?: string
    childCategories?: CategoryType[] | string[]
    image_url?: string
    description?: string
}

export interface CategoryType extends AddCategory {
    category_id: string
}

export interface CategoryAllType {
    category_id: string
    category_name: string
    parent_category_id: string
    parent_category_name: string
    image_url: string
    description: string
}