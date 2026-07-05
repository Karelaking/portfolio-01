"use client";

import React, { useState, useRef, useEffect } from "react";
import { RiUpload2Line, RiLink, RiImageLine, RiCloseLine, RiLoader2Line } from "@remixicon/react";
import { StrokeDraw } from "@/components/stroke-draw";
import { uploadToS3Action } from "@/app/actions";
import { toast } from "sonner";

interface ImageSelectorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholderUrl?: string;
}

export function ImageSelector({ value, onChange, label = "Image", placeholderUrl }: ImageSelectorProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state with incoming value
  useEffect(() => {
    if (value) {
      if (value.startsWith("data:") || value.includes("amazonaws.com")) {
        // If it's a data URL or an S3 URL, we default to the upload tab since it was uploaded
        setActiveTab("upload");
      } else {
        setActiveTab("url");
        setUrlInput(value);
      }
    } else {
      setUrlInput("");
    }
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 2MB size limit validation
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File is too large. Max size is 2MB.");
        return;
      }

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        
        const res = await uploadToS3Action(formData);
        
        if (res.success && res.url) {
          onChange(res.url);
          toast.success("Image uploaded to S3 successfully!");
        } else {
          toast.error(res.error || "Failed to upload image to S3.");
        }
      } catch (err: any) {
        console.error("Upload error:", err);
        toast.error("An error occurred during S3 upload.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleUrlChange = (val: string) => {
    setUrlInput(val);
    onChange(val);
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>

      {/* Tabs */}
      <div className="flex bg-muted/20 p-1 rounded-lg gap-1 border border-border/40 shrink-0 self-start">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            activeTab === "upload"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <StrokeDraw>
            <RiUpload2Line className="size-3.5" />
          </StrokeDraw>
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            activeTab === "url"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <StrokeDraw>
            <RiLink className="size-3.5" />
          </StrokeDraw>
          Image URL
        </button>
      </div>

      {/* Content Area */}
      <div className="border border-border/80 bg-background/50 rounded-xl p-4 flex flex-col gap-4 relative overflow-hidden">
        {isUploading ? (
          /* Uploading state */
          <div className="flex flex-col items-center justify-center py-6 gap-2">
            <StrokeDraw className="animate-spin text-primary">
              <RiLoader2Line className="size-6" />
            </StrokeDraw>
            <p className="text-xs font-medium text-muted-foreground">Uploading image to S3...</p>
          </div>
        ) : value ? (
          /* Preview state */
          <div className="flex items-center gap-4">
            <div className="relative size-16 rounded-lg overflow-hidden border border-border bg-muted flex-shrink-0">
              <img
                src={value}
                alt="Selected preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderUrl || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=200";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {value.includes("amazonaws.com") ? "Uploaded to AWS S3" : value.startsWith("data:") ? "Uploaded local file" : value}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-mono truncate">
                {value.includes("amazonaws.com") ? "Cloud Storage Asset" : "External Web Resource"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted/80 rounded-md transition-colors"
              title="Remove image"
            >
              <StrokeDraw>
                <RiCloseLine className="size-4.5" />
              </StrokeDraw>
            </button>
          </div>
        ) : (
          /* Empty / Upload state */
          <div>
            {activeTab === "upload" ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border/80 hover:border-primary/50 transition-colors rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-muted/5 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <span className="p-2 bg-muted/40 rounded-full border border-border group-hover:bg-primary/5 group-hover:border-primary/30 transition-colors">
                  <StrokeDraw>
                    <RiImageLine className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </StrokeDraw>
                </span>
                <div className="text-center">
                  <p className="text-xs font-semibold text-foreground">Click to select image file</p>
                  <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG, WEBP up to 2MB</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
                <p className="text-[10px] text-muted-foreground">Provide a direct link to any online image resource.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
