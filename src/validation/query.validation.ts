import { query } from "express-validator"

export const singleItemValidation = query("id", "Provide id parameter")
export const pageValidation = query("page", "Provide page parameter")
export const searchValidation = query("search", "Provide customer parameter")
