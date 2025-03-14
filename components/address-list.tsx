"use client"

import { useEffect, useRef } from "react"
import type { Address } from "@/types/address"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin } from "lucide-react"

interface AddressListProps {
  addresses: Address[]
  selectedAddressId: number | null
  isLoading: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean | undefined
  onSelectAddress: (address: Address) => void
  onLoadMore: () => void
}

export function AddressList({
  addresses,
  selectedAddressId,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onSelectAddress,
  onLoadMore,
}: AddressListProps) {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          onLoadMore()
        }
      },
      { threshold: 0.5 },
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [onLoadMore, hasNextPage])

  if (isLoading && addresses.length === 0) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    )
  }

  if (addresses.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No addresses found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
      {addresses.map((address) => (
        <Card
          key={address.id}
          className={`cursor-pointer transition-colors hover:bg-accent ${
            selectedAddressId === address.id ? "border-primary" : ""
          }`}
          onClick={() => onSelectAddress(address)}
        >
          <CardContent className="p-4 flex items-center gap-3">
            <div className="text-primary">
              <MapPin size={20} />
            </div>
            <div className="flex-1 truncate">
              <p className="font-medium truncate">{address.address}</p>
              <p className="text-sm text-muted-foreground truncate">
                {address.country || "Unknown country"}
                {address.zip ? `, ${address.zip}` : ""}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Loading indicator for next page */}
      {isFetchingNextPage && <Skeleton className="h-20 w-full" />}

      {/* Observer target for infinite scrolling */}
      <div ref={observerTarget} className="h-4" />
    </div>
  )
}

