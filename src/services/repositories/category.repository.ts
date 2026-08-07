import type { CategoryDto, CategoryType } from "@/types/category";

export interface CategoryRepository {
  getAll(type?: CategoryType): Promise<CategoryDto[]>;
  getById(id: number): Promise<CategoryDto | null>;
  create(data: Omit<CategoryDto, "id">): Promise<CategoryDto>;
  update(id: number, data: Partial<Omit<CategoryDto, "id">>): Promise<CategoryDto>;
  remove(id: number): Promise<void>;
}
