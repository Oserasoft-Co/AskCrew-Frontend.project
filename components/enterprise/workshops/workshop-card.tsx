"use client";

import { Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workshop } from "./workshops-data-table";
import { formatDateTime } from "@/helper/formatDateTime";

interface WorkshopCardProps {
  workshop: any;
  onApply: (workshop: any) => void;
  onViewDetails: (workshop: any) => void;
}

export function WorkshopCard({
  workshop,
  onApply,
  onViewDetails,
}: WorkshopCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-purple-500/20 hover:border-orange-500/40 bg-linear-to-br from-purple-500/5 to-orange-500/5 hover:from-purple-500/10 hover:to-orange-500/10">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl line-clamp-1 bg-linear-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              {workshop.name}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {workshop.description}
            </CardDescription>
          </div>
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
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="p-1.5 rounded-lg bg-orange-500/10">
            <Calendar className="w-4 h-4 text-orange-500" />
          </div>
          <span>
            {formatDateTime(workshop.start_date)}{" "}
            -{" "}
            {formatDateTime(workshop.end_date)} 
             
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="p-1.5 rounded-lg bg-purple-500/10">
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <span>{workshop.number_of_participants} Applicants</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4">
        <Button
          variant="outline"
          className="flex-1 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500"
          onClick={() => onViewDetails(workshop)}
        >
          View Details
        </Button>
        <Button
          className="flex-1 gap-2 bg-linear-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 shadow-lg"
          onClick={() => onApply(workshop)}
        >
          Apply Now <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
