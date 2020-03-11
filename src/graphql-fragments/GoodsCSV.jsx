import { graphql } from "gatsby"
export const GoodsCsvFragment = graphql`
  fragment GoodsCsvFragment on GoodsCsv {
    SubcategoryCode
    SubcategoryName
    GoodsName
    JAN
    SupplierCode
    WithTax
    WithoutTax
  }
`