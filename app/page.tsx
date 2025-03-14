"use client"

import { useAddresses } from "@/hooks/use-addresses"
import { AddressList } from "@/components/address-list"
import { AddressDetails } from "@/components/address-details"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function AddressesPage() {
  const {
    addresses,
    selectedAddress,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isDeleting,
    error,
    selectAddress,
    deleteAddress,
    refreshAddresses,
    loadMoreAddresses,
  } = useAddresses()

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Address Management</h1>
          <Button variant="outline" onClick={() => refreshAddresses()} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        {error && <p className="text-destructive">{error}</p>}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Address Details - Shown first on mobile */}
        <div className="md:col-span-2 md:order-2 order-1 mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <AddressDetails address={selectedAddress} onDelete={deleteAddress} isDeleting={isDeleting} />
        </div>

        {/* Address List - Shown second on mobile */}
        <div className="md:col-span-1 md:order-1 order-2">
          <h2 className="text-xl font-semibold mb-4">Addresses</h2>
          <AddressList
            addresses={addresses}
            selectedAddressId={selectedAddress?.id || null}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            onSelectAddress={selectAddress}
            onLoadMore={loadMoreAddresses}
          />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

