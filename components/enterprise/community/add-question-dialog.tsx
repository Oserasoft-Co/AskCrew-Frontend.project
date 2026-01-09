"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPlus, IconMessageQuestion } from "@tabler/icons-react";
import { useState } from "react";
import { AddQuestionForm } from "./add-question-form";

export function AddQuestionDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-9 bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all duration-300"
        >
          <IconPlus className="mr-2 size-4" />
          Ask Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader className="space-y-3 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-linear-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30">
              <IconMessageQuestion className="size-6 text-orange-500" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-linear-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              Ask a Question
            </DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Share your question with the community. Be specific and provide
            enough context to help others understand and answer your question.
          </DialogDescription>
        </DialogHeader>

        <AddQuestionForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
