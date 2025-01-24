import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import type { SelectPuppy } from "@db/schema";

export default function Dashboard() {
  const { data: puppies, isLoading } = useQuery<SelectPuppy[]>({
    queryKey: ["/api/admin/puppies"],
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
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Puppies</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Puppy
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puppies?.map((puppy) => (
          <Card key={puppy.id}>
            <CardHeader>
              <CardTitle>{puppy.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Age: {puppy.age}</p>
              <p>Color: {puppy.color}</p>
              <p>Status: {puppy.available ? "Available" : "Not Available"}</p>
              <div className="mt-4 space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
