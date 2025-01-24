import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PuppyDialog } from "@/components/admin/PuppyDialog";
import type { SelectPuppy } from "@db/schema";

export default function Dashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPuppy, setEditingPuppy] = useState<SelectPuppy | null>(null);
  const [deletingPuppy, setDeletingPuppy] = useState<SelectPuppy | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState<boolean | null>(null);

  const { data: puppies, isLoading } = useQuery<SelectPuppy[]>({
    queryKey: ["/api/admin/puppies"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/puppies/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Puppy deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/puppies"] });
      setDeletingPuppy(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredPuppies = puppies?.filter((puppy) => {
    const matchesSearch = puppy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      puppy.color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAvailable === null || puppy.available === filterAvailable;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Puppies</h1>
          <PuppyDialog
            open={isAddOpen}
            onOpenChange={setIsAddOpen}
            trigger={
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Puppy
              </Button>
            }
          />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search puppies..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant={filterAvailable === true ? "default" : "outline"}
            onClick={() => setFilterAvailable(filterAvailable === true ? null : true)}
          >
            Available
          </Button>
          <Button
            variant={filterAvailable === false ? "default" : "outline"}
            onClick={() => setFilterAvailable(filterAvailable === false ? null : false)}
          >
            Not Available
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPuppies?.map((puppy) => (
            <Card key={puppy.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{puppy.name}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingPuppy(puppy)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setDeletingPuppy(puppy)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {puppy.imageUrl && (
                  <img
                    src={puppy.imageUrl}
                    alt={puppy.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <p>Age: {puppy.age}</p>
                <p>Color: {puppy.color}</p>
                {puppy.description && (
                  <p className="mt-2 text-gray-600">{puppy.description}</p>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      puppy.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {puppy.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <PuppyDialog
          puppy={editingPuppy ?? undefined}
          open={editingPuppy !== null}
          onOpenChange={(open) => !open && setEditingPuppy(null)}
        />

        <AlertDialog
          open={deletingPuppy !== null}
          onOpenChange={(open) => !open && setDeletingPuppy(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the puppy
                from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deletingPuppy && deleteMutation.mutate(deletingPuppy.id)}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}