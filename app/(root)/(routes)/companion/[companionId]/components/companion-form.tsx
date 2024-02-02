"use client";

import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Category, Companion } from "@prisma/client";

import { Wand2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

/////////////////////////////////////////

const PREAMBLE =
  "You are Cristiano Ronaldo. You are a world-famous footballer, known for your dedication, agility, and countless accolades in the football world. Your dedication to training and fitness is unmatched, and you have played for some of the world's top football clubs. Off the field, you're known for your charm, sharp fashion sense, and charitable work. Your passion for the sport is evident every time you step onto the pitch. You cherish the support of your fans and are driven by a relentless ambition to be the best";

const SEED_CHAT = `Human: Hi Cristiano, how's the day treating you?
Cristiano: *with a confident smile* Every day is a chance to train harder and aim higher. The pitch is my canvas, and the ball, my paintbrush. How about you?
Human: Not as exciting as your life, I bet!
Cristiano: *grinning* Everyone has their own pitch and goals. Just find yours and give it your all!`;

interface ComapanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),

  description: z.string().min(1, { message: "Description is required!" }),

  instructions: z
    .string()
    .min(200, { message: "Instructions require at least 200 characters!" }),

  seed: z
    .string()
    .min(200, { message: "Seeds require at least 200 characters!" }),

  src: z.string().min(1, { message: "Image source is required!" }),

  categoryId: z.string().min(1, { message: "CategoryId is required!" }),
});

const CompanionForm = ({ initialData, categories }: ComapanionFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  /////////
  // Initialize Form properties validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Update Companion functionality
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        // Create Companion functionality
        await axios.post("/api/companion", values);
      }

      toast({
        description: "Success",
      });
      router.refresh();
      router.push("/");
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <div className="mx-auto h-full max-w-3xl space-y-2  p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10 "
        >
          <div className="w-full space-y-2">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>

              <p className="text-sm text-muted-foreground">
                General information about your companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>

          <FormField
            name="src"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-center justify-center space-y-4">
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="cols-span-2 md:col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background "
                        disabled={isLoading}
                        placeholder="Cristiano Ronaldo"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is how your AI Companion will be named.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="cols-span-2 md:col-span-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background "
                        disabled={isLoading}
                        placeholder="Famous Footballer"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Short description for your AI Companion.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel> Category</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="bg-background ">
                        {categories.map((category) => {
                          return (
                            <SelectItem
                              value={category.id}
                              key={category.id}
                              className="cursor-pointer"
                            >
                              {category.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a catogory for your AI.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="w-full space-y-2 ">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p>Detailed instructions for AI Behaviour</p>
            </div>
            <Separator className="bg-primary" />
          </div>

          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="cols-span-2 md:col-span-1">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none bg-background "
                      disabled={isLoading}
                      placeholder={PREAMBLE}
                      rows={7}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe in detail your companion&apos;s backstory and
                    relevant details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="cols-span-2 md:col-span-1">
                  <FormLabel>Example Conversation</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none bg-background"
                      disabled={isLoading}
                      placeholder={SEED_CHAT}
                      rows={7}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    An example coversations with your AI Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex w-full justify-center ">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your companion" : "Create yout companion"}
              <Wand2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
