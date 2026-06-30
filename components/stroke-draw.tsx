"use client";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  useStrokeDraw,
  type UseStrokeDrawOptions,
} from "@/lib/use-stroke-draw";
export interface StrokeDrawIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "children">,
    UseStrokeDrawOptions {
  pathData: string;
  strokeColor?: string;
  strokeWidth?: number;
}
export function StrokeDrawIcon({
  pathData,
  className,
  duration,
  delay,
  repeat,
  ease,
  strokeColor = "currentColor",
  strokeWidth = 2,
  ...props
}: StrokeDrawIconProps) {
  const strokeProps = useStrokeDraw({ duration, delay, repeat, ease });
  return (
    <motion.svg
      className={cn(className)}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox={props.viewBox || "0 0 24 24"}
      width={props.width}
      height={props.height}
    >
      <motion.path d={pathData} {...strokeProps} />
    </motion.svg>
  );
}

export interface StrokeDrawProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function StrokeDraw({ children, className, ...props }: StrokeDrawProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        "[&_svg_path]:[stroke-dasharray:100] [&_svg_path]:[stroke-dashoffset:100] [&_svg_path]:[stroke:currentColor] [&_svg_path]:[stroke-width:0.8px]",
        "[&_svg_path]:[animation:svg-icon-draw_1.5s_ease-in-out_forwards] [&_svg_path]:[transition:fill-opacity_0.3s]",
        "hover:[&_svg_path]:[animation:none] hover:[&_svg_path]:[animation:svg-icon-draw_1.2s_ease-in-out_forwards]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
