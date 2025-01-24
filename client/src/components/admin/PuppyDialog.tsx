import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { SelectPuppy } from "@db/schema";

const puppySchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required"),
  color: z.string().min(1, "Color is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  available: z.boolean().default(true),
});

type PuppyForm = z.infer<typeof puppySchema>;

interface Props {
  puppy?: SelectPuppy;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PuppyDialog({ puppy, trigger, open, onOpenChange }: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const defaultValues: PuppyForm = {
    name: puppy?.name ?? "",
    age: puppy?.age ?? "",
    color: puppy?.color ?? "",
    description: puppy?.description ?? "",
    imageUrl: puppy?.imageUrl ?? "",
    available: puppy?.available ?? true,
  };

  const form = useForm<PuppyForm>({
    resolver: zodResolver(puppySchema),
    defaultValues,
  });

  const puppyMutation = useMutation({
    mutationFn: async (data: PuppyForm) => {
      const url = puppy
        ? `/api/admin/puppies/${puppy.id}`
        : "/api/admin/puppies";

      const res = await fetch(url, {
        method: puppy ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
        description: `Puppy ${puppy ? "updated" : "created"} successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/puppies"] });
      onOpenChange?.(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PuppyForm) => {
    puppyMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {puppy ? "Edit Puppy" : "Add New Puppy"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter puppy's name" />
                  </FormControl>
                  <FormDescription>
                    The name that will be displayed to potential buyers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 8 weeks" />
                  </FormControl>
                  <FormDescription>
                    Current age of the puppy.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Black & Tan" />
                  </FormControl>
                  <FormDescription>
                    The puppy's coat color and pattern.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter a detailed description of the puppy"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Additional details about the puppy's personality, training, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://example.com/puppy-image.jpg"
                      type="url"
                    />
                  </FormControl>
                  <FormDescription>
                    A direct link to the puppy's photo. Must be a valid URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Available</FormLabel>
                    <FormDescription>
                      Mark if this puppy is currently available for purchase.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={puppyMutation.isPending}
            >
              {puppyMutation.isPending
                ? "Saving..."
                : puppy ? "Update Puppy" : "Add Puppy"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}