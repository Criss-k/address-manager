export interface Address {
  id: number
  address: string
  country: string | null
  zip: string | null
}

export interface AddressesResponse {
  addresses: Address[]
  nextCursor: number | null
  hasNextPage: boolean
}

