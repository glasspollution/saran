"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: CalendarProps) {
  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-4",
    month: "w-full space-y-4",
    month_caption: "relative mx-auto mb-4 flex h-9 items-center justify-center z-20",
    caption_label: "text-sm font-medium",
    nav: "hidden", // Hide navigation
    month_grid: "w-full border-collapse space-y-1",
    weekdays: "flex w-full",
    weekday: "flex h-9 w-9 items-center justify-center p-0 text-xs font-medium text-muted-foreground/80",
    week: "flex w-full mt-2",
    day_button:
      "relative flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-lg p-0 text-sm font-normal text-foreground outline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
    day: "flex h-9 w-9 items-center justify-center p-0 text-sm",
    range_start: "day-range-start",
    range_end: "day-range-end",
    selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    today: "bg-accent text-accent-foreground",
    outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
    disabled: "text-muted-foreground opacity-50",
    range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
    hidden: "invisible",
  };

  const mergedClassNames: typeof defaultClassNames = Object.keys(defaultClassNames).reduce(
    (acc, key) => ({
      ...acc,
      [key]: classNames?.[key as keyof typeof classNames]
        ? cn(
            defaultClassNames[key as keyof typeof defaultClassNames],
            classNames[key as keyof typeof classNames],
          )
        : defaultClassNames[key as keyof typeof defaultClassNames],
    }),
    {} as typeof defaultClassNames,
  );

  const mergedComponents = {
    ...userComponents,
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 border border-border rounded-md bg-background/50", className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar }; 