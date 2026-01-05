
export interface AddCategory {
    category_name: string
    childCategories?: CategoryType[] | string[]
    description?: string
    image_url?: string
    parent_category_id?: string
}

export interface CategoryAllType {
    category_id: string
    category_name: string
    description: string
    image_url: string
    parent_category_id: string
    parent_category_name: string
}

export interface CategoryType extends AddCategory {
    category_id: string
}