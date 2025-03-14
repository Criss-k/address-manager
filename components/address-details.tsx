"use client"

import { useState } from "react"
import type { Address } from "@/types/address"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MapPin, Trash2 } from "lucide-react"

interface AddressDetailsProps {
  address: Address | null
  onDelete: (id: number) => Promise<void>
  isDeleting: boolean
}

export function AddressDetails({ address, onDelete, isDeleting }: AddressDetailsProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDelete = async () => {
    if (!address) return
    await onDelete(address.id)
    setDialogOpen(false)
  }

  if (!address) {
    return (
      <Card className="flex items-center justify-center">
        <CardContent className="p-6 text-center">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <p className="text-muted-foreground">Select an address to view details</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Address Details
        </CardTitle>
        <CardDescription>View and manage address information</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Street Address</h3>
            <p className="mt-1">{address.address}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Country</h3>
            <p className="mt-1">{address.country || "Not specified"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">ZIP/Postal Code</h3>
            <p className="mt-1">{address.zip || "Not specified"}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="destructive" className="w-full" disabled={isDeleting} onClick={() => setDialogOpen(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete Address"}
        </Button>

        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the address from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

