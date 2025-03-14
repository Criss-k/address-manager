import type { Address, AddressesResponse } from "@/types/address"

// Change the API_URL from http://localhost:4001 to the new URL
const API_URL = "https://ember-backend-hw.onrender.com/addresses"

export async function getAddresses(cursor?: number, pageSize = 10): Promise<AddressesResponse> {
  const params = new URLSearchParams()
  if (cursor) params.append("cursor", cursor.toString())
  params.append("pageSize", pageSize.toString())

  const url = `${API_URL}?${params.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch addresses: ${response.statusText}`)
  }

  return await response.json()
}

export async function getAddress(id: number): Promise<Address> {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch address: ${response.statusText}`)
  }

  return await response.json()
}

export async function deleteAddress(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Failed to delete address: ${response.statusText}`)
  }
}

