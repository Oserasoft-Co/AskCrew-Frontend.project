"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Workshop } from "./workshops-data-table";
import { Calendar, Users, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/helper/formatDateTime";

interface WorkshopDetailsDialogProps {
  workshop: Workshop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (workshop: Workshop) => void;
}

export function WorkshopDetailsDialog({
  workshop,
  open,
  onOpenChange,
  onApply,
}: WorkshopDetailsDialogProps) {
  if (!workshop) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4 pr-8">
            <DialogTitle className="text-2xl bg-linear-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              {workshop.name}
            </DialogTitle>
            {/* <Badge
              variant={workshop.status === "upcoming" ? "default" : "secondary"}
              className={
                workshop.status === "upcoming"
                  ? "bg-linear-to-r from-orange-500 to-purple-600 border-none"
                  : ""
              }
            >
              {workshop.status}
            </Badge> */}
          </div>
          <DialogDescription className="text-base pt-2">
            {workshop.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-lg bg-linear-to-br from-orange-500/10 to-purple-500/5 border border-orange-500/20">
              <div className="flex items-center gap-2 font-medium">
                <div className="p-1.5 rounded-lg bg-orange-500/20">
                  <Calendar className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-orange-600 dark:text-orange-400">
                  Date Range
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Start: {formatDateTime(workshop.start_date)}</p>
                <p>End: {formatDateTime(workshop.end_date)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-lg bg-linear-to-br from-purple-500/10 to-orange-500/5 border border-purple-500/20">
              <div className="flex items-center gap-2 font-medium">
                <div className="p-1.5 rounded-lg bg-purple-500/20">
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-purple-600 dark:text-purple-400">
                  Participation
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{workshop.number_of_participants} people applied</p>
                <p>Limited spots available</p>
              </div>
            </div>
          </div>

          {/* <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <div className="p-1 rounded-lg bg-purple-500/10">
                <CheckCircle2 className="w-4 h-4 text-purple-500" />
              </div>
              <span className="bg-linear-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                What you&apos;ll learn
              </span>
            </h4>
            <ul className="grid gap-2 text-sm text-muted-foreground pl-6 list-disc">
              <li>Comprehensive understanding of the subject matter</li>
              <li>Hands-on practical experience and exercises</li>
              <li>Networking opportunities with industry professionals</li>
              <li>Certificate of completion upon finishing the workshop</li>
            </ul>
          </div> */}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            className="bg-linear-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 shadow-lg"
            onClick={() => onApply(workshop)}
          >
            Apply for Workshop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
