export type FieldUnion<T extends string> = T extends `${infer U},${infer Rest}` ? U | FieldUnion<Rest> : T

export type ErrorResponse<Data = undefined> = {
  message: string
  error?: string | number
  detail?: Data
}
