"use client"

import { useState, useCallback } from "react"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Address } from "@/types/address"
import { getAddresses, deleteAddress } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export function useAddresses() {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Query for fetching addresses with pagination
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, refetch } = useInfiniteQuery({
    queryKey: ["addresses"],
    queryFn: ({ pageParam }) => getAddresses(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load addresses. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Flatten the pages of addresses
  const addresses = data?.pages.flatMap((page) => page.addresses) || []

  // Mutation for deleting an address
  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: (_, deletedId) => {
      toast({
        title: "Success",
        description: "Address deleted successfully.",
      })
      // Invalidate and refetch addresses after deletion
      queryClient.invalidateQueries({ queryKey: ["addresses"] })

      // Clear selection if the deleted address was selected
      if (selectedAddress && selectedAddress.id === deletedId) {
        setSelectedAddress(null)
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete address. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address)
  }

  const handleDeleteAddress = async (id: number) => {
    deleteMutation.mutate(id)
  }

  const loadMoreAddresses = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return {
    addresses,
    selectedAddress,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isDeleting: deleteMutation.isPending,
    error: error ? "Failed to load addresses. Please try again." : null,
    selectAddress: handleSelectAddress,
    deleteAddress: handleDeleteAddress,
    refreshAddresses: refetch,
    loadMoreAddresses,
  }
}

