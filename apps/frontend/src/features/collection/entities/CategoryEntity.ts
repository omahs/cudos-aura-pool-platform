export default class CategoryEntity {

    categoryId: string;
    categoryName: string;

    constructor() {
        this.categoryId = '';
        this.categoryName = '';
    }

    static toJson(model: CategoryEntity) {
        return {
            'categoryId': model.categoryId,
            'categoryName': model.categoryName,
        }
    }

    static fromJson(json: any): CategoryEntity {
        if (json === null) {
            return null;
        }

        const entity = new CategoryEntity();

        entity.categoryId = (json.categoryId ?? entity.categoryId).toString();
        entity.categoryName = json.categoryName ?? entity.categoryName;

        return entity;
    }

}
