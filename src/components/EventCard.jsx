import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEvent } from "@/context/EventContext";

export default function EventForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addEvent, allEvents } = useEvent();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("about", data.about);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("location", data.location);
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      await addEvent(formData);
      setMessage("🎉 Event created successfully!");
      reset();
      allEvents();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <Label>Title</Label>
            <Input {...register("title", { required: true, minLength: 3 })} />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required (min 3 characters)</p>
            )}
          </div>


          <div>
            <Label>About</Label>
            <Input {...register("about", { required: true })} />
            {errors.about && (
              <p className="text-red-500 text-sm">About is required</p>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              rows={4}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>


          <div>
            <Label>Date</Label>
            <Input type="date" {...register("date", { required: true })} />
            {errors.date && (
              <p className="text-red-500 text-sm">Date is required</p>
            )}
          </div>

          <div>
            <Label>Location</Label>
            <Input {...register("location", { required: true })} />
            {errors.location && (
              <p className="text-red-500 text-sm">Location is required</p>
            )}
          </div>

    
          <div>
            <Label>Upload Image</Label>
            <Input type="file" accept="image/*" {...register("image")} />
          </div>


          <Button type="submit" className=" cursor-pointer bg-green-600 hover:bg-green-700 w-full">
            Create Event
          </Button>

      
          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
