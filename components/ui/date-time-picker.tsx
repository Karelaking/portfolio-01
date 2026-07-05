"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { StrokeDraw } from "@/components/stroke-draw"
import {
  RiCalendarLine,
  RiTimeLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react"

interface DateTimePickerProps {
  value?: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export function DateTimePicker({
  value,
  onChange,
  className,
  placeholder = "Select date and time"
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Parse value into local date state
  const dateValue = React.useMemo(() => {
    if (!value) return new Date()
    const parsed = new Date(value)
    return isNaN(parsed.getTime()) ? new Date() : parsed
  }, [value])

  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const initial = new Date(dateValue)
    initial.setDate(1)
    return initial
  })

  // Format date to display on button
  const formattedDisplay = React.useMemo(() => {
    if (!value) return ""
    const d = new Date(value)
    if (isNaN(d.getTime())) return ""
    
    const month = SHORT_MONTHS[d.getMonth()]
    const day = d.getDate()
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    return `${month} ${day}, ${year} ${hours}:${minutes}`
  }, [value])

  const handleDateSelect = (day: number) => {
    const newDate = new Date(dateValue)
    newDate.setFullYear(currentMonth.getFullYear())
    newDate.setMonth(currentMonth.getMonth())
    newDate.setDate(day)
    onChange(formatValue(newDate))
  }

  const handleTimeChange = (type: "hours" | "minutes", val: number) => {
    const newDate = new Date(dateValue)
    if (type === "hours") {
      newDate.setHours(Math.max(0, Math.min(23, val)))
    } else {
      newDate.setMinutes(Math.max(0, Math.min(59, val)))
    }
    onChange(formatValue(newDate))
  }

  const formatValue = (d: Date) => {
    const month = SHORT_MONTHS[d.getMonth()]
    const day = d.getDate()
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    return `${month} ${day}, ${year} ${hours}:${minutes}`
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(currentMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  // Calendar calculations
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayIndex = new Date(year, month, 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const padding = Array.from({ length: firstDayIndex }, () => null)

  const calendarGrid = [...padding, ...days]

  const isSelected = (day: number) => {
    return (
      dateValue.getDate() === day &&
      dateValue.getMonth() === month &&
      dateValue.getFullYear() === year
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            className={cn(
              "flex items-center gap-2 border border-border bg-background hover:bg-muted/10 px-3 py-2 text-sm rounded-lg text-left w-full focus:outline-hidden focus:border-primary/50 cursor-pointer select-none font-sans transition-all duration-200",
              !value && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <StrokeDraw>
          <RiCalendarLine className="size-4 shrink-0 text-muted-foreground" />
        </StrokeDraw>
        <span className="flex-1 truncate">{formattedDisplay || placeholder}</span>
      </PopoverTrigger>

      <PopoverContent className="w-[280px] bg-card/95 backdrop-blur-md border border-border/80 p-4 shadow-xl rounded-xl z-50">
        <div className="flex flex-col gap-3 font-sans">
          {/* Month / Year header navigation */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground tracking-wide">
              {MONTHS[month]} {year}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => navigateMonth("prev")}
                className="p-1 hover:bg-muted/60 rounded-md transition-colors cursor-pointer"
              >
                <StrokeDraw>
                  <RiArrowLeftSLine className="size-4 text-muted-foreground hover:text-foreground" />
                </StrokeDraw>
              </button>
              <button
                type="button"
                onClick={() => navigateMonth("next")}
                className="p-1 hover:bg-muted/60 rounded-md transition-colors cursor-pointer"
              >
                <StrokeDraw>
                  <RiArrowRightSLine className="size-4 text-muted-foreground hover:text-foreground" />
                </StrokeDraw>
              </button>
            </div>
          </div>

          {/* Days of week labels */}
          <div className="grid grid-cols-7 gap-1 text-center font-semibold text-[10px] text-muted-foreground tracking-wider uppercase">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Calendar days grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarGrid.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="size-8" />
              }

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={cn(
                    "size-8 text-xs rounded-lg flex items-center justify-center transition-all cursor-pointer font-medium hover:bg-muted",
                    isSelected(day) && "bg-primary text-primary-foreground font-bold hover:bg-primary shadow-sm",
                    isToday(day) && !isSelected(day) && "border border-primary/30 text-primary"
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-border/60 my-1" />

          {/* Time Picker selection */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <StrokeDraw>
                <RiTimeLine className="size-3.5" />
              </StrokeDraw>
              <span className="font-medium tracking-wide">Time</span>
            </div>
            
            <div className="flex items-center gap-1 font-mono">
              <select
                value={dateValue.getHours()}
                onChange={(e) => handleTimeChange("hours", parseInt(e.target.value, 10) || 0)}
                className="bg-background border border-border/80 px-1.5 py-0.5 text-xs rounded-md focus:outline-hidden focus:border-primary/50 text-foreground cursor-pointer text-center"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i} className="bg-popover text-foreground">
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span className="text-xs text-muted-foreground">:</span>
              <select
                value={dateValue.getMinutes()}
                onChange={(e) => handleTimeChange("minutes", parseInt(e.target.value, 10) || 0)}
                className="bg-background border border-border/80 px-1.5 py-0.5 text-xs rounded-md focus:outline-hidden focus:border-primary/50 text-foreground cursor-pointer text-center"
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i} className="bg-popover text-foreground">
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
